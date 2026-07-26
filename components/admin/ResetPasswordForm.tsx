"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

interface Props {
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmation = String(formData.get("confirmation") || "");

    if (password !== confirmation) {
      setMessage("Пароли не совпадают.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = await response.json() as { message?: string };
      setMessage(result.message || "Не удалось изменить пароль.");
      setIsSuccess(response.ok);
    } catch {
      setMessage("Не удалось изменить пароль. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card as="div" className="w-full max-w-[560px] bg-[#081321] p-8 max-sm:p-6">
      <Typography as="h1" variant="sectionTitle" className="text-[clamp(1.8rem,5vw,3.2rem)]">
        Новый пароль
      </Typography>
      <Typography variant="bodyMedium" className="mt-5 text-slate-300">
        Используйте не менее 12 символов. Ссылка сработает только один раз.
      </Typography>
      {!isSuccess && token ? (
        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <PasswordField name="password" label="Новый пароль" autoComplete="new-password" />
          <PasswordField name="confirmation" label="Повторите пароль" autoComplete="new-password" />
          <div aria-live="polite" className="min-h-5">
            {message && <Typography variant="caption" className="normal-case tracking-normal text-red-300">{message}</Typography>}
          </div>
          <Button type="submit" shape="square" size="compact" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем" : "Изменить пароль"}
          </Button>
        </form>
      ) : (
        <Typography variant="bodyMedium" className={`mt-8 ${isSuccess ? "text-pfa-accent" : "text-red-300"}`}>
          {isSuccess ? message : "В ссылке отсутствует токен восстановления."}
        </Typography>
      )}
      <Link href="/admin/login" className="mt-6 inline-block text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline">
        Перейти ко входу
      </Link>
    </Card>
  );
}

function PasswordField({ name, label, autoComplete }: { name: string; label: string; autoComplete: string }) {
  return (
    <label>
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">{label}</span>
      <input required minLength={12} maxLength={500} name={name} type="password" autoComplete={autoComplete} className="h-14 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent" />
    </label>
  );
}
