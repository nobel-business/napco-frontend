"use client";

import { useEffect, useState } from "react";
import { Facebook, Linkedin, MessageCircle } from "@/components/ui/mingcute-icons";
import { Button } from "@/components/ui/button";

/**
 * Share buttons for an article. Each opens the platform's share dialog in a new tab,
 * pre-filled with the current page URL (and title for WhatsApp). The URL is read on the
 * client so it always reflects the actual deployed/localized address.
 */
export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);

  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    { Icon: Facebook, label: "FaceBook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { Icon: MessageCircle, label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${text}%20${u}` },
    { Icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {links.map(({ Icon, label, href }) => (
        <Button key={label} asChild variant="secondary" className="fx-social">
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}>
            <Icon className="h-5 w-5" />
            {label}
          </a>
        </Button>
      ))}
    </div>
  );
}
