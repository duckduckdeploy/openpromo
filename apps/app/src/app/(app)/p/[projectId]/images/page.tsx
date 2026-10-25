"use client";

import { useParams } from "next/navigation";
import { CreationsPage } from "@/components/creations-page";

export default function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  return <CreationsPage projectId={projectId} title="Images" description="Instagram posts, stories, carousels and ad banners, drawn in your brand's fonts and colours." types={["image", "carousel"]} />;
}
