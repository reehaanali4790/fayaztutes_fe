"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMyTuitionLeads, useMyEscrow } from "@/hooks/useApiData";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { apiFetch, Application, DemoSession } from "@/lib/api";
import { PortalHero } from "@/components/layout/PortalHero";
import {
  Star,
  Video,
  Lock,
  CreditCard,
  ShieldCheck,
  BookOpen,
  Calendar,
  User,
  X,
} from "lucide-react";

export default function ParentDashboardPage() {
  const { user, token } = useAuth();
  const { leads, loading: leadsLoading } = useMyTuitionLeads();
  const { payments, loading: escrowLoading } = useMyEscrow();
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [demos, setDemos] = useState<(DemoSession & { tutorName?: string; tuitionTitle?: string })[]>([]);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    if (leads.length > 0 && !selectedLeadId) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads, selectedLeadId]);

  useEffect(() => {
    if (!token || !selectedLeadId) return;
    setAppsLoading(true);
    apiFetch(`/tuitions/${selectedLeadId}/applications`, {}, token)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Application[]) => setApplications(data))
      .catch(() => setApplications([]))
      .finally(() => setAppsLoading(false));
  }, [token, selectedLeadId]);

  useEffect(() => {
    if (!token || applications.length === 0) {
      setDemos([]);
      return;
    }
    const loadDemos = async () => {
      const all: (DemoSession & { tutorName?: string; tuitionTitle?: string })[] = [];
      for (const app of applications) {
        const res = await apiFetch(`/demos/application/${app.id}`, {}, token);
        if (res.ok) {
          const sessions: DemoSession[] = await res.json();
          sessions.forEach((d) => {
            all.push({
              ...d,
              tutorName: app.tutor_profile?.full_name || app.tutor?.full_name || "Tutor",
              tuitionTitle: app.tuition?.title,
            });
          });
        }
      }
      setDemos(all);
    };
    loadDemos();
  }, [token, applications]);

  const tabs = useMemo(
    () => [
      { id: "requests", label: "My Tuition Leads", count: leads.length },
      { id: "applicants", label: "Applicant Tutors", count: applications.length },
      { id: "demos", label: "Demo Classes", count: demos.length },
      { id: "escrow", label: "Escrow & Invoices", count: payments.length },
    ],
    [leads.length, applications.length, demos.length, payments.length]
  );

  const hasEscrowDeposit = payments.some((p) => p.status === "HELD" || p.status === "RELEASED");

  const handleBookDemo = (app: Application) => {
    setSelectedApp(app);
    setShowDemoModal(true);
    setBookingError("");
  };

  const handleConfirmDemoBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !token) return;
    setBookingError("");
    const scheduledAt = `${demoDate} ${demoTime}`;

    try {
      const res = await apiFetch("/demos/schedule", {
        method: "POST",
        body: JSON.stringify({
          application_id: selectedApp.id,
          scheduled_at: scheduledAt,
          demo_number: 1,
        }),
      }, token);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setBookingError(err.detail || "Failed to schedule demo.");
        return;
      }

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setShowDemoModal(false);
        setSelectedApp(null);
      }, 1500);
    } catch {
      setBookingError("Unable to reach the server.");
    }
  };

  return (
    <div className="space-y-6">
      <PortalHero
        label="Parent Dashboard"
        title={`Welcome, ${user?.full_name || "Parent"}`}
        description="Manage tuition leads, review applicants, schedule demos, and track escrow payments."
        accent="purple"
        action={
          <Link href="/parent/post-tuition">
            <Button variant="secondary" className="bg-white text-indigo-900 hover:bg-slate-100">
              Post New Tuition Lead
            </Button>
          </Link>
        }
      />

          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} accent="purple" />

          {activeTab === "requests" && (
            leadsLoading ? (
              <p className="text-sm text-slate-500">Loading your leads...</p>
            ) : leads.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="Post your first tuition request"
                description="Tell us what you need and we'll match verified tutors in your area."
                actionLabel="Start Wizard"
                actionHref="/parent/post-tuition"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((t) => (
                  <Card key={t.id} className="p-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono text-indigo-600 font-bold">{t.tuition_code}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {t.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900">{t.title}</h3>
                    <p className="text-xs text-slate-600">
                      {t.area}, {t.city} — Rs {t.offered_fee.toLocaleString()} / mo
                    </p>
                    <button
                      onClick={() => { setSelectedLeadId(t.id); setActiveTab("applicants"); }}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      View applicants
                    </button>
                  </Card>
                ))}
              </div>
            )
          )}

          {activeTab === "applicants" && (
            appsLoading ? (
              <p className="text-sm text-slate-500">Loading applicants...</p>
            ) : applications.length === 0 ? (
              <EmptyState
                icon={User}
                title="Tutors are reviewing your request"
                description="When tutors apply, their profiles and pitches will appear here."
              />
            ) : (
              <div className="space-y-4">
                {leads.length > 1 && (
                  <select
                    value={selectedLeadId || ""}
                    onChange={(e) => setSelectedLeadId(e.target.value)}
                    className="text-xs border border-slate-200 rounded-xl p-2"
                  >
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>{l.tuition_code} — {l.title}</option>
                    ))}
                  </select>
                )}
                {applications.map((app) => {
                  const name = app.tutor_profile?.full_name || app.tutor?.full_name || "Tutor";
                  const profile = app.tutor_profile;
                  return (
                    <Card key={app.id} className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-slate-900 text-lg">{name}</h3>
                          <p className="text-xs text-slate-600">{profile?.headline || profile?.education_level}</p>
                          {profile && profile.rating_count > 0 && (
                            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              {profile.rating_avg} ({profile.rating_count} reviews)
                            </div>
                          )}
                        </div>
                        <Button onClick={() => handleBookDemo(app)}>Book Demo Class</Button>
                      </div>
                      {app.pitch_notes && (
                        <p className="text-xs text-slate-600 italic border-l-2 border-purple-200 pl-2">{app.pitch_notes}</p>
                      )}
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs flex items-center gap-2 text-amber-900">
                        <Lock className="w-4 h-4" />
                        Contact details {hasEscrowDeposit ? "available after escrow deposit" : "masked until escrow deposit"}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )
          )}

          {activeTab === "demos" && (
            demos.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No demo sessions scheduled"
                description="Book a demo with an applicant tutor to evaluate fit."
                actionLabel="View Applicants"
                onAction={() => setActiveTab("applicants")}
              />
            ) : (
              demos.map((d) => (
                <Card key={d.id} className="p-6 space-y-3">
                  <div className="font-bold text-slate-900">{d.tutorName} — {d.tuitionTitle}</div>
                  <p className="text-xs text-slate-600">Demo #{d.demo_number} — {d.scheduled_at}</p>
                  {d.meeting_link && (
                    <a href={d.meeting_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600">
                      <Video className="w-4 h-4" /> Join Session
                    </a>
                  )}
                </Card>
              ))
            )
          )}

          {activeTab === "escrow" && (
            escrowLoading ? (
              <p className="text-sm text-slate-500">Loading payments...</p>
            ) : payments.length === 0 ? (
              <EmptyState
                icon={CreditCard}
                title="No escrow payments yet"
                description="After hiring a tutor, your first-month escrow deposit will appear here."
              />
            ) : (
              payments.map((p) => (
                <Card key={p.id} className="p-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono text-indigo-600">{p.tuition_id}</span>
                    <span className="font-bold text-emerald-700">{p.status}</span>
                  </div>
                  <p className="text-sm font-bold">Rs {p.total_amount.toLocaleString()} — Tutor payout: Rs {p.tutor_payout_amount.toLocaleString()}</p>
                  <div className="text-xs text-slate-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    FayazTutes escrow protection active
                  </div>
                </Card>
              ))
            )
          )}

          {showDemoModal && selectedApp && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
                <button onClick={() => setShowDemoModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
                <h3 className="text-xl font-extrabold">
                  Schedule Demo with {selectedApp.tutor_profile?.full_name || "Tutor"}
                </h3>
                {bookingSuccess ? (
                  <p className="text-sm font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl">Demo booked successfully!</p>
                ) : (
                  <form onSubmit={handleConfirmDemoBooking} className="space-y-3">
                    {bookingError && <p className="text-xs text-red-600">{bookingError}</p>}
                    <input type="text" placeholder="Date (e.g. 2026-08-01)" value={demoDate} onChange={(e) => setDemoDate(e.target.value)} className="w-full border rounded-xl p-3 text-xs" required />
                    <input type="text" placeholder="Time (e.g. 5:00 PM PKT)" value={demoTime} onChange={(e) => setDemoTime(e.target.value)} className="w-full border rounded-xl p-3 text-xs" required />
                    <Button type="submit" className="w-full">Confirm Demo Slot</Button>
                  </form>
                )}
              </div>
            </div>
          )}
    </div>
  );
}
