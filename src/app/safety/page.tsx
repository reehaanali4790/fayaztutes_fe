"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Lock,
  FileCheck,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";

const safetyFeatures = [
  {
    icon: BadgeCheck,
    title: "CNIC Identity Verification",
    description: "Every tutor submits a valid CNIC. Our team verifies identity before any tutor is listed or matched with a family.",
  },
  {
    icon: FileCheck,
    title: "Academic Credential Checks",
    description: "Degrees, certifications, and subject qualifications are reviewed to ensure tutors meet the standards parents expect.",
  },
  {
    icon: UserCheck,
    title: "Background Screening",
    description: "Tutors undergo professional conduct screening. Those with violations or complaints are permanently delisted.",
  },
  {
    icon: Lock,
    title: "Escrow Payment Protection",
    description: "First-month tuition is held in escrow for 30 days, protecting both parents and tutors from payment disputes.",
  },
  {
    icon: ShieldCheck,
    title: "2 Free Demo Classes",
    description: "Families evaluate tutors risk-free before committing. This reduces mismatches and builds long-term trust.",
  },
  {
    icon: AlertTriangle,
    title: "Report & Replace Policy",
    description: "If a tutor does not meet expectations, families can report the issue and request a replacement at no extra placement fee.",
  },
];

export default function SafetyPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-4xl mx-auto space-y-12">
          <MarketingPageHero
            badge="Trust & Safety"
            badgeIcon={ShieldCheck}
            title="Safety & Verification"
            description="FayazTutes is built on verified educators, transparent policies, and financial safeguards that protect every family and tutor on the platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {safetyFeatures.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.04}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm h-full">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 text-center space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">Questions about our safety policies?</h2>
              <p className="text-sm text-slate-600">
                Read our full terms or reach out to our team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <Link href="/terms" className="text-sm font-bold text-indigo-600 hover:underline">
                  Terms & Policies
                </Link>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <Link href="/contact" className="text-sm font-bold text-indigo-600 hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
