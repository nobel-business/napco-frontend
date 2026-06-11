import { MediaImage } from "@/components/ui/media-image";
import { Play } from "lucide-react";
import { Clock } from "@/components/ui/mingcute-icons";
import { Button } from "@/components/ui/button";

export type VideoItem = {
  image: string;
  title: string;
  desc: string;
  duration: string;
};

/** Video card — thumbnail with play overlay + title + description + duration. */
export function VideoCard({
  video,
  durationLabel,
}: {
  video: VideoItem;
  durationLabel: string;
}) {
  return (
    <article className="group hover-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="relative aspect-[16/9] overflow-hidden">
        <MediaImage
          src={video.image}
          alt={video.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[var(--motion-image)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-navy/30 transition-colors group-hover:bg-navy/45" />
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={video.title}
          className="absolute inset-0 m-auto bg-white/90 text-brand shadow-lg hover:bg-white group-hover:scale-110"
        >
          <Play className="h-7 w-7 fill-current ps-1" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-title-medium font-semibold text-foreground">{video.title}</h3>
        <p className="flex-1 text-body-small text-muted-foreground">{video.desc}</p>
        <div className="flex items-center gap-2 pt-1 text-body-small text-muted-foreground">
          <Clock className="h-4 w-4 text-brand" />
          <span>{video.duration} {durationLabel}</span>
        </div>
      </div>
    </article>
  );
}
