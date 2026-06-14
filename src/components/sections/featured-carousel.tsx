"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "@/components/ui/mingcute-icons";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ArticleData } from "@/content/articles";

/** Featured-post carousel: working prev/next chevrons cycle through the articles. */
export function FeaturedCarousel({
  articles,
  prevLabel,
  nextLabel,
}: {
  articles: ArticleData[];
  prevLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + articles.length) % articles.length);
  const a = articles[index];

  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        onClick={() => go(-1)}
        aria-label={prevLabel}
        variant="ghost"
        size="icon"
        className="fx-glide-start hidden shrink-0 border border-border bg-surface shadow-sm lg:inline-flex"
      >
        <ChevronLeft className="h-5 w-5 rtl-flip" />
      </Button>

      <Link
        href={`/articles/${a.slug}`}
        className="fx-glow-text hover-lift group flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:flex-row md:items-center md:p-8"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:w-72 md:shrink-0">
          <Image
            key={a.image}
            src={a.image}
            alt={a.title}
            fill
            sizes="(min-width: 768px) 288px, 100vw"
            placeholder={a.blurDataURL ? "blur" : "empty"}
            blurDataURL={a.blurDataURL}
            className="object-cover transition-transform duration-[var(--motion-slow)] group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-4">
          <Badge>{a.category}</Badge>
          <h3 className="text-headline-small font-semibold text-foreground">{a.title}</h3>
          <p className="text-body-medium text-muted-foreground">{a.excerpt}</p>
          <div className="flex items-center gap-2 text-body-small text-muted-foreground">
            <Calendar className="h-4 w-4 text-brand" />
            <span>{a.date}</span>
          </div>
        </div>
      </Link>

      <Button
        type="button"
        onClick={() => go(1)}
        aria-label={nextLabel}
        variant="ghost"
        size="icon"
        className="fx-glide-end hidden shrink-0 border border-border bg-surface shadow-sm lg:inline-flex"
      >
        <ChevronRight className="h-5 w-5 rtl-flip" />
      </Button>
    </div>
  );
}
