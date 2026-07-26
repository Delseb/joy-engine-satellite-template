import { createFileRoute } from "@tanstack/react-router";

// {{PLACEHOLDER_HOMEPAGE}} — remplacé par l'agent architecte à la génération
export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "{{SITE_TITLE}}" },
      { name: "description", content: "{{SITE_DESCRIPTION}}" },
      { property: "og:title", content: "{{SITE_TITLE}}" },
      { property: "og:description", content: "{{SITE_DESCRIPTION}}" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function HomePage() {
  return (
    <main className="min-h-screen bg-brand-50 text-brand-900">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="font-display text-6xl leading-tight">{{HERO_TITLE}}</h1>
        <p className="mt-6 text-lg text-brand-900/80">{{HERO_SUBTITLE}}</p>
        <a href="{{CTA_HREF}}" className="mt-10 inline-block rounded-full bg-brand-500 px-8 py-4 text-white font-semibold hover:bg-brand-900 transition">
          {{CTA_LABEL}}
        </a>
      </section>
    </main>
  );
}
