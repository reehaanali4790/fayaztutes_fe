"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { 
  ShieldCheck, 
  CreditCard, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  Search,
  Sparkles,
  DollarSign,
  Send
} from "lucide-react";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"kyc" | "escrow" | "matching" | "disputes">("kyc");
  const [kycQueue, setKycQueue] = useState([
    {
      id: "k1",
      tutorName: "Sir Fayaz Ali",
      cnic: "42101-9876543-1",
      degree: "B.S. Computer Science (FAST NUCES)",
      status: "PENDING"
    },
    {
      id: "k2",
      tutorName: "Sir Farrukh Nazeer",
      cnic: "42201-1234567-3",
      degree: "M.Sc Physics (Karachi University)",
      status: "PENDING"
    }
  ]);

  const [escrows, setEscrows] = useState([
    {
      id: "e1",
      tuitionCode: "FT-20263890",
      parentName: "Hunza Bukhari",
      tutorName: "Sir Fayaz Ali",
      totalAmount: 40000,
      tutorPayout: 20000,
      commission: 20000,
      status: "HELD",
      daysElapsed: 28
    }
  ]);

  const handleApproveKYC = (id: string) => {
    setKycQueue(kycQueue.map(k => k.id === id ? { ...k, status: "APPROVED" } : k));
  };

  const handleRejectKYC = (id: string) => {
    setKycQueue(kycQueue.map(k => k.id === id ? { ...k, status: "REJECTED" } : k));
  };

  const handleReleaseEscrow = (id: string) => {
    setEscrows(escrows.map(e => e.id === id ? { ...e, status: "RELEASED" } : e));
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 lg:px-12 py-4 flex items-center justify-between shadow-xl">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-xl">
              FT
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                FayazTutes
              </span>
              <span className="ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
            <span className="text-emerald-400 font-mono">System Online (v2.0)</span>
            <Link href="/" className="hover:underline">Back to Home</Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-8 w-full">
          {/* Metric Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="text-xs text-slate-400 font-semibold">Pending KYC Reviews</div>
              <div className="text-2xl font-extrabold text-amber-400">2 Tutors</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="text-xs text-slate-400 font-semibold">Escrow Funds Locked</div>
              <div className="text-2xl font-extrabold text-emerald-400">Rs 40,000</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="text-xs text-slate-400 font-semibold">Active Tuitions</div>
              <div className="text-2xl font-extrabold text-indigo-400">5 Leads</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="text-xs text-slate-400 font-semibold">Platform Revenue</div>
              <div className="text-2xl font-extrabold text-purple-400">Rs 20,000</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-2">
            {[
              { id: "kyc", label: "KYC Review Queue (2)", icon: ShieldCheck },
              { id: "escrow", label: "Escrow Release Manager", icon: CreditCard },
              { id: "matching", label: "AI Lead Matcher", icon: Sparkles },
              { id: "disputes", label: "Dispute Center", icon: AlertCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-5 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
                    isActive 
                      ? "border-indigo-500 text-indigo-400" 
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: KYC Review Queue */}
          {activeTab === "kyc" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-xs text-slate-400">
                Review and verify tutor identity documents (CNIC & Degree) before issuing the <strong>VERIFIED TUTOR ✓</strong> badge.
              </div>

              <div className="space-y-3">
                {kycQueue.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="font-extrabold text-white text-sm flex items-center gap-2">
                        {item.tutorName}
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.status === "APPROVED" 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : item.status === "REJECTED"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-slate-400">CNIC: <span className="font-mono text-slate-200">{item.cnic}</span></div>
                      <div className="text-slate-400">Education: <span className="text-slate-200">{item.degree}</span></div>
                    </div>

                    {item.status === "PENDING" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveKYC(item.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve Verification
                        </button>
                        <button
                          onClick={() => handleRejectKYC(item.id)}
                          className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 font-bold text-xs flex items-center gap-1 border border-red-500/30"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Escrow Release Manager */}
          {activeTab === "escrow" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-xs text-slate-400">
                Audit 30-day service completion and release tutor payout (50%) and platform commission retention (50%).
              </div>

              <div className="space-y-3">
                {escrows.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-indigo-400 font-bold">{item.tuitionCode}</span>
                      <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                        item.status === "RELEASED" 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}>
                        {item.status === "HELD" ? `HELD IN ESCROW (Day ${item.daysElapsed}/30)` : "RELEASED ✓"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Parent: <strong>{item.parentName}</strong> | Tutor: <strong>{item.tutorName}</strong></div>
                      <div>Total Deposit: <strong>Rs {item.totalAmount.toLocaleString()}</strong> | Tutor Payout (50%): <strong>Rs {item.tutorPayout.toLocaleString()}</strong> | Commission (50%): <strong>Rs {item.commission.toLocaleString()}</strong></div>
                    </div>

                    {item.status === "HELD" && (
                      <button
                        onClick={() => handleReleaseEscrow(item.id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                      >
                        <DollarSign className="w-4 h-4" /> Release 50% Tutor Payout (Rs {item.tutorPayout.toLocaleString()})
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
