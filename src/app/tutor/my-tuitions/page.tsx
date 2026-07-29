"use client";

import React, { useMemo, useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMyApplications } from "@/hooks/useApiData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen, MapPin, DollarSign } from "lucide-react";
import { Application } from "@/lib/api";

const STAGES = [
  { name: "Screening", statuses: ["APPLIED", "SCREENED"] },
  { name: "Shortlisted", statuses: ["SHORTLISTED"] },
  { name: "Demo Scheduled", statuses: ["DEMO_SCHEDULED"] },
  { name: "Hired", statuses: ["HIRED"] },
];

function ApplicationCard({ app }: { app: Application }) {
  const tuition = app.tuition;
  if (!tuition) return null;
  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs text-indigo-600 font-bold">#{tuition.tuition_code}</span>
        <Badge variant="default">{app.status.replace("_", " ")}</Badge>
      </div>
      <h3 className="font-bold text-slate-900">{tuition.title}</h3>
      <div className="text-xs text-slate-600 space-y-1">
        <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" />{tuition.subjects.join(", ")}</div>
        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{tuition.area}, {tuition.city}</div>
        <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" />Rs {tuition.offered_fee.toLocaleString()} / mo</div>
      </div>
      {app.pitch_notes && <p className="text-xs text-slate-500 italic border-l-2 border-indigo-200 pl-2">{app.pitch_notes}</p>}
    </Card>
  );
}

export default function MyTuitionsPage() {
  const { applications, loading } = useMyApplications();
  const [openSection, setOpenSection] = useState("Screening");

  const byStage = useMemo(() => {
    const grouped: Record<string, Application[]> = {};
    for (const stage of STAGES) {
      grouped[stage.name] = applications.filter((a) => stage.statuses.includes(a.status));
    }
    return grouped;
  }, [applications]);

  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>
        <div className="space-y-6">
          <PageHeader title="Tuition Opportunities" description="Track your applications across pipeline stages." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((stage) => (
              <button
                key={stage.name}
                onClick={() => setOpenSection(stage.name)}
                className={`p-4 rounded-2xl border text-left transition ${
                  openSection === stage.name ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200"
                }`}
              >
                <div className="text-xs text-slate-500 font-semibold">{stage.name}</div>
                <div className="text-xl font-extrabold text-slate-900">{byStage[stage.name]?.length ?? 0}</div>
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">Loading applications...</p>
          ) : applications.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No applications yet"
              description="Browse active tuitions and submit your first application."
              actionLabel="Browse Active Tuitions"
              actionHref="/tutor/tuitions"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(byStage[openSection] ?? []).map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
              {(byStage[openSection] ?? []).length === 0 && (
                <p className="text-sm text-slate-500 col-span-2">No applications in this stage.</p>
              )}
            </div>
          )}
        </div>
      </TutorLayout>
    </ProtectedRoute>
  );
}
