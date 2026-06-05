import Image from "next/image";
import { Check } from "@/components/ui/mingcute-icons";

import { cn } from "@/lib/utils";

export type ServiceBlockData = {
  title: string;
  items: string[];
  caption: string;
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
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-2xl shadow-card",
          reverse ? "lg:order-last" : "lg:order-first",
        )}
      >
        <Image src={data.image} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4">
          <p className="text-body-small font-medium text-white">{data.caption}</p>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-headline-small font-semibold text-foreground">{data.title}</h3>
        <ul className="space-y-3">
          {data.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-sm"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-body-small text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
