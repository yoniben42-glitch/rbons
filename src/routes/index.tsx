import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "RBONSU PHOTOGRAPHY | Editorial Weddings & Cultural Storytelling | Alexandria, VA" },
    ],
  }),
});
