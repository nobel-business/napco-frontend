"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@/components/ui/mingcute-icons";
import { Button } from "@/components/ui/button";

export type Testimonial = { name: string; role: string; quote: string; image: string; blurDataURL?: string };

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const t = items[index];

  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        variant="ghost"
        size="icon"
        className="hidden shrink-0 border border-border bg-surface shadow-sm lg:inline-flex"
      >
        <ChevronLeft className="h-5 w-5 rtl-flip" />
      </Button>

      <article className="fx-glow-text flex flex-1 flex-col items-center gap-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:flex-row md:items-center md:p-8">
        <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl md:w-40">
          <Image
            src={t.image}
            alt={t.name}
            fill
            sizes="(min-width: 768px) 160px, 112px"
            placeholder={t.blurDataURL ? "blur" : "empty"}
            blurDataURL={t.blurDataURL}
            className="object-cover"
          />
        </div>
        <div className="space-y-2 text-center md:text-start">
          <h3 className="text-title-large font-semibold uppercase text-foreground">{t.name}</h3>
          <p className="text-label-small font-medium text-muted-foreground">{t.role}</p>
          <p className="text-body-medium text-muted-foreground">{t.quote}</p>
        </div>
      </article>

      <Button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        variant="ghost"
        size="icon"
        className="hidden shrink-0 border border-border bg-surface shadow-sm lg:inline-flex"
      >
        <ChevronRight className="h-5 w-5 rtl-flip" />
      </Button>
    </div>
  );
}
