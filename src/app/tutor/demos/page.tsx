"use client";

import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Calendar, Video, CheckCircle2, Star } from "lucide-react";
import { apiFetch, DemoSession } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDemoSlot } from "@/components/ui/DateTimePicker";

export default function DemosPage() {
  const { token } = useAuth();
  const [demos, setDemos] = useState<DemoSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const loadDemos = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await apiFetch("/demos/mine", {}, token);
      if (res.ok) setDemos(await res.json());
      else setDemos([]);
    } catch {
      setDemos([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadDemos();
  }, [loadDemos]);

  const markComplete = async (demoId: string) => {
    if (!token) return;
    setActionError("");
    setActionSuccess("");
    try {
      const res = await apiFetch(`/demos/${demoId}/complete`, { method: "POST" }, token);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setActionError(err.detail || "Failed to mark complete.");
        return;
      }
      setActionSuccess("Demo marked complete — parent can now leave a review.");
      await loadDemos();
    } catch {
      setActionError("Unable to reach the server.");
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      SCHEDULED: "bg-indigo-50 text-indigo-700 border-indigo-200",
      COMPLETED: "bg-amber-50 text-amber-800 border-amber-200",
      PASSED: "bg-emerald-50 text-emerald-800 border-emerald-200",
      FAILED: "bg-red-50 text-red-700 border-red-200",
    };
    return map[status] || "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Demo Sessions"
        description="Your schedule with parents. Mark sessions complete after the class so they can leave a review."
      />

      {actionError && (
        <p className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">{actionError}</p>
      )}
      {actionSuccess && (
        <p className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          {actionSuccess}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : demos.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No demo sessions scheduled"
          description="When a parent books a demo for your application, it will appear here."
          actionLabel="View Applications"
          actionHref="/tutor/my-tuitions"
        />
      ) : (
        demos.map((demo) => (
          <Card key={demo.id} className="p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-mono text-xs text-indigo-600 font-bold">
                {demo.tuition_code || "Tuition"} — Demo #{demo.demo_number}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge(demo.status)}`}>
                {demo.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-900">{demo.tuition_title || "Demo session"}</h3>
            <p className="text-xs text-slate-600">
              With {demo.parent_name || "parent"} · {formatDemoSlot(demo.scheduled_at)}
            </p>
            {demo.meeting_link && demo.status === "SCHEDULED" && (
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
            {demo.status === "SCHEDULED" && (
              <Button onClick={() => markComplete(demo.id)} className="text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Demo Completed
              </Button>
            )}
            {demo.rating != null && (
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> Parent rated {demo.rating}/5
                </div>
                {demo.parent_feedback && <p className="italic">“{demo.parent_feedback}”</p>}
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
