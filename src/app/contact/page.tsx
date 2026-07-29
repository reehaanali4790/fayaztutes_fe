"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { PageSection } from "@/components/layout/PageSection";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AnimatedSection } from "@/components/marketing/AnimatedSection";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`FayazTutes Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:support@fayaztutes.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <MarketingLayout>
      <PageSection>
        <div className="max-w-4xl mx-auto space-y-10">
          <MarketingPageHero
            badge="Get in Touch"
            badgeIcon={MessageCircle}
            title="Contact FayazTutes"
            description="Have a question about finding a tutor, becoming an educator, or our policies? Our team responds within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <AnimatedSection className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                <h2 className="font-extrabold text-slate-900">Reach Us</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Email</div>
                      <a href="mailto:support@fayaztutes.com" className="text-slate-600 hover:text-indigo-600 transition">
                        support@fayaztutes.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Head Office</div>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        2nd Floor, Building No. 5, DHA Phase 5, Karachi, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                  Looking for a tutor?{" "}
                  <Link href="/parent/post-tuition" className="text-indigo-600 font-bold hover:underline">
                    Post a tuition request
                  </Link>{" "}
                  for faster matching.
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-3" delay={0.1}>
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                  <div className="text-emerald-700 font-extrabold text-lg">Message Ready to Send</div>
                  <p className="text-sm text-emerald-600">
                    Your email client should open shortly. If it didn&apos;t, email us directly at{" "}
                    <a href="mailto:support@fayaztutes.com" className="font-bold underline">
                      support@fayaztutes.com
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm space-y-5">
                  <h2 className="font-extrabold text-slate-900">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </PageSection>
    </MarketingLayout>
  );
}
