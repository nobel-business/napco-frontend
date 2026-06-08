"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "@/components/ui/mingcute-icons";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ArticleCard } from "@/components/cards/article-card";
import type { ArticleData, Category } from "@/content/articles";

const PAGE_SIZE = 6;

export function ArticlesBrowser({
  articles,
  categories,
  moreLabel,
}: {
  articles: ArticleData[];
  categories: Category[];
  moreLabel: string;
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
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => selectCategory(cat.key)}
            className={cn(
              "rounded-lg px-5 py-2.5 text-label-small font-medium transition-colors",
              active === cat.key
                ? "bg-brand text-white shadow-sm"
                : "text-muted-foreground hover:text-brand",
            )}
          >
            {cat.label}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg px-4 py-2.5 text-label-small font-medium text-muted-foreground transition-colors hover:text-brand"
        >
          {moreLabel}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="inline-flex h-10 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-brand disabled:opacity-40"
          >
            <Icon name="chevrons-left" className="h-5 w-5 rtl-flip" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg text-label-small transition-colors",
                n === current
                  ? "w-10 bg-brand font-semibold text-white"
                  : "min-w-[1.75rem] px-1 font-medium text-muted-foreground hover:text-brand",
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            aria-label="Next page"
            className="inline-flex h-10 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-brand disabled:opacity-40"
          >
            <Icon name="chevrons-right" className="h-5 w-5 rtl-flip" />
          </button>
        </div>
      )}
    </div>
  );
}
