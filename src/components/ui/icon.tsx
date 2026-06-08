import { mingcuteRegistry } from "./mingcute-icons";
import { fillRegistry } from "./mingcute-fill";
import { cn } from "@/lib/utils";

/** Renders a MingCute icon by content key (see messages JSON `icon` fields).
 *  Pass `fill` to use the solid (filled) MingCute variant — used inside colored tiles/chips. */
export function Icon({
  name,
  className,
  fill,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  const Cmp =
    (fill ? fillRegistry[name] : undefined) ??
    mingcuteRegistry[name] ??
    mingcuteRegistry["settings"];
  return <Cmp className={className} />;
}

/** Orange gradient rounded-square icon tile (Figma feature icon: rounded-8, 105° gradient). */
export function IconTile({
  name,
  size = "md",
  color = "orange",
  className,
}: {
  name: string;
  size?: "md" | "lg";
  color?: "orange" | "blue";
  className?: string;
}) {
  const box = size === "lg" ? "h-16 w-16" : "h-12 w-12";
  const glyph = size === "lg" ? "h-8 w-8" : "h-6 w-6";
  const gradient = color === "blue" ? "bg-gradient-tile-blue" : "bg-gradient-tile-orange";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg text-white shadow-sm",
        gradient,
        box,
        className,
      )}
    >
      <Icon name={name} fill className={glyph} />
    </span>
  );
}
