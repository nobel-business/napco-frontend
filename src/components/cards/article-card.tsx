import Image from "next/image";
import { Calendar } from "@/components/ui/mingcute-icons";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  blurDataURL?: string;
};

/** Vertical article card — image + category badge + title + excerpt + date. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group hover-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          placeholder={article.blurDataURL ? "blur" : "empty"}
          blurDataURL={article.blurDataURL}
          data-vt-name="article-hero"
          className="object-cover transition-transform duration-[var(--motion-image)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge>{article.category}</Badge>
          <span className="flex items-center gap-1.5 text-body-small text-muted-foreground">
            <Calendar className="h-4 w-4 text-brand" />
            {article.date}
          </span>
        </div>
        <h3 className="text-title-medium font-semibold text-foreground transition-colors group-hover:text-brand">
          {article.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-body-small text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
