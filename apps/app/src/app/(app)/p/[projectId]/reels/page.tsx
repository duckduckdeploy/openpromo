"use client";

import { useParams } from "next/navigation";
import { CreationsPage } from "@/components/creations-page";

export default function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  return <CreationsPage projectId={projectId} title="Reels" description="Vertical videos for Instagram Reels, TikTok and YouTube Shorts, with voiceover, music and captions." types={["reel"]} />;
}
