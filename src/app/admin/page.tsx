"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useKYCQueue, useAdminEscrow } from "@/hooks/useApiData";
import { apiFetch, DemoSession } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PortalHero } from "@/components/layout/PortalHero";
import { formatDemoSlot } from "@/components/ui/DateTimePicker";
import {
  ShieldCheck,
  CreditCard,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Star,
} from "lucide-react";

export default function AdminConsolePage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("kyc");
  const { queue, loading: kycLoading, reload: reloadKYC } = useKYCQueue();
  const { payments, loading: escrowLoading, reload: reloadEscrow } = useAdminEscrow();
  const [demos, setDemos] = useState<DemoSession[]>([]);
  const [demosLoading, setDemosLoading] = useState(false);
  const [demoFilter, setDemoFilter] = useState("ALL");

  const loadDemos = useCallback(async () => {
    if (!token) return;
    setDemosLoading(true);
    try {
      const q = demoFilter === "ALL" ? "" : `?status=${demoFilter}`;
      const res = await apiFetch(`/demos/admin/all${q}`, {}, token);
      if (res.ok) setDemos(await res.json());
      else setDemos([]);
    } catch {
      setDemos([]);
    } finally {
      setDemosLoading(false);
    }
  }, [token, demoFilter]);

  useEffect(() => {
    if (activeTab === "demos") loadDemos();
  }, [activeTab, loadDemos]);

  const pendingKYC = queue.filter((k) => !k.cnic_verified).length;
  const heldEscrow = payments.filter((p) => p.status === "HELD");
  const totalHeld = heldEscrow.reduce((sum, p) => sum + p.total_amount, 0);
  const reviewedDemos = demos.filter((d) => d.rating != null).length;

  const handleKYC = async (profileId: string, approved: boolean) => {
    await apiFetch(
      `/admin/kyc/${profileId}`,
      {
        method: "POST",
        body: JSON.stringify({ approved }),
      },
      token
    );
    reloadKYC();
  };

  const handleReleaseEscrow = async (escrowId: string) => {
    await apiFetch(`/escrow/${escrowId}/release`, { method: "POST" }, token);
    reloadEscrow();
  };

  const tabs = [
    { id: "kyc", label: "KYC Review", count: pendingKYC },
    { id: "escrow", label: "Escrow Release", count: heldEscrow.length },
    { id: "demos", label: "Demos & Reviews", count: demos.length || undefined },
    { id: "matching", label: "AI Matcher" },
    { id: "disputes", label: "Disputes" },
  ];

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
      <PortalHero
        label="Admin Console"
        title="Operations Dashboard"
        description="Verify tutors, release escrow, and review demo outcomes across the platform."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Pending KYC</div>
          <div className="text-2xl font-extrabold text-amber-600">{pendingKYC}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Escrow Held</div>
          <div className="text-2xl font-extrabold text-emerald-600">Rs {totalHeld.toLocaleString()}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Active Escrows</div>
          <div className="text-2xl font-extrabold text-indigo-600">{heldEscrow.length}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-slate-500 font-semibold">Demo Reviews</div>
          <div className="text-2xl font-extrabold text-purple-600">{reviewedDemos}</div>
        </Card>
      </div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "kyc" &&
        (kycLoading ? (
          <p className="text-sm text-slate-500">Loading KYC queue...</p>
        ) : queue.length === 0 ? (
          <EmptyState icon={ShieldCheck} title="All tutors verified" description="No pending KYC reviews at this time." />
        ) : (
          <div className="space-y-3">
            {queue.map((item) => (
              <Card key={item.profile_id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs space-y-1">
                  <div className="font-extrabold text-slate-900">{item.tutor_name}</div>
                  <div className="text-slate-500">
                    {item.email} — {item.city}
                  </div>
                  <div className="text-slate-500">
                    {item.education_level} — {(item.subjects || []).join(", ")}
                  </div>
                </div>
                {!item.cnic_verified && (
                  <div className="flex gap-2">
                    <Button onClick={() => handleKYC(item.profile_id, true)} className="text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </Button>
                    <button
                      onClick={() => handleKYC(item.profile_id, false)}
                      className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200"
                    >
                      <XCircle className="w-3.5 h-3.5 inline" /> Reject
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ))}

      {activeTab === "escrow" &&
        (escrowLoading ? (
          <p className="text-sm text-slate-500">Loading escrow records...</p>
        ) : payments.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="No escrow payments"
            description="Escrow deposits will appear here when parents pay."
          />
        ) : (
          <div className="space-y-3">
            {payments.map((item) => (
              <Card key={item.id} className="p-5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-indigo-600">{item.tuition_id}</span>
                  <span className="font-bold">{item.status}</span>
                </div>
                <p className="text-xs text-slate-600">
                  Total: Rs {item.total_amount.toLocaleString()} — Tutor payout: Rs{" "}
                  {item.tutor_payout_amount.toLocaleString()}
                </p>
                {item.status === "HELD" && (
                  <Button onClick={() => handleReleaseEscrow(item.id)} className="text-xs">
                    Release Tutor Payout
                  </Button>
                )}
              </Card>
            ))}
          </div>
        ))}

      {activeTab === "demos" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {["ALL", "SCHEDULED", "COMPLETED", "PASSED", "FAILED"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setDemoFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                  demoFilter === f
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {demosLoading ? (
            <p className="text-sm text-slate-500">Loading demos...</p>
          ) : demos.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No demo sessions yet"
              description="When parents book demos, each session and review will appear here."
            />
          ) : (
            <div className="space-y-3">
              {demos.map((d) => (
                <Card key={d.id} className="p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-mono text-xs text-indigo-600 font-bold">
                      {d.tuition_code} · Demo #{d.demo_number}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge(d.status)}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{d.tuition_title}</div>
                  <div className="text-xs text-slate-600">
                    Parent: <strong>{d.parent_name || "—"}</strong> · Tutor:{" "}
                    <strong>{d.tutor_name || "—"}</strong>
                  </div>
                  <div className="text-xs text-slate-500">{formatDemoSlot(d.scheduled_at)}</div>
                  {d.rating != null ? (
                    <div className="text-xs bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {d.rating}/5 from parent
                      </div>
                      {d.parent_feedback && <p className="text-slate-700 italic">“{d.parent_feedback}”</p>}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No review submitted yet</p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "matching" && (
        <EmptyState icon={Sparkles} title="AI Lead Matcher" description="Manual matching tools coming soon." />
      )}

      {activeTab === "disputes" && (
        <EmptyState
          icon={AlertCircle}
          title="Dispute Center"
          description="No open disputes. Dispute management coming in a future release."
        />
      )}
    </div>
  );
}
