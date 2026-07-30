"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

export default function AdminLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: formData.get("login"),
          password: formData.get("password"),
        }),
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        const errorMessage = (
          result
          && typeof result === "object"
          && "message" in result
          && typeof result.message === "string"
        )
          ? result.message
          : "Не удалось выполнить вход.";
        throw new Error(errorMessage);
      }

      window.location.assign("/admin/applications");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось выполнить вход.");
      setIsSubmitting(false);
    }
  };

  return (
    <Card as="div" className="w-full max-w-[520px] bg-[#081321] p-8 max-sm:p-6">
      <Typography as="h1" variant="sectionTitle" className="text-[clamp(1.65rem,3.4vw,2.55rem)] leading-[.96]">
        Вход в <span className="text-pfa-accent">CRM</span>
      </Typography>
      <Typography variant="bodyMedium" className="mt-5 text-slate-300">
        Введите свои данные администратора PFA.
      </Typography>

      <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
        <label>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">
            Логин
          </span>
          <input
            required
            autoComplete="username"
            name="login"
            type="text"
            className="h-14 w-full rounded-none border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none transition-colors focus:border-pfa-accent"
          />
        </label>

        <label>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-slate-300">
            Пароль
          </span>
          <input
            required
            autoComplete="current-password"
            name="password"
            type="password"
            className="h-14 w-full rounded-none border border-white/15 bg-[#050b14] px-4 text-sm text-white outline-none transition-colors focus:border-pfa-accent"
          />
        </label>

        <div aria-live="polite" className="min-h-5">
          {message && (
            <Typography variant="caption" className="normal-case tracking-normal text-red-300">
              {message}
            </Typography>
          )}
        </div>

        <Button
          type="submit"
          shape="square"
          size="compact"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Проверяем" : "Войти"}
        </Button>
      </form>
    </Card>
  );
}
