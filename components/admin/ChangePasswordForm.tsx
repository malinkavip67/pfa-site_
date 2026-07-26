"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

export default function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newPassword = String(formData.get("newPassword") || "");

    if (newPassword !== String(formData.get("confirmation") || "")) {
      setMessage("Новые пароли не совпадают.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.get("currentPassword"),
          newPassword,
        }),
      });
      const result = await response.json() as { message?: string };
      setMessage(result.message || "Не удалось изменить пароль.");
      setIsSuccess(response.ok);
      if (response.ok) form.reset();
    } catch {
      setMessage("Не удалось изменить пароль. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card as="div" className="max-w-[680px] bg-[#081321] p-8 max-sm:p-6">
      <Typography as="h2" variant="sectionTitle" className="text-[clamp(1.5rem,4vw,2.8rem)]">
        Изменить пароль
      </Typography>
      <Typography variant="bodyMedium" className="mt-4 text-slate-300">
        После сохранения новый пароль будет храниться только в виде защищённого хеша.
      </Typography>
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <PasswordInput name="currentPassword" label="Текущий пароль" autoComplete="current-password" />
        <PasswordInput name="newPassword" label="Новый пароль" autoComplete="new-password" minLength={12} />
        <PasswordInput name="confirmation" label="Повторите новый пароль" autoComplete="new-password" minLength={12} />
        <div aria-live="polite" className="min-h-5">
          {message && <Typography variant="caption" className={`normal-case tracking-normal ${isSuccess ? "text-pfa-accent" : "text-red-300"}`}>{message}</Typography>}
        </div>
        <Button type="submit" shape="square" size="compact" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем" : "Сохранить пароль"}
        </Button>
      </form>
    </Card>
  );
}

function PasswordInput({ name, label, autoComplete, minLength }: { name: string; label: string; autoComplete: string; minLength?: number }) {
  return (
    <label>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>
      <input required minLength={minLength} maxLength={500} name={name} type="password" autoComplete={autoComplete} className="h-14 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent" />
    </label>
  );
}
