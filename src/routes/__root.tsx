import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import appCss from "../styles.css?url";

const APP_NAME = "Rbonsu Photography";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} | Timeless Weddings, Luxury Portraits & Editorial Fine Art` },
      {
        name: "description",
        content:
          "Official portfolio and studio platform for RBONSU Photography. Discover authentic high-resolution works in luxury weddings, studio portraiture, and editorial fashion.",
      },
      { name: "theme-color", content: "#121211" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory-50 text-charcoal-900 antialiased">
        <ScrollToTop />
        <Layout>
          <Outlet />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
