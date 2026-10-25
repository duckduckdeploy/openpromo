"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Globe, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge, Button, Card, EmptyState, ErrorNote, Input, PageHeader, Spinner, WithIcon } from "@/components/ui";
import { api } from "@/lib/api";
import { assetUrl, type Project, type ProjectSummary, useMe, useProjects } from "@/lib/hooks";

function AddWebsite({ autoFocus }: { autoFocus?: boolean }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const me = useMe();
  const [url, setUrl] = useState("");
  const create = useMutation({
    mutationFn: () => api<Project>("/projects", { method: "POST", body: { url } }),
    onSuccess: (project) => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/p/${project.id}`);
    },
  });
  const needsKey = me.data && !me.data.settings.hasYepapiKey;

  return (
    <Card className="p-4">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          if (url.trim()) create.mutate();
        }}
      >
        <WithIcon icon={Globe} className="flex-1">
          <Input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourbusiness.com"
            aria-label="Website address"
            autoFocus={autoFocus}
            className="pl-9"
            inputMode="url"
            autoComplete="url"
          />
        </WithIcon>
        <Button type="submit" variant="primary" loading={create.isPending} disabled={!url.trim() || needsKey}>
          <Plus className="size-4" aria-hidden /> Add website
        </Button>
      </form>
      <p className="mt-2 text-xs text-muted">
        OpenPromo reads the site (a handful of pages, about $0.05–0.15 of YepAPI credit) and builds a brand profile: what you sell, who for, your voice, colours, fonts and logo.
        {needsKey && (
          <>
            {" "}
            <Link href="/settings" className="font-medium text-accent-text underline underline-offset-2">
              Add your YepAPI key first.
            </Link>
          </>
        )}
      </p>
      {create.error && (
        <div className="mt-3">
          <ErrorNote error={create.error} />
        </div>
      )}
    </Card>
  );
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const colors = project.colors;
  return (
    <Link href={`/p/${project.id}`} className="group block overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-colors hover:border-edge">
      <div className="flex h-28 items-center justify-center" style={{ background: colors?.background ?? "var(--color-sunken)" }}>
        {project.logoAssetId ? (
          <img src={assetUrl(project.logoAssetId)} alt="" className="max-h-14 max-w-[60%] object-contain" />
        ) : (
          <span className="font-display text-2xl font-bold" style={{ color: colors?.primary ?? "var(--color-muted)" }}>
            {project.name.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>
      {colors && <div className="h-1.5" style={{ background: colors.primary }} aria-hidden />}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate font-display font-semibold group-hover:text-accent-text">{project.name}</p>
          {project.brandStatus === "ingesting" && <Badge tone="accent">Reading site</Badge>}
          {project.brandStatus === "failed" && <Badge tone="neg">Read failed</Badge>}
        </div>
        <p className="truncate font-mono text-xs text-muted">{project.domain}</p>
        {project.tagline && <p className="mt-2 line-clamp-2 text-[13px] text-muted">{project.tagline}</p>}
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const projects = useProjects();

  return (
    <>
      <PageHeader title="Projects" description="One project per website. Every image, reel and video is made from that site's brand profile." />
      <div className="mb-6">
        <AddWebsite autoFocus={projects.data?.length === 0} />
      </div>
      {projects.isPending ? (
        <Spinner />
      ) : projects.error ? (
        <ErrorNote error={projects.error} />
      ) : projects.data.length === 0 ? (
        <EmptyState title="No projects yet">Add your website above. In about a minute you'll have a brand profile and can start making posts, reels and videos.</EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
