"use client";

import type { BrandProfile, CreationSpec, CreationType, IdeaGoal, MediaFormat } from "@openpromo/shared";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import type { Me } from "./auth";

export type BrandStatus = "new" | "ingesting" | "ready" | "failed";

export type ProjectSummary = {
  id: string;
  name: string;
  url: string;
  domain: string;
  brandStatus: BrandStatus;
  tagline: string | null;
  colors: { primary: string; background: string; text: string } | null;
  logoAssetId: string | null;
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  url: string;
  domain: string;
  language: string;
  brand: BrandProfile | null;
  brandStatus: BrandStatus;
  brandError: string | null;
  brandProgress: { step: string; percent: number } | null;
  brandUpdatedAt: string | null;
  context: Record<string, unknown>;
  createdAt: string;
};

export type Asset = {
  id: string;
  projectId: string;
  kind: "image" | "video" | "audio" | "document";
  source: "website" | "upload" | "generated" | "render";
  role: string;
  name: string;
  mime: string;
  bytes: number;
  width: number | null;
  height: number | null;
  durationMs: number | null;
  model: string | null;
  prompt: string | null;
  costUsd: number;
  meta: Record<string, unknown>;
  creationId: string | null;
  createdAt: string;
};

export type BrandPage = { id: string; url: string; title: string | null; markdown: string; fetchedAt: string };

export type Idea = {
  id: string;
  goal: IdeaGoal;
  channel: string;
  type: CreationType;
  title: string;
  hook: string;
  body: string;
  caption: string;
  hashtags: string[];
  cta: string | null;
  pointIds: string[];
  status: "new" | "used" | "archived";
  plannedFor: string | null;
  createdAt: string;
};

export type Check = { id: string; level: "error" | "warning"; message: string; target?: string };

export type Render = {
  id: string;
  creationId: string;
  format: MediaFormat;
  quality: "draft" | "final";
  status: "queued" | "running" | "done" | "failed";
  progress: number;
  outputAssetIds: string[];
  posterAssetId: string | null;
  captionsAssetId: string | null;
  error: string | null;
  createdAt: string;
  finishedAt: string | null;
};

export type CreationStatus = "draft" | "generating" | "ready" | "rendering" | "done" | "failed";

export type Creation = {
  id: string;
  projectId: string;
  ideaId: string | null;
  type: CreationType;
  title: string;
  format: MediaFormat;
  spec: CreationSpec;
  checks: Check[];
  caption: string;
  status: CreationStatus;
  error: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreationListItem = Creation & {
  latestRender: { id: string; status: Render["status"]; progress: number; posterAssetId: string | null; outputAssetIds: string[]; format: MediaFormat } | null;
};

export const assetUrl = (id: string | null | undefined, download = false) => (id ? `/api/assets/${id}/file${download ? "?download=1" : ""}` : undefined);

export const useMe = () => useQuery({ queryKey: ["me"], queryFn: () => api<Me>("/me"), staleTime: 60_000 });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: () => api<ProjectSummary[]>("/projects"),
    refetchInterval: (query) => (query.state.data?.some((p) => p.brandStatus === "ingesting") ? 3000 : false),
  });

/** A project; polls while its website is being read. */
export const useProject = (projectId: string) =>
  useQuery({
    queryKey: ["project", projectId],
    queryFn: () => api<Project>(`/projects/${projectId}`),
    refetchInterval: (query) => (query.state.data?.brandStatus === "ingesting" ? 2500 : false),
  });

export const useAssets = (projectId: string, role?: string) =>
  useQuery({ queryKey: ["assets", projectId, role ?? "all"], queryFn: () => api<Asset[]>(`/projects/${projectId}/assets`, { query: { role } }) });

export const useBrandPages = (projectId: string) =>
  useQuery({ queryKey: ["pages", projectId], queryFn: () => api<BrandPage[]>(`/projects/${projectId}/pages`) });

export const useIdeas = (projectId: string) => useQuery({ queryKey: ["ideas", projectId], queryFn: () => api<Idea[]>(`/projects/${projectId}/ideas`) });

/** Creations of the given types; polls while any of them is rendering. */
export const useCreations = (projectId: string, types?: CreationType[]) =>
  useQuery({
    queryKey: ["creations", projectId],
    queryFn: () => api<CreationListItem[]>(`/projects/${projectId}/creations`),
    select: (rows) => (types ? rows.filter((r) => types.includes(r.type)) : rows),
    refetchInterval: (query) => (query.state.data?.some((c) => c.status === "rendering") ? 3000 : false),
  });

/** One creation with its renders; polls while a render is queued or running. */
export const useCreation = (creationId: string) =>
  useQuery({
    queryKey: ["creation", creationId],
    queryFn: () => api<Creation & { renders: Render[] }>(`/creations/${creationId}`),
    refetchInterval: (query) => (query.state.data?.renders.some((r) => r.status === "queued" || r.status === "running") ? 2500 : false),
  });
