"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useKYCQueue, useAdminEscrow } from "@/hooks/useApiData";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { PortalHero } from "@/components/layout/PortalHero";
import { ShieldCheck, CreditCard, Sparkles, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function AdminConsolePage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("kyc");
  const { queue, loading: kycLoading, reload: reloadKYC } = useKYCQueue();
  const { payments, loading: escrowLoading, reload: reloadEscrow } = useAdminEscrow();

  const pendingKYC = queue.filter((k) => !k.cnic_verified).length;
  const heldEscrow = payments.filter((p) => p.status === "HELD");
  const totalHeld = heldEscrow.reduce((sum, p) => sum + p.total_amount, 0);

  const handleKYC = async (profileId: string, approved: boolean) => {
    await apiFetch(`/admin/kyc/${profileId}`, {
      method: "POST",
      body: JSON.stringify({ approved }),
    }, token);
    reloadKYC();
  };

  const handleReleaseEscrow = async (escrowId: string) => {
    await apiFetch(`/escrow/${escrowId}/release`, { method: "POST" }, token);
    reloadEscrow();
  };

  const tabs = [
    { id: "kyc", label: "KYC Review", count: pendingKYC },
    { id: "escrow", label: "Escrow Release", count: heldEscrow.length },
    { id: "matching", label: "AI Matcher" },
    { id: "disputes", label: "Disputes" },
  ];

  return (
    <div className="space-y-6">
      <PortalHero
        label="Admin Console"
        title="Operations Dashboard"
        description="Verify tutors, release escrow, and manage platform operations."
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
          <div className="text-xs text-slate-500 font-semibold">Total Payments</div>
          <div className="text-2xl font-extrabold text-purple-600">{payments.length}</div>
        </Card>
      </div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "kyc" && (
        kycLoading ? (
          <p className="text-sm text-slate-500">Loading KYC queue...</p>
        ) : queue.length === 0 ? (
          <EmptyState icon={ShieldCheck} title="All tutors verified" description="No pending KYC reviews at this time." />
        ) : (
          <div className="space-y-3">
            {queue.map((item) => (
              <Card key={item.profile_id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs space-y-1">
                  <div className="font-extrabold text-slate-900">{item.tutor_name}</div>
                  <div className="text-slate-500">{item.email} — {item.city}</div>
                  <div className="text-slate-500">{item.education_level} — {(item.subjects || []).join(", ")}</div>
                </div>
                {!item.cnic_verified && (
                  <div className="flex gap-2">
                    <Button onClick={() => handleKYC(item.profile_id, true)} className="text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </Button>
                    <button onClick={() => handleKYC(item.profile_id, false)} className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200">
                      <XCircle className="w-3.5 h-3.5 inline" /> Reject
                    </button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )
      )}

      {activeTab === "escrow" && (
        escrowLoading ? (
          <p className="text-sm text-slate-500">Loading escrow records...</p>
        ) : payments.length === 0 ? (
          <EmptyState icon={CreditCard} title="No escrow payments" description="Escrow deposits will appear here when parents pay." />
        ) : (
          <div className="space-y-3">
            {payments.map((item) => (
              <Card key={item.id} className="p-5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-indigo-600">{item.tuition_id}</span>
                  <span className="font-bold">{item.status}</span>
                </div>
                <p className="text-xs text-slate-600">
                  Total: Rs {item.total_amount.toLocaleString()} — Tutor payout: Rs {item.tutor_payout_amount.toLocaleString()}
                </p>
                {item.status === "HELD" && (
                  <Button onClick={() => handleReleaseEscrow(item.id)} className="text-xs">
                    Release Tutor Payout
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )
      )}

      {activeTab === "matching" && (
        <EmptyState icon={Sparkles} title="AI Lead Matcher" description="Manual matching tools coming soon." />
      )}

      {activeTab === "disputes" && (
        <EmptyState icon={AlertCircle} title="Dispute Center" description="No open disputes. Dispute management coming in a future release." />
      )}
    </div>
  );
}
