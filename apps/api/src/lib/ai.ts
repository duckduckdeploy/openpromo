import { isYepApiError, type ChatMessage, type YepApi } from "@openpromo/yepapi";
import { z } from "zod";
import { AppError } from "./errors";

/**
 * Chat models by job, chosen from live tests: a fast multimodal model for
 * reading websites and screenshots, a stronger writer for hooks, captions and scripts.
 */
export const TEXT_MODELS = {
  /** Reads pages and screenshots into structured data. Vision, cheap on image tokens. */
  read: "google/gemini-3.8-flash",
  /** Writes ideas, captions, slide copy and video scripts. */
  write: "anthropic/claude-sonnet-5.5",
  /** Quick checks and small rewrites. */
  quick: "google/gemini-2.5-flash-lite",
} as const;

/** Used when a model's provider keeps failing (YepAPI's AI_UPSTREAM_ERROR after retries). */
const FALLBACK_MODEL: Record<string, string> = {
  [TEXT_MODELS.write]: "openai/gpt-5.5",
};

export type ContentPart = { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } };

export const imagePart = (mimeType: string, bytes: Buffer): ContentPart => ({
  type: "image_url",
  image_url: { url: `data:${mimeType};base64,${bytes.toString("base64")}` },
});

/** Models sometimes wrap JSON in a code fence or add a sentence around it. */
export function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced?.[1] ?? text).trim();
  try {
    return JSON.parse(body);
  } catch {
    const start = body.search(/[[{]/);
    const end = Math.max(body.lastIndexOf("}"), body.lastIndexOf("]"));
    if (start >= 0 && end > start) return JSON.parse(body.slice(start, end + 1));
    throw new Error("The model did not return JSON");
  }
}

export type ChatJsonOptions<T extends z.ZodType> = {
  model: string;
  system: string;
  user: string | ContentPart[];
  schema: T;
  /** Name for the JSON schema sent to the model. */
  name: string;
  temperature?: number;
  maxTokens?: number;
};

/**
 * One structured chat call: the schema goes to the model as a JSON schema, the answer is parsed and
 * validated, and a second call is made once with the validation errors if it does not fit. The
 * total cost of both calls is returned.
 */
/** The schema written into the system message, for when the request cannot carry it. */
function withSchemaInPrompt(messages: ChatMessage[], schema: Record<string, unknown>): ChatMessage[] {
  const [system, ...rest] = messages;
  return [{ role: "system", content: `${system!.content as string}

The JSON must match this JSON Schema exactly:
${JSON.stringify(schema)}` }, ...rest];
}

export async function chatJson<T extends z.ZodType>(yep: YepApi, options: ChatJsonOptions<T>): Promise<{ data: z.infer<T>; costUsd: number }> {
  const jsonSchema = z.toJSONSchema(options.schema, { target: "draft-7", io: "input" }) as Record<string, unknown>;
  delete jsonSchema.$schema;
  const messages: ChatMessage[] = [
    { role: "system", content: `${options.system}\n\nAnswer with JSON only, matching the schema "${options.name}".` },
    { role: "user", content: options.user as ChatMessage["content"] },
  ];
  let costUsd = 0;
  let lastError = "";
  let model = options.model;
  let structured = true;
  for (let attempt = 0; attempt < 2; attempt++) {
    const chat = () =>
      yep.ai.chat({
        model,
        messages: structured ? messages : withSchemaInPrompt(messages, jsonSchema),
        temperature: options.temperature ?? 0.4,
        maxTokens: options.maxTokens ?? 8000,
        ...(structured ? { responseFormat: { type: "json_schema" as const, json_schema: { name: options.name, schema: jsonSchema } } } : {}),
      });
    const upstream = (error: unknown) => isYepApiError(error) && error.code === "AI_UPSTREAM_ERROR";
    const result = await chat()
      // Structured output has its own failures upstream: the schema then goes in the prompt instead
      // (the answer is still validated below), and as a last resort to a comparable model.
      .catch(async (error: unknown) => {
        if (!upstream(error) || !structured) throw error;
        structured = false;
        return chat();
      })
      .catch(async (error: unknown) => {
        if (!upstream(error) || !FALLBACK_MODEL[model]) throw error;
        model = FALLBACK_MODEL[model]!;
        return chat();
      });
    costUsd += result.costUsd;
    const content = result.data.message.content ?? "";
    try {
      const parsed = options.schema.safeParse(extractJson(content));
      if (parsed.success) return { data: parsed.data, costUsd };
      lastError = parsed.error.issues
        .slice(0, 8)
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
    } catch (error) {
      lastError = (error as Error).message;
    }
    messages.push({ role: "assistant", content });
    messages.push({ role: "user", content: `That did not match the schema (${lastError}). Send the corrected JSON only.` });
  }
  throw new AppError(502, "ai_bad_output", `The model's answer could not be used: ${lastError}`);
}
