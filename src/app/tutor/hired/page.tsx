"use client";

import React from "react";
import { useMyApplications } from "@/hooks/useApiData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Award } from "lucide-react";

export default function HiredTuitionsPage() {
  const { applications, loading } = useMyApplications();
  const hired = applications.filter((a) => a.status === "HIRED");

  return (
    <div className="space-y-6">
          <PageHeader title="Hired Tuitions" description="Active tuition engagements and payout details." />

          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : hired.length === 0 ? (
            <EmptyState
              icon={Award}
              title="No hired tuitions yet"
              description="Once a parent hires you after demo classes, your active engagements will appear here."
              actionLabel="View Applications"
              actionHref="/tutor/my-tuitions"
            />
          ) : (
            hired.map((app) => (
              <Card key={app.id} className="p-6 space-y-2">
                <div className="font-mono text-xs text-indigo-600 font-bold">{app.tuition?.tuition_code}</div>
                <h3 className="font-bold text-lg text-slate-900">{app.tuition?.title}</h3>
                <p className="text-xs text-slate-600">
                  {app.tuition?.area}, {app.tuition?.city} — Rs {app.tuition?.offered_fee.toLocaleString()} / mo
                </p>
              </Card>
            ))
          )}
    </div>
  );
}
