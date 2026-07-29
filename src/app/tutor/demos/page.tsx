"use client";

import React, { useMemo, useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMyApplications } from "@/hooks/useApiData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar, Video } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { DemoSession } from "@/lib/api";

export default function DemosPage() {
  const { token } = useAuth();
  const { applications, loading } = useMyApplications();
  const demoApps = applications.filter((a) => a.status === "DEMO_SCHEDULED");
  const [demos, setDemos] = useState<Record<string, DemoSession[]>>({});

  React.useEffect(() => {
    if (!token) return;
    demoApps.forEach(async (app) => {
      const res = await apiFetch(`/demos/application/${app.id}`, {}, token);
      if (res.ok) {
        const data = await res.json();
        setDemos((prev) => ({ ...prev, [app.id]: data }));
      }
    });
  }, [token, demoApps.length]);

  const allDemos = useMemo(() => {
    return demoApps.flatMap((app) =>
      (demos[app.id] || []).map((d) => ({ ...d, tuition: app.tuition }))
    );
  }, [demoApps, demos]);

  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>
        <div className="space-y-6">
          <PageHeader
            title="Demo Sessions"
            description="View your scheduled demo classes with prospective students."
          />

          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : allDemos.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No demo sessions scheduled"
              description="When a parent books a demo for your application, it will appear here."
              actionLabel="View Applications"
              actionHref="/tutor/my-tuitions"
            />
          ) : (
            allDemos.map((demo) => (
              <Card key={demo.id} className="p-6 space-y-3">
                <div className="font-mono text-xs text-indigo-600 font-bold">
                  {demo.tuition?.tuition_code} — Demo #{demo.demo_number}
                </div>
                <h3 className="font-bold text-slate-900">{demo.tuition?.title}</h3>
                <p className="text-xs text-slate-600">{demo.scheduled_at}</p>
                {demo.meeting_link && (
                  <a
                    href={demo.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Join Demo Session
                  </a>
                )}
              </Card>
            ))
          )}
        </div>
      </TutorLayout>
    </ProtectedRoute>
  );
}
