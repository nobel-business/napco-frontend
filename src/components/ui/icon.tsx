import { mingcuteRegistry } from "./mingcute-icons";
import { cn } from "@/lib/utils";

/** Renders a MingCute icon by content key (see messages JSON `icon` fields). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = mingcuteRegistry[name] ?? mingcuteRegistry["settings"];
  return <Cmp className={className} />;
}

/** Orange gradient rounded-square icon tile (Figma feature icon). */
export function IconTile({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-300 to-secondary-500 text-white shadow-sm",
        className,
      )}
    >
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}
