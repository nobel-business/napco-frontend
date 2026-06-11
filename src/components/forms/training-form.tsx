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
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  date: z.string().optional(),
  company: z.string().optional(),
  visitType: z.string().min(1),
  visitors: z.string().min(1),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function TrainingForm() {
  const t = useTranslations("training.form");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const visitTypes = t.raw("visitTypeOptions") as string[];
  const visitorOptions = t.raw("visitorOptions") as string[];

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-6 text-center shadow-card md:p-10">
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t("name")} htmlFor="name" error={errors.name && t("required")}>
          <Input id="name" placeholder={t("namePh")} {...register("name")} />
        </Field>
        <Field label={t("email")} htmlFor="email" error={errors.email && t("invalidEmail")}>
          <Input id="email" type="email" placeholder={t("emailPh")} {...register("email")} />
        </Field>
        <Field label={t("phone")} htmlFor="phone">
          <Input id="phone" type="tel" dir="ltr" placeholder={t("phonePh")} {...register("phone")} />
        </Field>
        <Field label={t("date")} htmlFor="date">
          <Input id="date" type="date" placeholder={t("datePh")} {...register("date")} />
        </Field>
      </div>

      <Field label={t("company")} htmlFor="company">
        <Input id="company" placeholder={t("companyPh")} {...register("company")} />
      </Field>

      <Field label={t("visitType")} htmlFor="visitType" error={errors.visitType && t("required")}>
        <Select id="visitType" defaultValue="" {...register("visitType")}>
          <option value="" disabled>{t("visitTypePh")}</option>
          {visitTypes.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </Select>
      </Field>

      <Field label={t("visitors")} htmlFor="visitors" error={errors.visitors && t("required")}>
        <Select id="visitors" defaultValue="" {...register("visitors")}>
          <option value="" disabled>{t("visitorsPh")}</option>
          {visitorOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </Select>
      </Field>

      <Field label={t("details")} htmlFor="details">
        <Textarea id="details" rows={5} placeholder={t("detailsPh")} {...register("details")} />
      </Field>

      <div className="flex flex-wrap gap-4 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {t("submit")}
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()} className="min-w-[120px]">
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
