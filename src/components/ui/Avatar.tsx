import React from "react";
import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const sizes = {
  sm: "w-8 h-8 text-xs rounded-lg",
  md: "w-10 h-10 text-sm rounded-xl",
  lg: "w-14 h-14 text-lg rounded-2xl",
};

export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center shadow-md",
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </div>
  );
}
