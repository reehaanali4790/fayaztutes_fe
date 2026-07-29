"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-3xl mx-auto space-y-8">
          <MarketingPageHero
            badge="Legal"
            badgeIcon={ShieldCheck}
            title="Privacy Policy"
            description="How FayazTutes collects, uses, and protects your personal information."
          />

          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-6 text-sm text-slate-700 shadow-sm">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">1. Information We Collect</h2>
              <p className="leading-relaxed text-slate-600">
                We collect information you provide when registering, posting tuition requests, or applying as a tutor — including name, email, phone number, city, CNIC (for tutors), academic credentials, and tuition preferences.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">2. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Matching parents with suitable verified tutors</li>
                <li>Processing escrow payments for the first month of tuition</li>
                <li>Verifying tutor identity and academic credentials</li>
                <li>Sending service-related communications and support responses</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">3. Data Sharing</h2>
              <p className="leading-relaxed text-slate-600">
                We do not sell your personal data. Limited information is shared between matched parents and tutors to facilitate tuition arrangements. CNIC documents are stored securely and used solely for verification purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">4. Data Security</h2>
              <p className="leading-relaxed text-slate-600">
                We use industry-standard encryption for data in transit and secure storage for sensitive documents. Access to personal data is restricted to authorized personnel only.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">5. Your Rights</h2>
              <p className="leading-relaxed text-slate-600">
                You may request access to, correction of, or deletion of your personal data by contacting us at{" "}
                <a href="mailto:support@fayaztutes.com" className="text-indigo-600 hover:underline">
                  support@fayaztutes.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">6. Contact</h2>
              <p className="leading-relaxed text-slate-600">
                For privacy-related inquiries, email{" "}
                <a href="mailto:support@fayaztutes.com" className="text-indigo-600 hover:underline">
                  support@fayaztutes.com
                </a>
                . Last updated: May 2026.
              </p>
            </section>
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
