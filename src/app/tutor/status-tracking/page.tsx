"use client";

import React, { useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Search,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function StatusTrackingPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "SCREENING" | "SHORTLISTED" | "DEMO" | "HIRED">("ALL");

  const applications = [
    {
      id: "st-1",
      code: "FT-20263888",
      title: "Grade 3, 4 & 6 All Cambridge Primary",
      city: "Karachi",
      area: "DHA Phase 8 Creek Vista",
      fee: "Rs 35,000 / mo",
      mode: "Home Tuition",
      stage: "SCREENING",
      stageStep: 1,
      updatedAt: "Today, 10:15 AM",
      statusDetail: "Under Operations Staff Screening (CNIC Verified)"
    },
    {
      id: "st-2",
      code: "FT-20263889",
      title: "O Level MJ-2027 Subject: Math & Physics",
      city: "Karachi",
      area: "Scheme 33 Saadi Town",
      fee: "Rs 30,000 / mo",
      mode: "Home Tuition",
      stage: "SHORTLISTED",
      stageStep: 2,
      updatedAt: "Yesterday, 4:30 PM",
      statusDetail: "Shortlisted by Parent. Awaiting Demo Slot Confirmation."
    },
    {
      id: "st-3",
      code: "FT-20263890",
      title: "A Level Computer Science & Math",
      city: "Karachi",
      area: "DHA Phase 5",
      fee: "Rs 40,000 / mo",
      mode: "Online Tuition",
      stage: "DEMO",
      stageStep: 3,
      updatedAt: "July 27, 2026",
      statusDetail: "Demo Session #1 Scheduled for Tomorrow, 5:00 PM PKT"
    }
  ];

  const filteredApps = applications.filter((app) => {
    if (activeTab === "ALL") return true;
    return app.stage === activeTab;
  });

  return (
    <TutorLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
            <Activity className="w-3.5 h-3.5" /> Live Status Tracker
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tuitions Status Tracking
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time status tracking for all your active tuition applications and demo session approvals.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-slate-200 gap-2">
          {[
            { id: "ALL", label: "All Applications (3)" },
            { id: "SCREENING", label: "Screening (1)" },
            { id: "SHORTLISTED", label: "Shortlisted (1)" },
            { id: "DEMO", label: "Demo Class (1)" },
            { id: "HIRED", label: "Hired (0)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status List */}
        <div className="space-y-4">
          {filteredApps.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">{item.code}</div>
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold text-center self-start sm:self-auto ${
                  item.stage === "SCREENING"
                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                    : item.stage === "SHORTLISTED"
                    ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}>
                  STAGE {item.stageStep} / 4: {item.stage}
                </span>
              </div>

              {/* Stepper Visualization */}
              <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                <div className={`p-2 rounded-xl border ${item.stageStep >= 1 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  1. Screening
                </div>
                <div className={`p-2 rounded-xl border ${item.stageStep >= 2 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  2. Shortlisted
                </div>
                <div className={`p-2 rounded-xl border ${item.stageStep >= 3 ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  3. Demo Class
                </div>
                <div className={`p-2 rounded-xl border ${item.stageStep >= 4 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-slate-50 border-slate-200 text-slate-400"}`}>
                  4. Hired
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-700">
                <div className="font-bold text-slate-900">Current Status Detail:</div>
                <div className="text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  {item.statusDetail}
                </div>
                <div className="text-slate-400 text-[11px]">Last Updated: {item.updatedAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
