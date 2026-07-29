"use client";

import React from "react";
import { ShieldCheck, Lock, Star, BadgeCheck } from "lucide-react";

const badges = [
  { icon: BadgeCheck, label: "CNIC-Verified Tutors", sub: "Identity & credential checks" },
  { icon: Lock, label: "Escrow Protection", sub: "First-month fee safeguard" },
  { icon: Star, label: "2 Free Demo Classes", sub: "Evaluate before you commit" },
  { icon: ShieldCheck, label: "Satisfaction Guarantee", sub: "Replace tutor if not a fit" },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex flex-wrap justify-center gap-3"
          : "grid grid-cols-2 lg:grid-cols-4 gap-4"
      }
    >
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-start gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <badge.icon className="w-[18px] h-[18px]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{badge.label}</div>
            {!compact && (
              <div className="text-[11px] text-slate-500 mt-0.5">{badge.sub}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
