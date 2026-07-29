"use client";

import React, { useState } from "react";
import { useMyApplications } from "@/hooks/useApiData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Activity } from "lucide-react";

const FILTERS = [
  { id: "ALL", label: "All" },
  { id: "SCREENING", label: "Screening", statuses: ["APPLIED", "SCREENED"] },
  { id: "SHORTLISTED", label: "Shortlisted", statuses: ["SHORTLISTED"] },
  { id: "DEMO", label: "Demo", statuses: ["DEMO_SCHEDULED"] },
  { id: "HIRED", label: "Hired", statuses: ["HIRED"] },
];

export default function StatusTrackingPage() {
  const { applications, loading } = useMyApplications();
  const [filter, setFilter] = useState("ALL");

  const filtered = applications.filter((a) => {
    if (filter === "ALL") return true;
    const f = FILTERS.find((x) => x.id === filter);
    return f?.statuses?.includes(a.status);
  });

  const tabs = FILTERS.map((f) => ({
    id: f.id,
    label: f.label,
    count: f.id === "ALL"
      ? applications.length
      : applications.filter((a) => f.statuses?.includes(a.status)).length,
  }));

  return (
    <div className="space-y-6">
          <PageHeader title="Status Tracking" description="Monitor all your tuition applications in one place." />
          <Tabs tabs={tabs} active={filter} onChange={setFilter} />

          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No applications found"
              description="Apply to tuition leads to start tracking your pipeline."
              actionLabel="Browse Tuitions"
              actionHref="/tutor/tuitions"
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((app) => (
                <Card key={app.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-indigo-600 font-bold">
                      {app.tuition?.tuition_code || app.tuition_id}
                    </div>
                    <div className="font-bold text-slate-900">{app.tuition?.title || "Tuition application"}</div>
                  </div>
                  <Badge>{app.status.replace("_", " ")}</Badge>
                </Card>
              ))}
            </div>
          )}
    </div>
  );
}
