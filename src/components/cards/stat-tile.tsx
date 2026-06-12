import { Icon } from "@/components/ui/icon";
import { CountUp } from "@/components/ui/count-up";
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
    <div className="group flex flex-col items-center gap-3 text-center">
      <span
        className={cn(
          "inline-flex h-16 w-16 items-center justify-center rounded-xl text-white shadow-sm transition-[filter,transform] duration-[var(--motion-base)] ease-[var(--ease-spring)] motion-safe:group-hover:scale-110",
          color === "orange"
            ? "bg-gradient-stat-orange group-hover:[filter:drop-shadow(0_6px_14px_rgba(255,120,44,0.5))]"
            : "bg-gradient-stat-blue group-hover:[filter:drop-shadow(0_6px_14px_rgba(31,159,194,0.55))]",
        )}
      >
        <Icon name={icon} fill className="h-8 w-8" />
      </span>
      <CountUp value={value} className="text-headline-small font-bold text-foreground" />
      <span className="text-body-small text-muted-foreground">{label}</span>
    </div>
  );
}
