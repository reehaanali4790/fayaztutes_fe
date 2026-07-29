"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ShieldCheck } from "lucide-react";

const Hero3DScene = dynamic(
  () => import("./Hero3DScene").then((m) => ({ default: m.Hero3DScene })),
  { ssr: false }
);

interface LandingHeroProps {
  badgeText: string;
  children: React.ReactNode;
}

export function LandingHero({ badgeText, children }: LandingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="search"
      ref={containerRef}
      className="relative pt-12 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-indigo-50/60 via-transparent to-transparent pointer-events-none" />
      <Hero3DScene />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4 mb-10 text-center lg:text-left lg:max-w-2xl">
        <div className="hero-animate inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          {badgeText}
        </div>

        <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find the <span className="gradient-text">Perfect Tutor</span> for Your Child
        </h1>

        <p className="hero-animate text-slate-600 text-base sm:text-lg font-normal max-w-xl">
          Personalized 1-on-1 home and online tutoring across Karachi, Lahore, Islamabad, and worldwide.{" "}
          <strong>2 Free Demo Classes included.</strong>
        </p>
      </div>

      <div className="hero-animate relative z-10">{children}</div>
    </section>
  );
}
