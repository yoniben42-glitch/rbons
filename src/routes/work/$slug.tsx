import { createFileRoute } from "@tanstack/react-router";
import { WorkDetailPage } from "@/pages/WorkDetailPage";

export const Route = createFileRoute("/work/$slug")({
  component: WorkDetailPage,
});
