/** Site-wide configuration: navigation, contact details, socials. */

/**
 * Master switch for the first-visit Sonar brand intro (home only). Set to `true` to re-activate
 * it (the IntroGate overlay + the layout's no-flash pre-paint script both read this flag, so they
 * always toggle together). Code stays intact either way.
 */
export const INTRO_ENABLED: boolean = false;

export type NavItem = {
  /** i18n key under `nav.*` */
  key: string;
  href: string;
};

/** Primary navigation (order matches Figma navbar). */
export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "training", href: "/training" },
  { key: "blog", href: "/blog" },
  { key: "media", href: "/media" },
  { key: "career", href: "/career" },
];

export const footerQuickLinks: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
];

export const siteContact = {
  email: "info@npaqua.sa",
  phone: "+966 54 125 2773", // Contact page
  footerPhone: "+966 50 706 2900", // Footer (per Figma)
  address: "Dhahran-Thuqbah Road - Al Khobar - Kingdom of Saudi Arabia",
  hours: "Sunday – Thursday, 8:00 AM – 4:00 PM",
};

export const socialLinks = {
  linkedin: "#",
  twitter: "#",
  instagram: "#",
  youtube: "#",
};
