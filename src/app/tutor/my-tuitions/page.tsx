"use client";

import React, { useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { 
  ChevronDown, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle, 
  Calendar,
  BookOpen
} from "lucide-react";

export default function RedesignedLightMyTuitionsPipelinePage() {
  const [openSection, setOpenSection] = useState<string>("Screening");

  const stages = [
    { name: "Screening", count: 2, badgeColor: "bg-purple-100 text-purple-700 border-purple-200" },
    { name: "Shortlisted", count: 1, badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { name: "Demo Scheduled", count: 1, badgeColor: "bg-amber-100 text-amber-700 border-amber-200" },
    { name: "Hired", count: 0, badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200" }
  ];

  return (
    <TutorLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tuition Opportunities
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your applications across different stages in real-time.
          </p>
        </div>

        {/* Stages Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stages.map((stage) => (
            <button
              key={stage.name}
              onClick={() => setOpenSection(stage.name)}
              className={`p-4 rounded-2xl border text-left transition flex items-center justify-between shadow-xs ${
                openSection === stage.name 
                  ? "bg-indigo-50/80 border-indigo-300 font-bold" 
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div>
                <div className="text-xs text-slate-500 font-semibold">{stage.name}</div>
                <div className="text-xl font-extrabold text-slate-900 mt-0.5">{stage.count}</div>
              </div>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${stage.badgeColor}`}>
                {stage.count}
              </span>
            </button>
          ))}
        </div>

        {/* Screening Stage Accordion/Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
          <button
            onClick={() => setOpenSection(openSection === "Screening" ? "" : "Screening")}
            className="w-full flex items-center justify-between font-bold text-lg text-slate-900 border-b border-slate-100 pb-4"
          >
            <div className="flex items-center gap-3">
              <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform ${openSection === "Screening" ? "" : "-rotate-90"}`} />
              <span>Screening</span>
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-xs flex items-center justify-center font-bold">
                2
              </span>
            </div>
            <span className="text-xs text-slate-500 font-normal">2 opportunities</span>
          </button>

          {openSection === "Screening" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {/* Card 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-indigo-300 transition shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-indigo-600 font-bold">#FT-20263983</span>
                  <span>2 weeks ago</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Grade: 10 Arts Subject: All
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>All • 10 Arts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Lalazar Check Post, Karachi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Home Tuition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-extrabold text-slate-900">Rs 30,000 - 35,000</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Under Review by FayazTutes Staff
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Step 1 / 4</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-indigo-300 transition shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-indigo-600 font-bold">#FT-20264170</span>
                  <span>Jun 15, 2026</span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Grade: Grade 7 Subject: Basics English Urdu maths reading writing speaking
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Basics English Urdu maths reading writing speaking • Grade 7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Clifton 3 Talwar, Karachi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Home Tuition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-extrabold text-slate-900">Negotiable before demo class</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Under Review by FayazTutes Staff
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Step 1 / 4</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shortlisted Section */}
        {openSection === "Shortlisted" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              Shortlisted Applications (1)
            </h2>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 max-w-xl">
              <div className="text-xs font-mono text-indigo-600 font-bold">#FT-20263889</div>
              <div className="font-bold text-slate-900 text-base">Grade: O level MJ-2027 Subject: Math & Physics</div>
              <div className="text-xs text-slate-600">📍 Scheme 33 Saadi Town, Karachi • Rs 30,000 / mo</div>
              <div className="text-xs font-bold text-indigo-700 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200">
                ✓ Shortlisted by parent! Awaiting demo slot confirmation.
              </div>
            </div>
          </div>
        )}

        {/* Demo Scheduled Section */}
        {openSection === "Demo Scheduled" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Demo Sessions Scheduled (1)
            </h2>
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 max-w-xl">
              <div className="text-xs font-mono text-indigo-600 font-bold">#FT-20263890</div>
              <div className="font-bold text-slate-900 text-base">Grade: A level Student Subject: Computer Science</div>
              <div className="text-xs text-slate-600">💻 Online Zoom • Scheduled for Tomorrow, 5:00 PM PKT</div>
              <a 
                href="https://zoom.us/j/9876543210?pwd=fayaztutesdemo" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
              >
                Join Zoom Demo Session ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </TutorLayout>
  );
}
