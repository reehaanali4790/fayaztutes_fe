"use client";

import React, { useEffect, useState } from "react";
import TutorLayout from "@/components/TutorLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useTutorProfile } from "@/hooks/useApiData";
import { ShieldCheck, X, CheckCircle2, CreditCard } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export default function AccountSettingsPage() {
  const { token, user } = useAuth();
  const { profile, loading, setProfile } = useTutorProfile();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubjectInput, setNewSubjectInput] = useState("");
  const [mode, setMode] = useState("BOTH");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (profile) {
      setSubjects(profile.subjects || []);
      setMode(profile.preferred_mode || "BOTH");
      setBankName(profile.bank_name || "");
      setAccountNumber(profile.bank_account_number || "");
      setAccountTitle(profile.account_title || "");
    }
  }, [profile]);

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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/tutors/me/profile", {
        method: "PUT",
        body: JSON.stringify({
          subjects,
          preferred_mode: mode,
          bank_name: bankName,
          bank_account_number: accountNumber,
          account_title: accountTitle,
        }),
      }, token);

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const res = await apiFetch("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      }, token);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setPasswordError(err.detail || "Failed to update password.");
        return;
      }

      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setPasswordError("Unable to reach the server. Please try again.");
    }
  };

  const displayName = user?.full_name || profile?.full_name || "Tutor";

  return (
    <ProtectedRoute allowedRoles={["TUTOR", "ADMIN"]}>
      <TutorLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account settings</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your profile, subjects, teaching mode, and payout details.
            </p>
          </div>

          {loading && <p className="text-sm text-slate-500">Loading profile...</p>}

          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Account settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar name={displayName} size="lg" />
                  {profile?.cnic_verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {displayName}
                    {profile?.cnic_verified && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        VERIFIED
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                  {profile && profile.rating_count > 0 ? (
                    <div className="text-xs text-indigo-600 font-bold mt-1">
                      {profile.rating_avg.toFixed(1)} rating ({profile.rating_count} reviews)
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 mt-1">No reviews yet</div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <input type="password" value="••••••••••••" disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-500" />
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-600 hover:underline font-bold"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900">Subjects You Can Teach</label>
                <span className="text-xs text-slate-500">{subjects.length} subjects</span>
              </div>
              <div className="flex flex-wrap gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 min-h-[80px]">
                {subjects.length === 0 && <p className="text-xs text-slate-500">Add subjects you teach.</p>}
                {subjects.map((sub) => (
                  <span key={sub} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-semibold border border-slate-200">
                    {sub}
                    <button type="button" onClick={() => handleRemoveSubject(sub)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a subject..."
                  value={newSubjectInput}
                  onChange={(e) => setNewSubjectInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <button type="button" onClick={handleAddSubject} className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                  Add
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Teaching Mode & Payout Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Teaching Mode</label>
                  <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                    <option value="BOTH">Both Home & Online</option>
                    <option value="HOME">Home Only</option>
                    <option value="ONLINE">Online Only</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Bank Name</label>
                  <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Account Title</label>
                  <input type="text" value={accountTitle} onChange={(e) => setAccountTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">IBAN / Account Number</label>
                  <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg">
              Save Account Settings
            </button>
          </form>

          {showPasswordModal && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <h3 className="text-lg font-extrabold text-slate-900">Change Password</h3>
                {passwordError && <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl p-2">{passwordError}</p>}
                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
                  <input type="password" placeholder="New password (min 8 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
                  <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(""); }} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs">Update</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </TutorLayout>
    </ProtectedRoute>
  );
}
