"use client";

import React from "react";
import Link from "next/link";
import { Route, Search, Users, Star, Lock, ChevronRight } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";
import { TrustBadges } from "@/components/marketing/TrustBadges";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Post Your Tuition Request",
    description: "Tell us the subject, grade level, city, budget, and whether you need home or online tuition. Takes under 2 minutes.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    step: 2,
    icon: Users,
    title: "Get Matched Within 24–48 Hours",
    description: "Our matching engine shortlists CNIC-verified tutors in your area based on subject expertise, availability, and ratings.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    step: 3,
    icon: Star,
    title: "Attend 2 Free Demo Classes",
    description: "Evaluate teaching style and subject mastery with up to 2 risk-free trial sessions before making any commitment.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    step: 4,
    icon: Lock,
    title: "Start with Escrow Protection",
    description: "Your first month's tuition is held in escrow for 30 days. Pay the tutor directly from month 2 onward with full confidence.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function HowItWorksPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-4xl mx-auto space-y-14">
          <MarketingPageHero
            badge="Simple Process"
            badgeIcon={Route}
            title="How FayazTutes Works"
            description="A transparent, four-step journey designed to eliminate risk and help families find the right tutor with confidence."
          />

          <div className="space-y-6">
            {steps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.05}>
                <div className="flex gap-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      Step {item.step}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 text-center">Why Families Trust FayazTutes</h2>
              <TrustBadges />
            </div>
          </AnimatedSection>

          <div className="text-center space-y-4">
            <Link
              href="/parent/post-tuition"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition"
            >
              Post a Tuition Request
              <ChevronRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-500">
              No payment required to get started.{" "}
              <Link href="/faq" className="text-indigo-600 hover:underline">
                Read our FAQ
              </Link>
            </p>
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
