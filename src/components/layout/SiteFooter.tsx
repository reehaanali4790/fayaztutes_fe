import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-extrabold text-lg text-slate-900">FayazTutes</div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Pakistan&apos;s premier home and online tutor matching platform.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Portals
            </div>
            <div className="space-y-1 flex flex-col">
              <Link href="/tutor" className="text-slate-600 hover:text-indigo-600 transition">
                Tutor Dashboard
              </Link>
              <Link href="/parent/dashboard" className="text-slate-600 hover:text-indigo-600 transition">
                Parent Dashboard
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-indigo-600 transition">
                Admin Console
              </Link>
              <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition">
                Terms & Policies
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Authentication
            </div>
            <div className="space-y-1 flex flex-col">
              <Link href="/auth/login" className="text-slate-600 hover:text-indigo-600 transition">
                Sign In
              </Link>
              <Link href="/auth/signup/tutor" className="text-slate-600 hover:text-indigo-600 transition">
                Register as Tutor
              </Link>
              <Link href="/auth/signup/parent" className="text-slate-600 hover:text-indigo-600 transition">
                Register as Parent
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Contact Head Office
            </div>
            <div className="text-slate-600 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>2nd Floor, Building No. 5, DHA Phase 5, Karachi.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>+92 335 337 5337</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>support@fayaztutes.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-slate-200 text-center text-slate-500">
          © 2026 FayazTutes Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
