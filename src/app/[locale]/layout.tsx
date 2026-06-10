import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Cairo, JetBrains_Mono } from "next/font/google";

import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { INTRO_ENABLED } from "@/config/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollReveal } from "@/components/providers/scroll-reveal";
import { ViewTransitions } from "@/components/providers/view-transitions";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// Mono — only used by the Sonar intro HUD. preload:false so it isn't fetched until used.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    metadataBase: new URL("https://napco-aqua.com"),
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const dir = localeDirection[locale];
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      // Load only the active locale's font: Inter for en, Cairo for ar (Cairo's latin subset
      // covers Latin text on Arabic pages). Avoids shipping Arabic glyphs to English visitors.
      className={`${locale === "ar" ? cairo.variable : inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* No-flash: on a first-visit home load (motion ok), paint the abyss cover before
            hydration so the homepage never flickers behind the Sonar intro. IntroGate clears it.
            Gated by INTRO_ENABLED so it never runs while the intro is disabled. */}
        {INTRO_ENABLED && (
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(){try{var p=location.pathname.replace(/\\/+$/,'');if((p===''||p==='/en'||p==='/ar')&&!sessionStorage.getItem('napco-intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-active');}}catch(e){}})();",
            }}
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll />
            <ScrollReveal />
            <ViewTransitions />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <FloatingActions />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
