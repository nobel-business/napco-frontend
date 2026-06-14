import { MediaImage } from "@/components/ui/media-image";
import { Icon } from "@/components/ui/icon";

import { cn } from "@/lib/utils";

export type ServiceBlockData = {
  title: string;
  items: string[];
  caption?: string;
  image: string;
};

/**
 * Alternating image + checklist service block (Figma SERVICES pattern).
 * Even index → image first (start); odd index → image last (end).
 * RTL mirrors automatically via grid + logical order.
 */
export function ServiceBlock({
  data,
  reverse = false,
}: {
  data: ServiceBlockData;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2">
      <div className={cn("flex flex-col gap-3", reverse ? "lg:order-last" : "lg:order-first")}>
        <div className="fx-img-glow relative min-h-[300px] flex-1 overflow-hidden rounded-2xl shadow-card">
          <MediaImage
            src={data.image}
            alt={data.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        {data.caption && (
          <p className="text-body-small text-muted-foreground">{data.caption}</p>
        )}
      </div>

      <div className="flex flex-col justify-center space-y-5">
        <h3 className="text-headline-small font-semibold text-foreground">{data.title}</h3>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item}
              className="fx-point flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <span className="fx-point-icon bg-gradient-tile-orange inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm">
                <Icon name="check-circle" fill className="h-5 w-5" />
              </span>
              <span className="fx-point-text text-body-small text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
