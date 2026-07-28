"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Video, 
  RefreshCw, 
  Lock, 
  CreditCard, 
  Plus,
  BookOpen,
  Calendar,
  X,
  User,
  DollarSign
} from "lucide-react";

export default function ParentDashboardPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "applicants" | "demos" | "escrow">("requests");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedTutorName, setSelectedTutorName] = useState("Sir Fayaz Ali");
  const [demoDate, setDemoDate] = useState("Tomorrow, July 29");
  const [demoTime, setDemoTime] = useState("05:00 PM PKT");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [escrowDeposited, setEscrowDeposited] = useState(false);

  const [tuitions, setTuitions] = useState([
    {
      id: "t1",
      code: "FT-20263888",
      title: "Grade 3, 4 & 6 All Cambridge Primary",
      city: "Karachi",
      area: "DHA Phase 8 Creek Vista",
      fee: 35000,
      mode: "HOME",
      status: "OPEN",
      applicants: 3
    },
    {
      id: "t2",
      code: "FT-20263890",
      title: "A Level Computer Science & Math",
      city: "Karachi",
      area: "DHA Phase 5",
      fee: 40000,
      mode: "ONLINE",
      status: "IN_DEMO",
      applicants: 2
    }
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: "a1",
      tutorName: "Sir Fayaz Ali",
      headline: "Cambridge O/A Level Math & CS Specialist (8 Yrs Exp)",
      rating: 4.9,
      reviews: 24,
      pitch: "Specialized in A Level CS 9618 paper 4 Python coding & Math 9709. 100% past paper drill.",
      phoneMasked: "+92 335 *****37",
      phoneFull: "+92 335 337 5337",
      addressMasked: "DHA Phase 5, Karachi (Full address revealed after Escrow Deposit)",
      status: "SHORTLISTED"
    },
    {
      id: "a2",
      tutorName: "Sir Farrukh Nazeer",
      headline: "Ex-Aitchison Faculty • M.Sc Physics (12 Yrs Exp)",
      rating: 5.0,
      reviews: 42,
      pitch: "12 years experience in Physics & Math. Over 100+ students achieved A* grades.",
      phoneMasked: "+92 333 *****33",
      phoneFull: "+92 333 111 2233",
      addressMasked: "Clifton, Karachi (Full address revealed after Escrow Deposit)",
      status: "SCREENED"
    }
  ]);

  const [demos, setDemos] = useState([
    {
      id: "d1",
      tutorName: "Sir Fayaz Ali",
      subject: "A Level Computer Science 9618",
      scheduledAt: "Tomorrow, July 29 @ 05:00 PM PKT",
      meetingLink: "https://zoom.us/j/9876543210?pwd=fayaztutesdemo",
      status: "SCHEDULED",
      demoNumber: 1
    }
  ]);

  const handleBookDemo = (tutorName: string) => {
    setSelectedTutorName(tutorName);
    setShowDemoModal(true);
  };

  const handleConfirmDemoBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowDemoModal(false);
      // Add demo session
      setDemos((prev) => [
        ...prev,
        {
          id: `d-${Date.now()}`,
          tutorName: selectedTutorName,
          subject: "O Level Math & Physics",
          scheduledAt: `${demoDate} @ ${demoTime}`,
          meetingLink: "https://zoom.us/j/9876543210?pwd=fayaztutesdemo",
          status: "SCHEDULED",
          demoNumber: 1
        }
      ]);
    }, 1500);
  };

  const handleRequestReplacement = (tuitionCode: string) => {
    alert(`Replacement Tutor request triggered for ${tuitionCode}! Our operations team is shortlisting secondary candidates.`);
  };

  return (
    <ProtectedRoute allowedRoles={["PARENT", "ADMIN"]}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 lg:px-12 py-4 flex items-center justify-between shadow-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-xl">
              FT
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                FayazTutes
              </span>
              <span className="ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                PARENT PORTAL
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/parent/post-tuition"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post New Tuition Lead
            </Link>
            <Link href="/" className="text-xs font-bold text-slate-600 hover:text-slate-900">
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-8 w-full">
          {/* Welcome Header Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-6 lg:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" /> Parent & Family Control Hub
              </div>
              <h1 className="text-3xl font-extrabold text-white">Welcome, Parent! 👋</h1>
              <p className="text-indigo-100 text-sm">
                Manage your active tuition leads, applicant tutors, scheduled demo classes, and 1st-month escrow deposits.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/20 text-xs">
              <div>
                <div className="font-extrabold text-white text-base">2 Demos</div>
                <div className="text-purple-200">Free Trial Active</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <div className="font-extrabold text-emerald-300 text-base">Escrow Safe</div>
                <div className="text-purple-200">100% Guaranteed</div>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-2">
            {[
              { id: "requests", label: "My Tuition Leads (2)", icon: BookOpen },
              { id: "applicants", label: "Applicant Tutors (2)", icon: User },
              { id: "demos", label: "Demo Classes (1)", icon: Calendar },
              { id: "escrow", label: "Escrow & Invoices", icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-5 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                    isActive 
                      ? "border-indigo-600 text-indigo-600" 
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: My Tuition Requests */}
          {activeTab === "requests" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Tracking <strong>{tuitions.length}</strong> active tuition posts</span>
                <Link href="/parent/post-tuition" className="font-bold text-indigo-600 hover:underline">+ Create New Lead</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tuitions.map((t) => (
                  <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-indigo-600 font-bold">{t.code}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        t.status === "OPEN" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : "bg-indigo-100 text-indigo-800"
                      }`}>
                        {t.status === "OPEN" ? "MATCHING IN PROGRESS" : "DEMO IN PROGRESS"}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base">{t.title}</h3>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>📍 {t.area}, {t.city} ({t.mode} Tuition)</div>
                      <div>💰 Offered Monthly Fee: <strong>Rs {t.fee.toLocaleString()}</strong></div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{t.applicants} candidate tutors applied</span>
                      <button
                        onClick={() => handleRequestReplacement(t.code)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3 text-indigo-600" />
                        Request Replacement Tutor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Applicant Tutors Queue */}
          {activeTab === "applicants" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Reviewing candidate tutors matched to your tuition requests</span>
                <span className="font-bold text-emerald-600">2 Free Demo Classes Available</span>
              </div>

              <div className="space-y-4">
                {applicants.map((app) => (
                  <div key={app.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0">
                          {app.tutorName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-lg">{app.tutorName}</h3>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              VERIFIED TUTOR ✓
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{app.headline}</p>
                          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{app.rating}</span>
                            <span className="text-slate-400 font-normal">({app.reviews} parent reviews)</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookDemo(app.tutorName)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 shrink-0"
                      >
                        Book 2 Free Demo Classes
                      </button>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="font-bold text-slate-800">Tutor Pitch Note:</div>
                      <p className="text-slate-600 italic">"{app.pitch}"</p>
                    </div>

                    {/* Disintermediation Contact Masking Audit Item */}
                    <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <strong>Contact Details Masked:</strong> {escrowDeposited ? app.phoneFull : app.phoneMasked}
                        </span>
                      </div>
                      <button
                        onClick={() => setEscrowDeposited(!escrowDeposited)}
                        className="text-[11px] font-extrabold text-indigo-700 underline"
                      >
                        {escrowDeposited ? "Hide Full Info" : "Deposit Escrow to Unlock Contact Info"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Demo Sessions Tracker */}
          {activeTab === "demos" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs max-w-2xl">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Upcoming Free Demo Session #1
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                    SCHEDULED
                  </span>
                </div>

                {demos.map((d) => (
                  <div key={d.id} className="space-y-3">
                    <div className="font-extrabold text-slate-900 text-base">{d.tutorName} — {d.subject}</div>
                    <div className="text-xs text-slate-600">📅 Scheduled Time: <strong>{d.scheduledAt}</strong></div>
                    
                    <div className="flex gap-3 pt-2">
                      <a
                        href={d.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
                      >
                        <Video className="w-4 h-4" /> Join Zoom Demo Session ↗
                      </a>

                      <button
                        onClick={() => alert("Demo marked as PASSED! Proceeding to 1st month escrow deposit.")}
                        className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs border border-emerald-200"
                      >
                        ✓ Mark Demo Passed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Escrow & Invoices */}
          {activeTab === "escrow" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xs max-w-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    1st Month Escrow Deposit & Receipt
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                    100% PARENT PROTECTION
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between">
                    <span>Tuition Code:</span>
                    <strong className="font-mono text-indigo-600">FT-20263890</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Tutor:</span>
                    <strong>Sir Fayaz Ali</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Tuition Fee:</span>
                    <strong className="text-slate-900 font-extrabold text-sm">Rs 40,000 / month</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Escrow Status:</span>
                    <strong className="text-emerald-700 font-bold">HELD IN ESCROW (30-Day Countdown Active)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tutor Payout Date:</span>
                    <span>August 28, 2026 (Released after 30 days of service)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" /> FayazTutes Guarantee:
                  </div>
                  <p>If your assigned tutor discontinues or fails to meet expected standards during the 1st month, our team will arrange a free replacement tutor or process a full refund.</p>
                </div>
              </div>
            </div>
          )}

          {/* Demo Booking Modal */}
          {showDemoModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                    2 Free Demo Classes Booking
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Schedule Demo with {selectedTutorName}
                  </h3>
                </div>

                {bookingSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center text-emerald-800 font-bold text-sm">
                    ✓ Demo Class #1 Booked Successfully! Added to Demo Tracker.
                  </div>
                ) : (
                  <form onSubmit={handleConfirmDemoBooking} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                      <input
                        type="text"
                        value={demoDate}
                        onChange={(e) => setDemoDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Preferred Time Slot</label>
                      <input
                        type="text"
                        value={demoTime}
                        onChange={(e) => setDemoTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowDemoModal(false)}
                        className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                      >
                        Confirm Demo Slot
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
