import React from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-2xl shadow-sm",
        hover && "hover:border-indigo-300 hover:shadow-md transition",
        className
      )}
    >
      {children}
    </div>
  );
}
