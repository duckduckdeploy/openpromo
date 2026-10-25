import { describe, expect, it } from "vitest";
import { runMediaJob } from "@openpromo/yepapi";
import { getYep, monthSpend } from "../src/lib/yep";
import { readyUser } from "./client";
import { harness } from "./harness";

async function settled(userId: string, total: number) {
  // Usage rows are written just after each call returns.
  for (let i = 0; i < 50 && (await monthSpend(userId)) < total - 1e-9; i++) await new Promise((r) => setTimeout(r, 10));
}

describe("monthly budget", () => {
  it("refuses paid calls once the month's spend reaches the limit, and keeps free ones working", async () => {
    const { api, userId } = await readyUser();
    await api.ok("PUT", "/settings/budget", { monthlyBudgetUsd: 0.06 });
    const yep = await getYep({ userId, feature: "test" });
    await yep.scrape.stealth({ url: "https://example.com" }); // $0.03
    await yep.scrape.stealth({ url: "https://example.com" }); // $0.06 in all
    await settled(userId, 0.06);

    const before = harness.fake.requests.length;
    await expect(yep.scrape.page({ url: "https://example.com" })).rejects.toMatchObject({ code: "budget_reached" });
    await expect(getYep({ userId, feature: "test" })).rejects.toMatchObject({ code: "budget_reached" });
    expect(harness.fake.requests.length).toBe(before);

    expect((await api.ok("GET", "/balance")).balanceUsd).toBe(5);
    await expect(yep.account.balance()).resolves.toMatchObject({ costUsd: 0 });
  });

  it("sees spend made by other clients of the same user while a client is in use", async () => {
    const { userId, api } = await readyUser();
    await api.ok("PUT", "/settings/budget", { monthlyBudgetUsd: 0.04 });
    // Two clients created together, as two overlapping jobs would be.
    const first = await getYep({ userId, feature: "test" });
    const second = await getYep({ userId, feature: "test" });

    await first.scrape.stealth({ url: "https://example.com" }); // $0.03
    await settled(userId, 0.03);
    await second.scrape.page({ url: "https://example.com" }); // $0.01, total $0.04
    await settled(userId, 0.04);

    await expect(second.scrape.page({ url: "https://example.com" })).rejects.toMatchObject({ code: "budget_reached" });
    await expect(first.scrape.page({ url: "https://example.com" })).rejects.toMatchObject({ code: "budget_reached" });
  });

  it("counts calls in flight, so calls made together cannot all pass the limit", async () => {
    const { userId, api } = await readyUser();
    await api.ok("PUT", "/settings/budget", { monthlyBudgetUsd: 0.06 });
    const yep = await getYep({ userId, feature: "test" });
    const before = harness.fake.requests.length;
    // $0.03 each. Each reserves its price before any has a usage row, so the second still fits
    // ($0.06 with it) and the third would make $0.09 and is refused.
    const results = await Promise.allSettled([1, 2, 3].map(() => yep.scrape.stealth({ url: "https://example.com" })));
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(2);
    expect(results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason)).toMatchObject([{ code: "budget_reached" }]);
    expect(harness.fake.requests.length - before).toBe(2);
  });

  it("reserves a media job's estimated price at submit and logs the real charge once it completes", async () => {
    const { userId, api } = await readyUser();
    await api.ok("PUT", "/settings/budget", { monthlyBudgetUsd: 0.5 });
    const yep = await getYep({ userId, feature: "test" });
    // A 6-second Veo Lite clip is estimated at $0.66, over this limit on its own: refused before
    // anything is submitted, though nothing has been spent yet.
    await expect(
      runMediaJob(yep, { model: "google/veo-3-lite", prompt: "a calm product shot", options: { aspectRatio: "9:16", duration: "6" } }, { pollMs: 1 }),
    ).rejects.toMatchObject({ code: "budget_reached" });

    // An image fits; its charge is logged from the completed status, not the submit.
    const result = await runMediaJob(yep, { model: "black-forest-labs/flux.2-klein-4b", prompt: "a croissant", options: { aspectRatio: "1:1" } }, { pollMs: 1 });
    expect(result.costUsd).toBe(0.04);
    expect(result.file?.mimeType).toBe("image/png");
    await settled(userId, 0.04);
    expect(await monthSpend(userId)).toBeCloseTo(0.04, 6);
  });
});
