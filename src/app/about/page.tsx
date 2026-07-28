"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  GraduationCap 
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 lg:px-12 py-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-xl">
            FT
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            FayazTutes
          </span>
        </Link>
        <Link href="/parent/post-tuition" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md">
          Find a Tutor 🚀
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 py-12 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            About FayazTutes Platform
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Transforming Private Tutoring in Pakistan
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            FayazTutes is an ed-tech matching and management network created to bring transparency, security, and proven academic results to families across Karachi, Lahore, Islamabad, and online worldwide.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Verified Educators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every tutor in our database undergoes CNIC identity verification, degree checks, and subject background screening before placement.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">2 Free Demo Classes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We offer up to 2 free trial sessions so parents and students can evaluate mutual fit without any upfront fee commitment.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">1st Month Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We hold the 1st month tuition fee in escrow for 30 days to ensure teacher accountability and complete peace of mind for parents.
            </p>
          </div>
        </div>

        {/* Office Contact Info */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-extrabold text-white">Contact FayazTutes Headquarters</h2>
          <div className="text-xs text-slate-300 space-y-2">
            <div>📍 <strong>Address:</strong> 2nd Floor, Building No. 5, C-46 Street, Phase V, Tauheed Commercial Area, DHA Phase 5, Karachi 75500, Pakistan.</div>
            <div>📞 <strong>Phone / WhatsApp:</strong> +92 335 337 5337</div>
            <div>✉️ <strong>Email:</strong> support@fayaztutes.com</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs px-6 lg:px-12 py-8 text-center border-t border-slate-800">
        © 2026 FayazTutes Platform. All rights reserved.
      </footer>
    </div>
  );
}
