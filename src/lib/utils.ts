import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The design system defines custom font-size utilities (text-display-*, text-headline-*,
// text-title-*, text-body-*, text-label-*) via Tailwind v4 @theme. tailwind-merge doesn't
// know these, so it conflated them with text-color utilities and dropped the color
// (e.g. a button's `text-white` was stripped by the size's `text-label-small`).
// Register them as font-size so colors and sizes no longer conflict.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-large",
            "display-medium",
            "display-small",
            "headline-large",
            "headline-medium",
            "headline-small",
            "title-large",
            "title-medium",
            "title-small",
            "body-large",
            "body-medium",
            "body-small",
            "label-large",
            "label-medium",
            "label-small",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
