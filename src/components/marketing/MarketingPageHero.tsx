"use client";

import React, { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import type { LucideIcon } from "lucide-react";

interface MarketingPageHeroProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}

export function MarketingPageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  children,
}: MarketingPageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="text-center max-w-3xl mx-auto space-y-4 mb-12">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
        <BadgeIcon className="w-3.5 h-3.5" />
        {badge}
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      {children}
    </div>
  );
}
