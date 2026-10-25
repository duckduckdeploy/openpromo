"use client";

import { useParams } from "next/navigation";
import { CreationsPage } from "@/components/creations-page";

export default function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  return <CreationsPage projectId={projectId} title="Videos" description="Promo videos that explain what you do, and tutorials that show how to get started." types={["promo", "tutorial"]} />;
}
