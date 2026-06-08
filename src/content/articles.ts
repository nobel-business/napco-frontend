import type { Locale } from "@/i18n/routing";

export type ArticleData = {
  slug: string;
  categoryKey: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

export type Category = { key: string; label: string };

/** Category keys shared across locales (stable for filtering). */
export const categoryKeys = [
  "all",
  "smart-design",
  "operations",
  "nutrition",
  "quality-safety",
  "modern-tech",
] as const;

const images = [
  "/images/art-greenponds.png",
  "/images/art-lab.png",
  "/images/art-shrimp.png",
  "/images/art-rasindoor.png",
  "/images/art-shrimphand.png",
  "/images/art-tanks.png",
  "/images/art-fish.png",
  "/images/art-indoor.png",
  "/images/art-aerialpond.png",
];

const en: { categories: Category[]; articles: ArticleData[] } = {
  categories: [
    { key: "all", label: "All Posts" },
    { key: "smart-design", label: "Smart Design" },
    { key: "operations", label: "Operations" },
    { key: "nutrition", label: "Nutrition" },
    { key: "quality-safety", label: "Quality & Safety" },
    { key: "modern-tech", label: "Modern Technologies" },
  ],
  articles: [
    { slug: "fish-farm-layout-planning", categoryKey: "smart-design", category: "Smart Design", title: "Complete Guide to Fish Farm Layout Planning", excerpt: "Learn the fundamentals of designing an efficient fish farm layout, from tank positioning to water flow optimization.", date: "Jan 20, 2025", image: images[0] },
    { slug: "water-quality-management", categoryKey: "operations", category: "Operations", title: "Water Quality Management Essential Parameters", excerpt: "Master the critical water quality parameters that ensure healthy fish growth and optimal farm productivity.", date: "Jan 20, 2025", image: images[1] },
    { slug: "feeding-strategies-growth", categoryKey: "nutrition", category: "Nutrition", title: "Feeding Strategies for Maximum Growth Rate", excerpt: "Discover proven feeding techniques and nutrition plans that maximize fish growth while minimizing costs.", date: "Jan 20, 2025", image: images[2] },
    { slug: "modern-filtration-systems", categoryKey: "modern-tech", category: "Modern Technologies", title: "Understanding Modern Filtration Systems", excerpt: "How advanced filtration keeps water clean, fish healthy and operations efficient across the production cycle.", date: "Jan 18, 2025", image: images[3] },
    { slug: "biosecurity-best-practices", categoryKey: "quality-safety", category: "Quality & Safety", title: "Biosecurity Best Practices for Fish Farms", excerpt: "Protect your production with a layered biosecurity plan that mitigates risk and prevents disease outbreaks.", date: "Jan 15, 2025", image: images[4] },
    { slug: "ras-vs-biofloc", categoryKey: "smart-design", category: "Smart Design", title: "RAS vs Biofloc: Choosing the Right System", excerpt: "A practical comparison of recirculating and biofloc systems to help you select the best fit for your project.", date: "Jan 12, 2025", image: images[5] },
    { slug: "disease-prevention", categoryKey: "quality-safety", category: "Quality & Safety", title: "Fish Disease Prevention and Early Detection", excerpt: "Recognize early warning signs and apply veterinary best practices to keep your stock healthy year-round.", date: "Jan 10, 2025", image: images[6] },
    { slug: "iot-monitoring", categoryKey: "modern-tech", category: "Modern Technologies", title: "IoT Monitoring for Precision Aquaculture", excerpt: "Use sensors, automation and real-time data to optimize feeding, water quality and operational efficiency.", date: "Jan 8, 2025", image: images[7] },
    { slug: "cost-optimization", categoryKey: "operations", category: "Operations", title: "Cost Optimization in Commercial Fish Farming", excerpt: "Reduce feed waste, energy use and operational overhead while increasing your return on investment.", date: "Jan 5, 2025", image: images[8] },
  ],
};

const ar: { categories: Category[]; articles: ArticleData[] } = {
  categories: [
    { key: "all", label: "كل المقالات" },
    { key: "smart-design", label: "التصميم الذكي" },
    { key: "operations", label: "التشغيل" },
    { key: "nutrition", label: "التغذية" },
    { key: "quality-safety", label: "الجودة والسلامة" },
    { key: "modern-tech", label: "التقنيات الحديثة" },
  ],
  articles: [
    { slug: "fish-farm-layout-planning", categoryKey: "smart-design", category: "التصميم الذكي", title: "الدليل الكامل لتخطيط تصميم المزارع السمكية", excerpt: "تعرّف على أساسيات تصميم مزرعة سمكية فعّالة، من توزيع الأحواض إلى تحسين تدفق المياه.", date: "20 يناير 2025", image: images[0] },
    { slug: "water-quality-management", categoryKey: "operations", category: "التشغيل", title: "إدارة جودة المياه: المعايير الأساسية", excerpt: "أتقن معايير جودة المياه الحرجة التي تضمن نمواً صحياً للأسماك وإنتاجية مثلى للمزرعة.", date: "20 يناير 2025", image: images[1] },
    { slug: "feeding-strategies-growth", categoryKey: "nutrition", category: "التغذية", title: "استراتيجيات التغذية لتحقيق أقصى معدل نمو", excerpt: "اكتشف تقنيات التغذية المثبتة وخطط التغذية التي تعظّم نمو الأسماك مع تقليل التكاليف.", date: "20 يناير 2025", image: images[2] },
    { slug: "modern-filtration-systems", categoryKey: "modern-tech", category: "التقنيات الحديثة", title: "فهم أنظمة الترشيح الحديثة", excerpt: "كيف تحافظ أنظمة الترشيح المتقدمة على نظافة المياه وصحة الأسماك وكفاءة التشغيل عبر دورة الإنتاج.", date: "18 يناير 2025", image: images[3] },
    { slug: "biosecurity-best-practices", categoryKey: "quality-safety", category: "الجودة والسلامة", title: "أفضل ممارسات الأمن الحيوي للمزارع السمكية", excerpt: "احمِ إنتاجك بخطة أمن حيوي متعددة الطبقات تقلل المخاطر وتمنع تفشي الأمراض.", date: "15 يناير 2025", image: images[4] },
    { slug: "ras-vs-biofloc", categoryKey: "smart-design", category: "التصميم الذكي", title: "RAS مقابل البايوفلوك: اختيار النظام الأنسب", excerpt: "مقارنة عملية بين الأنظمة المغلقة وأنظمة البايوفلوك لمساعدتك على اختيار الأنسب لمشروعك.", date: "12 يناير 2025", image: images[5] },
    { slug: "disease-prevention", categoryKey: "quality-safety", category: "الجودة والسلامة", title: "الوقاية من أمراض الأسماك والكشف المبكر", excerpt: "تعرّف على العلامات المبكرة وطبّق أفضل الممارسات البيطرية للحفاظ على صحة مخزونك طوال العام.", date: "10 يناير 2025", image: images[6] },
    { slug: "iot-monitoring", categoryKey: "modern-tech", category: "التقنيات الحديثة", title: "مراقبة إنترنت الأشياء للاستزراع المائي الدقيق", excerpt: "استخدم المستشعرات والأتمتة والبيانات اللحظية لتحسين التغذية وجودة المياه وكفاءة التشغيل.", date: "8 يناير 2025", image: images[7] },
    { slug: "cost-optimization", categoryKey: "operations", category: "التشغيل", title: "تحسين التكاليف في الاستزراع السمكي التجاري", excerpt: "قلّل هدر الأعلاف واستهلاك الطاقة والتكاليف التشغيلية مع زيادة العائد على الاستثمار.", date: "5 يناير 2025", image: images[8] },
  ],
};

const byLocale: Record<Locale, { categories: Category[]; articles: ArticleData[] }> = { en, ar };

export function getArticles(locale: Locale): ArticleData[] {
  return byLocale[locale].articles;
}

export function getCategories(locale: Locale): Category[] {
  return byLocale[locale].categories;
}

export function getArticle(locale: Locale, slug: string): ArticleData | undefined {
  return byLocale[locale].articles.find((a) => a.slug === slug);
}
