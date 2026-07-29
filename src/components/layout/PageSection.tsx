import React from "react";
import { cn } from "@/lib/cn";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "white" | "muted";
}

export function PageSection({
  children,
  className,
  id,
  variant = "default",
}: PageSectionProps) {
  const bg =
    variant === "white"
      ? "bg-white border-y border-slate-200/80"
      : variant === "muted"
      ? "bg-slate-50"
      : "";

  return (
    <section
      id={id}
      className={cn("py-16 px-6 lg:px-12", bg, className)}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}
