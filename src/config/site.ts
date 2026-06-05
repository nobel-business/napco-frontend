/** Site-wide configuration: navigation, contact details, socials. */

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
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export const siteContact = {
  email: "info@npaqua.sa",
  phone: "+966 54 125 2773",
  address: "Dhahran Techno Valley, Dhahran, Kingdom of Saudi Arabia",
  hours: "Sunday – Thursday, 8:00 AM – 4:00 PM",
};

export const socialLinks = {
  linkedin: "#",
  twitter: "#",
  instagram: "#",
  youtube: "#",
};
