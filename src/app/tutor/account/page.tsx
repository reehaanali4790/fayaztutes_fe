"use client";

import React, { useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import { MOCK_PROFILE } from "@/lib/api";
import { ShieldCheck, X, CheckCircle2, CreditCard } from "lucide-react";

export default function RedesignedLightAccountSettingsPage() {
  const [name, setName] = useState("Fayaz Ali");
  const [email, setEmail] = useState("alifayaz455@gmail.com");
  const [subjects, setSubjects] = useState<string[]>(MOCK_PROFILE.subjects);
  const [newSubjectInput, setNewSubjectInput] = useState("");
  const [mode, setMode] = useState("BOTH");
  const [bankName, setBankName] = useState("Meezan Bank");
  const [accountNumber, setAccountNumber] = useState("PK36MEZN00010982347101");
  const [accountTitle, setAccountTitle] = useState("Fayaz Ali");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRemoveSubject = (subToRemove: string) => {
    setSubjects(subjects.filter((s) => s !== subToRemove));
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubjectInput.trim() && !subjects.includes(newSubjectInput.trim())) {
      setSubjects([...subjects, newSubjectInput.trim()]);
      setNewSubjectInput("");
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <TutorLayout>
      <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Account settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your profile, verified subjects, preferred teaching mode, and payout details.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 font-bold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Account settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1 shadow-md relative">
                <div className="w-full h-full rounded-xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center">
                  FA
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {name}
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span>
                </h2>
                <p className="text-xs text-slate-500">{email}</p>
                <div className="text-xs text-indigo-600 font-bold mt-1">⭐ 4.9 Rating (24 Reviews)</div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value="••••••••••••"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-500"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-600 hover:underline font-bold"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Name <span className="text-indigo-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Verified Subjects Pill Multiselect */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900">
                Subjects You Can Teach
              </label>
              <span className="text-xs text-slate-500">{subjects.length} subjects selected</span>
            </div>

            <div className="flex flex-wrap gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 min-h-[100px]">
              {subjects.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-xs"
                >
                  {sub}
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub)}
                    className="hover:text-red-500 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Subject Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add another subject (e.g., Computer Science, MDCAT Physics)..."
                value={newSubjectInput}
                onChange={(e) => setNewSubjectInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                + Add Tag
              </button>
            </div>
          </div>

          {/* Mode & Bank Payout Details */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              Mode of Tuition & Payout Bank Setup
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Teaching Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option value="BOTH">Both Home & Online Tuition</option>
                  <option value="HOME">Home Tuition Only</option>
                  <option value="ONLINE">Online Tuition Only</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Account Title</label>
                <input
                  type="text"
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">IBAN / Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            Save Account Settings
          </button>
        </form>
      </div>
    </TutorLayout>
  );
}
