"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "@/components/ui/mingcute-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  project: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-surface p-10 text-center shadow-card">
        <CheckCircle2 className="h-14 w-14 text-brand" />
        <h3 className="text-headline-small font-semibold text-foreground">{t("successTitle")}</h3>
        <p className="max-w-md text-body-medium text-muted-foreground">{t("successBody")}</p>
        <Button onClick={() => { reset(); setDone(false); }} variant="outline">
          {t("again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-headline-small font-semibold uppercase text-foreground">{t("heading")}</h2>
        <p className="text-body-small text-muted-foreground">{t("sub")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field label={t("name")} htmlFor="name" error={errors.name && t("required")}>
          <Input id="name" placeholder={t("namePh")} {...register("name")} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={t("email")} htmlFor="email" error={errors.email && t("invalidEmail")}>
            <Input id="email" type="email" placeholder={t("emailPh")} {...register("email")} />
          </Field>
          <Field label={t("phone")} htmlFor="phone">
            <Input id="phone" type="tel" dir="ltr" placeholder={t("phonePh")} {...register("phone")} />
          </Field>
        </div>
        <Field label={t("project")} htmlFor="project">
          <Textarea id="project" rows={5} placeholder={t("projectPh")} {...register("project")} />
        </Field>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {t("submit")}
        </Button>
      </form>
    </div>
  );
}
