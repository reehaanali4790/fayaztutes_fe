"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";

const faqs = [
  {
    q: "How quickly will I get matched with a tutor?",
    a: "Most families receive 2–3 verified tutor profiles within 24–48 hours of posting a tuition request. Urgent requests in Karachi, Lahore, and Islamabad are prioritized.",
  },
  {
    q: "What are the 2 Free Demo Classes?",
    a: "Before committing to a tutor, you can schedule up to 2 free trial sessions to evaluate teaching style, subject knowledge, and rapport with your child. No payment is required for demos.",
  },
  {
    q: "How does escrow protection work?",
    a: "For the first month of tuition, FayazTutes collects the fee in advance and holds it in escrow for 30 days. Funds are released to the tutor only after the month is completed satisfactorily. From month 2 onward, you pay the tutor directly.",
  },
  {
    q: "Are all tutors background-checked?",
    a: "Yes. Every tutor on FayazTutes undergoes CNIC identity verification and academic credential checks before being listed. Verified tutors display a CNIC-verified badge on their profile.",
  },
  {
    q: "What if the tutor is not a good fit?",
    a: "If you are unsatisfied after the demo classes or during the first month, contact our support team. We will help you find a replacement tutor at no additional placement fee.",
  },
  {
    q: "What commission do tutors pay?",
    a: "Tutors pay a one-time 50% placement commission on the first month's tuition only. From month 2 onward, tutors keep 100% of their earnings. Religious instruction is fully exempt from commission.",
  },
  {
    q: "Do you offer female-only tutors?",
    a: "Yes. When posting your request, specify that you need a female tutor. We guarantee assignment from our verified female educator network for both home and online tuition.",
  },
  {
    q: "Which cities do you serve?",
    a: "We actively match tutors in Karachi, Lahore, Islamabad, and surrounding areas for home tuition. Online tutoring is available worldwide for all subjects and grade levels.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition"
      >
        <span className="font-bold text-sm text-slate-900">{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-3xl mx-auto space-y-10">
          <MarketingPageHero
            badge="Help Center"
            badgeIcon={HelpCircle}
            title="Frequently Asked Questions"
            description="Everything parents and tutors need to know about matching, demos, escrow, and verification."
          />

          <AnimatedSection className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </AnimatedSection>

          <div className="text-center text-sm text-slate-600">
            Still have questions?{" "}
            <Link href="/contact" className="text-indigo-600 font-bold hover:underline">
              Contact our team
            </Link>
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
