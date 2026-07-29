"use client";

import React, { useMemo, useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { MOCK_MY_APPLICATIONS, Application } from "@/lib/api";
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

const STAGE_CONFIG = [
  { name: "Screening", statuses: ["APPLIED", "SCREENED"], badgeColor: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "Shortlisted", statuses: ["SHORTLISTED"], badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "Demo Scheduled", statuses: ["DEMO_SCHEDULED"], badgeColor: "bg-amber-100 text-amber-700 border-amber-200" },
  { name: "Hired", statuses: ["HIRED"], badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200" }
] as const;

export default function RedesignedLightMyTuitionsPipelinePage() {
  const [openSection, setOpenSection] = useState<string>("Screening");

  const applicationsByStage = useMemo(() => {
    const grouped: Record<string, Application[]> = {};
    for (const stage of STAGE_CONFIG) {
      grouped[stage.name] = MOCK_MY_APPLICATIONS.filter((app) =>
        stage.statuses.includes(app.status)
      );
    }
    return grouped;
  }, []);

  const stages = STAGE_CONFIG.map((stage) => ({
    ...stage,
    count: applicationsByStage[stage.name]?.length ?? 0
  }));

  const renderApplicationCard = (app: Application) => {
    const tuition = app.tuition;
    if (!tuition) return null;

    return (
      <div
        key={app.id}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-indigo-300 transition shadow-xs"
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-indigo-600 font-bold">#{tuition.tuition_code}</span>
          <span>{tuition.created_at}</span>
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900 text-base">{tuition.title}</h3>
        </div>

        <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{tuition.subjects.join(", ")} • {tuition.grade_level}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>{tuition.area}, {tuition.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{tuition.teaching_mode === "HOME" ? "Home Tuition" : "Online Tuition"}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-extrabold text-slate-900">
              Rs {tuition.offered_fee.toLocaleString()} / mo
              {tuition.is_negotiable ? " (Negotiable)" : ""}
            </span>
          </div>
        </div>

        {app.pitch_notes && (
          <p className="text-xs text-slate-600 italic border-l-2 border-indigo-200 pl-3">
            {app.pitch_notes}
          </p>
        )}

        <div className="pt-2 flex items-center justify-between border-t border-slate-200">
          <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {app.status === "DEMO_SCHEDULED"
              ? "Demo session scheduled"
              : app.status === "SHORTLISTED"
              ? "Shortlisted by parent"
              : "Under Review by FayazTutes Staff"}
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {app.status === "DEMO_SCHEDULED" ? "Step 3 / 4" : app.status === "SHORTLISTED" ? "Step 2 / 4" : "Step 1 / 4"}
          </span>
        </div>
      </div>
    );
  };

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

        {STAGE_CONFIG.map((stage) => {
          const apps = applicationsByStage[stage.name] ?? [];
          if (openSection !== stage.name) return null;

          return (
            <div key={stage.name} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
              <button
                onClick={() => setOpenSection(openSection === stage.name ? "" : stage.name)}
                className="w-full flex items-center justify-between font-bold text-lg text-slate-900 border-b border-slate-100 pb-4"
              >
                <div className="flex items-center gap-3">
                  {stage.name === "Shortlisted" ? (
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  ) : stage.name === "Demo Scheduled" ? (
                    <Calendar className="w-5 h-5 text-amber-600" />
                  ) : (
                    <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform ${openSection === stage.name ? "" : "-rotate-90"}`} />
                  )}
                  <span>{stage.name}</span>
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold border ${stage.badgeColor}`}>
                    {apps.length}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-normal">
                  {apps.length} {apps.length === 1 ? "opportunity" : "opportunities"}
                </span>
              </button>

              {apps.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">No applications in this stage yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  {apps.map(renderApplicationCard)}
                  {stage.name === "Demo Scheduled" && apps[0]?.tuition && (
                    <div className="md:col-span-2">
                      <a
                        href="https://zoom.us/j/9876543210?pwd=fayaztutesdemo"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                      >
                        Join Zoom Demo Session ↗
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TutorLayout>
  );
}
