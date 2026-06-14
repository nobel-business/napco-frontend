"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "@/components/ui/mingcute-icons";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
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
          <Button
            key={cat.key}
            type="button"
            onClick={() => selectCategory(cat.key)}
            variant={active === cat.key ? "primary" : "ghost"}
            size="sm"
          >
            {cat.label}
          </Button>
        ))}
        <Button type="button" variant="ghost" size="sm">
          {moreLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid */}
      <div data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            variant="ghost"
            size="icon-sm"
            className="fx-glide-start"
          >
            <Icon name="chevrons-left" className="h-5 w-5 rtl-flip" />
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <Button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              variant={n === current ? "primary" : "ghost"}
              size="icon-sm"
            >
              {n}
            </Button>
          ))}
          <Button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            aria-label="Next page"
            variant="ghost"
            size="icon-sm"
            className="fx-glide-end"
          >
            <Icon name="chevrons-right" className="h-5 w-5 rtl-flip" />
          </Button>
        </div>
      )}
    </div>
  );
}
