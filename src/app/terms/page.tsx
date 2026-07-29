"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";

export default function TermsPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              FayazTutes Policy Architecture
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Terms & Commission Policies</h1>
            <p className="text-xs text-slate-500">Transparent service terms for parents, students, and tutors (Updated May 2026)</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-6 text-xs text-slate-700 shadow-sm">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">1. Tutor Commission Structure</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Standard Monthly Tuitions:</strong> 50% one-time placement commission on the first month&apos;s tuition fee only. 0% commission from Month 2 onward.</li>
                <li><strong>Short-Term Tuitions (1 month or less):</strong> 35% commission on the total fee.</li>
                <li><strong>Religious Instruction:</strong> 0% commission (100% exempt from day 1).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">2. Managed First-Month Escrow Policy</h2>
              <p className="leading-relaxed">
                For the first month, FayazTutes collects the tuition fee in advance from parents. Funds are locked in escrow and released to the tutor 30 days after tuition commences (minus 50% placement commission). From the second month onward, parents pay the tutor directly.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">3. Mandatory 2 Free Demo Classes</h2>
              <p className="leading-relaxed">
                All tutors registered on FayazTutes agree to provide up to 2 free trial demo sessions to allow students and parents to evaluate fit before finalizing any tuition contract.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">4. Tutor Verification & CNIC Policy</h2>
              <p className="leading-relaxed">
                Every tutor must submit valid CNIC documentation and academic credentials. Tutors violating professional conduct or punctuality are permanently delisted from the platform network.
              </p>
            </section>
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
