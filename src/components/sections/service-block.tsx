import Image from "next/image";
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
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className={cn("space-y-3", reverse ? "lg:order-last" : "lg:order-first")}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
          <Image src={data.image} alt={data.title} fill className="object-cover" />
        </div>
        {data.caption && (
          <p className="text-body-small text-muted-foreground">{data.caption}</p>
        )}
      </div>

      <div className="space-y-5">
        <h3 className="text-headline-small font-semibold text-foreground">{data.title}</h3>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-3.5 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(105deg,#ff782c_3%,rgba(255,120,44,0.6)_98%)] text-white shadow-sm">
                <Icon name="check-circle" fill className="h-5 w-5" />
              </span>
              <span className="text-body-small text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
