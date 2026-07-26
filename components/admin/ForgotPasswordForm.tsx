"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const result = await response.json() as { message?: string };
      setMessage(result.message || "Не удалось отправить ссылку.");
      setIsSuccess(response.ok);
    } catch {
      setMessage("Не удалось отправить ссылку. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card as="div" className="w-full max-w-[560px] bg-[#081321] p-8 max-sm:p-6">
      <Typography as="h1" variant="sectionTitle" className="text-[clamp(1.8rem,5vw,3.2rem)]">
        Восстановление доступа
      </Typography>
      <Typography variant="bodyMedium" className="mt-5 text-slate-300">
        Введите email, указанный для вашей учётной записи администратора.
      </Typography>
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <label>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">Email</span>
          <input required autoComplete="email" name="email" type="email" className="h-14 w-full border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none focus:border-pfa-accent" />
        </label>
        <div aria-live="polite" className="min-h-5">
          {message && <Typography variant="caption" className={`normal-case tracking-normal ${isSuccess ? "text-pfa-accent" : "text-red-300"}`}>{message}</Typography>}
        </div>
        <Button type="submit" shape="square" size="compact" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправляем" : "Получить ссылку"}
        </Button>
      </form>
      <Link href="/admin/login" className="mt-6 inline-block text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline">
        Вернуться ко входу
      </Link>
    </Card>
  );
}
