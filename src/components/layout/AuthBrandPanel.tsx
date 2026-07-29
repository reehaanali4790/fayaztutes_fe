import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, BookOpen, Award, LucideIcon } from "lucide-react";

interface AuthBrandPanelProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title?: string;
  description?: string;
}

export function AuthBrandPanel({
  badge,
  badgeIcon: BadgeIcon,
  title = "Transform Your Learning Journey",
  description = "Join families achieving academic excellence through background-checked, personalized home and online tutoring.",
}: AuthBrandPanelProps) {
  return (
    <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-white text-indigo-700 font-extrabold text-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
            FT
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">FayazTutes</span>
        </Link>

        <div className="space-y-4 max-w-lg">
          {badge && BadgeIcon && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-100 text-xs font-bold border border-white/20">
              <BadgeIcon className="w-4 h-4" /> {badge}
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-indigo-100 text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">2 Free Demo Classes</h3>
            <p className="text-xs text-indigo-100">Try free before paying. Zero-risk trial for families.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">CNIC Verified Tutors</h3>
            <p className="text-xs text-indigo-100">Identity and academic degree screening.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-purple-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">O/A Levels and MDCAT</h3>
            <p className="text-xs text-indigo-100">Subject specialists for CAIE, FSc, and IB.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-blue-200">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">1st Month Escrow</h3>
            <p className="text-xs text-indigo-100">30-day parent deposit protection.</p>
          </div>
        </div>
      </div>

      <div className="pt-8 text-xs text-indigo-200 border-t border-white/10 flex items-center justify-between relative z-10">
        <span>© 2026 FayazTutes Platform. All rights reserved.</span>
        <span>DHA Phase 5, Karachi</span>
      </div>
    </div>
  );
}
