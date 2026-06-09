import { Container } from "@/components/ui/container";

/**
 * Streamed fallback for the articles route — bounds the View-Transition wait on a cold/slow
 * navigation with an instant card-grid skeleton (no frozen page). Mirrors the real layout so
 * the crossfade to real content is shape-stable. `animate-pulse` is neutralized under
 * prefers-reduced-motion by the global motion block.
 */
export default function ArticlesLoading() {
  return (
    <>
      {/* hero placeholder */}
      <div className="bg-gradient-depth min-h-[520px] lg:min-h-[640px]" />

      <section className="py-20 lg:py-28">
        <Container className="space-y-10">
          {/* filter chips */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>

          {/* card grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <div className="aspect-[16/10] animate-pulse bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
