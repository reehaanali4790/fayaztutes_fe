"use client";

import React from "react";
import Link from "next/link";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  Star, 
  ListFilter, 
  BookOpen, 
  CreditCard, 
  ExternalLink, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";

export default function RedesignedLightTutorHomePage() {
  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Welcome Light Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-6 lg:p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="space-y-2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                Tutor Dashboard
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                Welcome, Fayaz Ali! 👋
              </h1>
              <p className="text-indigo-100 text-sm max-w-xl font-normal">
                Track your active applications, manage upcoming demo classes, and explore new tuition leads matched to your subjects.
              </p>
            </div>

            <div className="flex items-center gap-3 z-10">
              <Link
                href="/tutor/tuitions"
                className="px-5 py-3 rounded-xl bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-sm shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ListFilter className="w-4 h-4 text-indigo-700" />
                Browse Active Tuitions
              </Link>
            </div>
          </div>

          {/* Your FayazTutes Rating Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Your FayazTutes Educator Rating
              </h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Top 5% Verified Educator
              </span>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-extrabold text-slate-900 flex items-center gap-2">
                  4.9
                  <span className="text-lg font-normal text-slate-500">/ 5.0</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Based on 24 verified parent & student reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-center text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                <div>
                  <div className="text-lg font-bold text-slate-900">12</div>
                  <div>Completed Tuitions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-600">100%</div>
                  <div>Demo Success Rate</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-600">8 Yrs</div>
                  <div>Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tutor/tuitions"
              className="group p-5 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ListFilter className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Active Tuitions
                </div>
                <div className="text-xs text-slate-500">Explore open requests</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/tutor/my-tuitions"
              className="group p-5 rounded-2xl bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 transition-all shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  My Tuitions
                </div>
                <div className="text-xs text-slate-500">Track 2 applications</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/tutor/account"
              className="group p-5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Add Bank Details
                </div>
                <div className="text-xs text-slate-500">Setup 1st month payout</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/terms"
              className="group p-5 rounded-2xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 transition-all shadow-xs flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Important Links
                </div>
                <div className="text-xs text-slate-500">Terms & Commission rules</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Live Pipeline Preview Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Active Application Pipeline
              </h2>
              <Link href="/tutor/my-tuitions" className="text-xs font-bold text-indigo-600 hover:underline">
                View Pipeline Stages $\rightarrow$
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-indigo-600 font-bold">#FT-20263983</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Screening</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">Grade: 10 Arts • Subject: All</div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <span>📍 Lalazar Check Post, Karachi</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Rs 30-35k</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-indigo-600 font-bold">#FT-20264170</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">Shortlisted</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">Grade: Grade 7 • Subject: Basics English Urdu maths</div>
                <div className="text-xs text-slate-600 flex items-center gap-2">
                  <span>📍 Clifton 3 Talwar, Karachi</span>
                  <span>•</span>
                  <span className="font-bold text-slate-900">Negotiable before demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TutorLayout>
    </ProtectedRoute>
  );
}
