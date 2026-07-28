"use client";

import React from "react";
import TutorLayout from "@/components/TutorLayout";
import { 
  Award, 
  CheckCircle2, 
  DollarSign, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  CreditCard,
  User
} from "lucide-react";

export default function HiredTuitionsPage() {
  const hiredTuitions = [
    {
      id: "h1",
      code: "FT-20263102",
      title: "Grade 10 Cambridge O Level Physics & Math",
      studentName: "Hamza Malik",
      parentName: "Dr. Asad Malik",
      location: "DHA Phase 5, Karachi",
      monthlyFee: 35000,
      commissionDeducted: 17500,
      netPayout: 17500,
      escrowStatus: "COMPLETED",
      month2Direct: "ACTIVE (Direct Parent Payout)"
    }
  ];

  return (
    <TutorLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Award className="w-3.5 h-3.5" /> Hired Tuitions History
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hired Tuitions & Direct Billing
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View all tuitions where you were officially hired, 1st month escrow payouts, and Month 2+ direct billing contracts.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl">
          {hiredTuitions.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs text-indigo-600 font-bold">{item.code}</span>
                  <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                  HIRED & ACTIVE ✓
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>📍 Location: <strong>{item.location}</strong></div>
                <div>👤 Student: <strong>{item.studentName}</strong> ({item.parentName})</div>
                <div>💰 Total Fee: <strong>Rs {item.monthlyFee.toLocaleString()} / mo</strong></div>
                <div>✨ Month 2+ Billing: <strong className="text-indigo-600">{item.month2Direct}</strong></div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs space-y-1 text-indigo-900">
                <div className="font-bold flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-indigo-600" /> 1st Month Commission Breakup:
                </div>
                <div className="flex justify-between">
                  <span>Gross 1st Month Fee Collected:</span>
                  <span>Rs {item.monthlyFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-indigo-700 font-bold">
                  <span>FayazTutes 50% Placement Fee:</span>
                  <span>- Rs {item.commissionDeducted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-extrabold border-t border-indigo-200/60 pt-1">
                  <span>Net Escrow Payout Released:</span>
                  <span>Rs {item.netPayout.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TutorLayout>
  );
}
