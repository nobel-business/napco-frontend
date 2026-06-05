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
          "inline-flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-sm",
          color === "orange"
            ? "bg-gradient-to-br from-secondary-300 to-secondary-500"
            : "bg-gradient-to-br from-primary-400 to-primary-600",
        )}
      >
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <span className="text-headline-small font-bold text-foreground">{value}</span>
      <span className="text-body-small text-muted-foreground">{label}</span>
    </div>
  );
}
