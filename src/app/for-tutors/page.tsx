"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BadgeCheck,
  Wallet,
  Clock,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";

const benefits = [
  {
    icon: Wallet,
    title: "0% Commission From Month 2",
    description: "Pay only a one-time 50% placement fee on the first month. Keep 100% of your earnings from month 2 onward.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: BadgeCheck,
    title: "Verified CNIC Badge",
    description: "Stand out to parents with a verified checkmark. Our verification process builds trust and increases your hire rate.",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    icon: BookOpen,
    title: "Home & Online Flexibility",
    description: "Choose your preferred mode, set your own schedule, and teach subjects you are passionate about.",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: Clock,
    title: "Guaranteed Escrow Payouts",
    description: "First-month tuition is collected upfront and released to you after 30 days — no chasing parents for payment.",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export default function ForTutorsPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-4xl mx-auto space-y-14">
          <MarketingPageHero
            badge="Educator Network"
            badgeIcon={GraduationCap}
            title="Teach with FayazTutes"
            description="Join Pakistan's growing network of verified home and online tutors. Get matched with families, earn reliably, and build your reputation."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.05}>
                <div className={`border rounded-2xl p-6 space-y-3 h-full ${b.color}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm text-center">
              <h2 className="text-xl font-extrabold text-slate-900">Ready to start teaching?</h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Create your tutor profile, submit your CNIC and credentials for verification, and start receiving tuition leads within days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/auth/signup/tutor"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition"
                >
                  Create Tutor Account
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/safety"
                  className="text-sm font-bold text-indigo-600 hover:underline"
                >
                  Learn about verification
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
