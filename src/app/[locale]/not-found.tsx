import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-40 text-center">
      <p className="text-display-medium font-bold text-brand">404</p>
      <h1 className="text-headline-medium">{t("title")}</h1>
      <p className="max-w-md text-body-medium text-muted-foreground">
        {t("description")}
      </p>
      <Button asChild size="lg">
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </Container>
  );
}
