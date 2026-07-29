"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useMyTuitionLeads, useMyEscrow } from "@/hooks/useApiData";
import { Tabs } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { DateTimePicker, formatDemoSlot, toLocalIso } from "@/components/ui/DateTimePicker";
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
  const [demos, setDemos] = useState<DemoSession[]>([]);
  const [demosLoading, setDemosLoading] = useState(false);

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [demoDate, setDemoDate] = useState("");
  const [demoHour, setDemoHour] = useState("5");
  const [demoMinute, setDemoMinute] = useState("00");
  const [demoAmpm, setDemoAmpm] = useState<"AM" | "PM">("PM");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const [feedbackDemo, setFeedbackDemo] = useState<DemoSession | null>(null);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackOutcome, setFeedbackOutcome] = useState<"PASSED" | "FAILED">("PASSED");
  const [feedbackError, setFeedbackError] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const loadDemos = useCallback(async () => {
    if (!token) return;
    setDemosLoading(true);
    try {
      const res = await apiFetch("/demos/mine", {}, token);
      if (res.ok) setDemos(await res.json());
      else setDemos([]);
    } catch {
      setDemos([]);
    } finally {
      setDemosLoading(false);
    }
  }, [token]);

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
    loadDemos();
  }, [loadDemos]);

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
    setBookingSuccess(false);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDemoDate(tomorrow.toISOString().slice(0, 10));
    setDemoHour("5");
    setDemoMinute("00");
    setDemoAmpm("PM");
  };

  const handleConfirmDemoBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !token) return;
    if (!demoDate || !demoHour) {
      setBookingError("Please select date and time.");
      return;
    }
    setBookingError("");
    const scheduledAt = toLocalIso(demoDate, Number(demoHour), Number(demoMinute), demoAmpm);
    const existingForApp = demos.filter((d) => d.application_id === selectedApp.id).length;

    try {
      const res = await apiFetch(
        "/demos/schedule",
        {
          method: "POST",
          body: JSON.stringify({
            application_id: selectedApp.id,
            scheduled_at: scheduledAt,
            demo_number: existingForApp + 1,
          }),
        },
        token
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setBookingError(err.detail || "Failed to schedule demo.");
        return;
      }

      setBookingSuccess(true);
      await loadDemos();
      setTimeout(() => {
        setBookingSuccess(false);
        setShowDemoModal(false);
        setSelectedApp(null);
        setActiveTab("demos");
      }, 1200);
    } catch {
      setBookingError("Unable to reach the server.");
    }
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackDemo || !token) return;
    setFeedbackError("");
    try {
      const res = await apiFetch(
        `/demos/${feedbackDemo.id}/feedback`,
        {
          method: "POST",
          body: JSON.stringify({
            rating: feedbackRating,
            parent_feedback: feedbackText,
            outcome: feedbackOutcome,
          }),
        },
        token
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFeedbackError(err.detail || "Failed to submit feedback.");
        return;
      }
      setFeedbackSuccess(true);
      await loadDemos();
      setTimeout(() => {
        setFeedbackSuccess(false);
        setFeedbackDemo(null);
        setFeedbackText("");
        setFeedbackRating(5);
      }, 1200);
    } catch {
      setFeedbackError("Unable to reach the server.");
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      SCHEDULED: "bg-indigo-50 text-indigo-700 border-indigo-200",
      COMPLETED: "bg-amber-50 text-amber-800 border-amber-200",
      PASSED: "bg-emerald-50 text-emerald-800 border-emerald-200",
      FAILED: "bg-red-50 text-red-700 border-red-200",
      CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
    };
    return map[status] || "bg-slate-100 text-slate-600 border-slate-200";
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

      {activeTab === "requests" &&
        (leadsLoading ? (
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
                  onClick={() => {
                    setSelectedLeadId(t.id);
                    setActiveTab("applicants");
                  }}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View applicants
                </button>
              </Card>
            ))}
          </div>
        ))}

      {activeTab === "applicants" &&
        (appsLoading ? (
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
                  <option key={l.id} value={l.id}>
                    {l.tuition_code} — {l.title}
                  </option>
                ))}
              </select>
            )}
            {applications.map((app) => {
              const name = app.tutor_profile?.full_name || app.tutor?.full_name || "Tutor";
              const profile = app.tutor_profile;
              const appDemos = demos.filter((d) => d.application_id === app.id);
              return (
                <Card key={app.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-lg">{name}</h3>
                      <p className="text-xs text-slate-600">{profile?.headline || profile?.education_level}</p>
                      {profile && profile.rating_count > 0 ? (
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {profile.rating_avg} ({profile.rating_count}{" "}
                          {profile.rating_count === 1 ? "review" : "reviews"})
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400">No reviews yet</p>
                      )}
                    </div>
                    <Button onClick={() => handleBookDemo(app)} disabled={appDemos.length >= 2}>
                      {appDemos.length >= 2 ? "2 Demos Booked" : "Book Demo Class"}
                    </Button>
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
        ))}

      {activeTab === "demos" &&
        (demosLoading ? (
          <p className="text-sm text-slate-500">Loading demos...</p>
        ) : demos.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No demo sessions scheduled"
            description="Book a demo with an applicant tutor to evaluate fit. After the session, leave a rating."
            actionLabel="View Applicants"
            onAction={() => setActiveTab("applicants")}
          />
        ) : (
          <div className="space-y-4">
            {demos.map((d) => (
              <Card key={d.id} className="p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-bold text-slate-900">
                    {d.tutor_name || "Tutor"} — {d.tuition_title || "Tuition"}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge(d.status)}`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Demo #{d.demo_number} · {formatDemoSlot(d.scheduled_at)}
                </p>
                {d.meeting_link && d.status === "SCHEDULED" && (
                  <a
                    href={d.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600"
                  >
                    <Video className="w-4 h-4" /> Join Session
                  </a>
                )}
                {d.rating != null && (
                  <p className="text-xs text-slate-600">
                    Your rating: {d.rating}/5{d.parent_feedback ? ` — “${d.parent_feedback}”` : ""}
                  </p>
                )}
                {(d.status === "COMPLETED" || d.status === "SCHEDULED") && d.rating == null && (
                  <Button
                    onClick={() => {
                      setFeedbackDemo(d);
                      setFeedbackError("");
                      setFeedbackSuccess(false);
                    }}
                    className="text-xs"
                  >
                    Leave Demo Review
                  </Button>
                )}
              </Card>
            ))}
          </div>
        ))}

      {activeTab === "escrow" &&
        (escrowLoading ? (
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
              <p className="text-sm font-bold">
                Rs {p.total_amount.toLocaleString()} — Tutor payout: Rs {p.tutor_payout_amount.toLocaleString()}
              </p>
              <div className="text-xs text-slate-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                FayazTutes escrow protection active
              </div>
            </Card>
          ))
        ))}

      {showDemoModal && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-extrabold pr-8">
              Schedule Demo with {selectedApp.tutor_profile?.full_name || "Tutor"}
            </h3>
            {bookingSuccess ? (
              <p className="text-sm font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl">
                Demo booked successfully!
              </p>
            ) : (
              <form onSubmit={handleConfirmDemoBooking} className="space-y-4">
                {bookingError && <p className="text-xs text-red-600 font-bold">{bookingError}</p>}
                <DateTimePicker
                  date={demoDate}
                  hour={demoHour}
                  minute={demoMinute}
                  ampm={demoAmpm}
                  onDateChange={setDemoDate}
                  onHourChange={setDemoHour}
                  onMinuteChange={setDemoMinute}
                  onAmpmChange={setDemoAmpm}
                />
                <Button type="submit" className="w-full">
                  Confirm Demo Slot
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {feedbackDemo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setFeedbackDemo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-extrabold pr-8">How was the demo?</h3>
            <p className="text-xs text-slate-500">
              {feedbackDemo.tutor_name} · {formatDemoSlot(feedbackDemo.scheduled_at)}
            </p>
            {feedbackSuccess ? (
              <p className="text-sm font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl">
                Thanks! Your review updates this tutor&apos;s rating.
              </p>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {feedbackError && <p className="text-xs text-red-600 font-bold">{feedbackError}</p>}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Star rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFeedbackRating(n)}
                        className={`p-2 rounded-xl border ${
                          feedbackRating >= n
                            ? "bg-amber-50 border-amber-300 text-amber-600"
                            : "bg-slate-50 border-slate-200 text-slate-300"
                        }`}
                      >
                        <Star className={`w-5 h-5 ${feedbackRating >= n ? "fill-amber-400" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Outcome</label>
                  <select
                    value={feedbackOutcome}
                    onChange={(e) => setFeedbackOutcome(e.target.value as "PASSED" | "FAILED")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                  >
                    <option value="PASSED">Passed — interested in hiring</option>
                    <option value="FAILED">Failed — not a fit</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Feedback (optional)</label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Teaching style, punctuality, subject mastery..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs resize-none"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
