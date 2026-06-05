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
};

/** Vertical article card — image + category badge + title + excerpt + date. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute start-3 top-3 bg-surface/90 backdrop-blur">
          {article.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-title-small font-semibold text-foreground transition-colors group-hover:text-brand">
          {article.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-body-small text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 pt-1 text-body-small text-muted-foreground">
          <Calendar className="h-4 w-4 text-brand" />
          <span>{article.date}</span>
        </div>
      </div>
    </Link>
  );
}
