"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AdminLogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.assign("/admin/login");
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      shape="square"
      size="compact"
      disabled={isSubmitting}
      onClick={logout}
    >
      {isSubmitting ? "Выходим" : "Выйти"}
    </Button>
  );
}
