import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/** Stat with gradient icon tile (alternating orange/blue) + value + label. */
export function StatTile({
  icon,
  value,
  label,
  color = "orange",
}: {
  icon: string;
  value: string;
  label: string;
  color?: "orange" | "blue";
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        className={cn(
          "inline-flex h-16 w-16 items-center justify-center rounded-xl text-white shadow-sm",
          color === "orange" ? "bg-gradient-stat-orange" : "bg-gradient-stat-blue",
        )}
      >
        <Icon name={icon} fill className="h-8 w-8" />
      </span>
      <span className="text-headline-small font-bold text-foreground">{value}</span>
      <span className="text-body-small text-muted-foreground">{label}</span>
    </div>
  );
}
