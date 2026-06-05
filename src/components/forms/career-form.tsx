"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
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
  nationality: z.string().min(1),
  specialization: z.string().optional(),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CareerForm() {
  const t = useTranslations("career.form");
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const countries = t.raw("countries") as string[];

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface p-12 text-center shadow-card">
        <CheckCircle2 className="h-14 w-14 text-brand" />
        <h3 className="text-headline-small font-semibold text-foreground">{t("successTitle")}</h3>
        <p className="max-w-md text-body-medium text-muted-foreground">{t("successBody")}</p>
        <Button onClick={() => { reset(); setFileName(""); setDone(false); }} variant="outline">
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
      <Field label={t("name")} htmlFor="name" error={errors.name && t("required")}>
        <Input id="name" placeholder={t("namePh")} {...register("name")} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t("email")} htmlFor="email" error={errors.email && t("invalidEmail")}>
          <Input id="email" type="email" placeholder={t("emailPh")} {...register("email")} />
        </Field>
        <Field label={t("phone")} htmlFor="phone">
          <Input id="phone" type="tel" dir="ltr" placeholder={t("phonePh")} {...register("phone")} />
        </Field>
      </div>

      <Field label={t("cv")} htmlFor="cv">
        <label
          htmlFor="cv"
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-surface px-4 text-body-small text-muted-foreground transition-colors hover:border-brand"
        >
          <Upload className="h-4 w-4" />
          <span>{fileName || t("cvPh")}</span>
        </label>
        <input
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t("nationality")} htmlFor="nationality" error={errors.nationality && t("required")}>
          <Select id="nationality" defaultValue="" {...register("nationality")}>
            <option value="" disabled>{t("nationalityPh")}</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label={t("specialization")} htmlFor="specialization">
          <Input id="specialization" placeholder={t("specializationPh")} {...register("specialization")} />
        </Field>
      </div>

      <Field label={t("details")} htmlFor="details">
        <Textarea id="details" rows={5} placeholder={t("detailsPh")} {...register("details")} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {t("submit")}
      </Button>
    </form>
  );
}
