import React from "react";
import Link from "next/link";
import { MapPin, Mail, ShieldCheck, Lock, BadgeCheck } from "lucide-react";

const footerLinks = {
  families: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Request a Tutor", href: "/parent/post-tuition" },
    { label: "Our Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Pricing & Policies", href: "/terms" },
  ],
  tutors: [
    { label: "Become a Tutor", href: "/for-tutors" },
    { label: "Tutor Sign Up", href: "/auth/signup/tutor" },
    { label: "Verification Process", href: "/safety" },
    { label: "Commission Policy", href: "/terms" },
  ],
  company: [
    { label: "About FayazTutes", href: "/about" },
    { label: "Safety & Trust", href: "/safety" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 text-sm mt-auto">
      {/* Trust strip */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            {[
              { icon: BadgeCheck, text: "CNIC-Verified Tutors" },
              { icon: Lock, text: "Escrow-Protected Payments" },
              { icon: ShieldCheck, text: "2 Free Demo Classes" },
              { icon: ShieldCheck, text: "Satisfaction Guarantee" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-700">
                <item.icon className="w-4 h-4 text-indigo-600 shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm">
                FT
              </div>
              <span className="font-extrabold text-lg text-slate-900">FayazTutes</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs">
              Pakistan&apos;s trusted home and online tutor matching platform. Verified educators, escrow protection, and 2 free demo classes for every family.
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>DHA Phase 5, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <a href="mailto:support@fayaztutes.com" className="hover:text-indigo-600 transition">
                  support@fayaztutes.com
                </a>
              </div>
            </div>
          </div>

          {/* For Families */}
          <div className="space-y-3">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              For Families
            </div>
            <nav className="flex flex-col gap-2">
              {footerLinks.families.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-600 hover:text-indigo-600 transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* For Tutors */}
          <div className="space-y-3">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              For Tutors
            </div>
            <nav className="flex flex-col gap-2">
              {footerLinks.tutors.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-600 hover:text-indigo-600 transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Company
            </div>
            <nav className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-600 hover:text-indigo-600 transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 FayazTutes. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-indigo-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
