"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/mingcute-icons";

import { cn } from "@/lib/utils";
import { ArticleCard } from "@/components/cards/article-card";
import type { ArticleData, Category } from "@/content/articles";

const PAGE_SIZE = 6;

export function ArticlesBrowser({
  articles,
  categories,
}: {
  articles: ArticleData[];
  categories: Category[];
}) {
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (active === "all" ? articles : articles.filter((a) => a.categoryKey === active)),
    [active, articles],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function selectCategory(key: string) {
    setActive(key);
    setPage(1);
  }

  return (
    <div className="space-y-10">
      {/* Filter chips */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => selectCategory(cat.key)}
            className={cn(
              "rounded-full px-5 py-2 text-label-small font-medium transition-colors",
              active === cat.key
                ? "bg-brand text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-secondary-50 hover:text-brand",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5 rtl-flip" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full text-label-small font-medium transition-colors",
                n === current
                  ? "bg-brand text-white"
                  : "border border-border bg-surface text-foreground hover:bg-muted",
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            aria-label="Next page"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5 rtl-flip" />
          </button>
        </div>
      )}
    </div>
  );
}
