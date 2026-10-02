import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
    package: typeof search.package === "string" ? search.package : undefined,
  }),
});
