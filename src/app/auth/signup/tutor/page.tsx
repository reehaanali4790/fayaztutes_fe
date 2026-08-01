"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthBrandPanel } from "@/components/layout/AuthBrandPanel";
import { Button } from "@/components/ui/Button";
import { markTutorOnboardingPending } from "@/lib/tutorOnboarding";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function TutorSignupPage() {
  const router = useRouter();
  const { signup, switchPanel } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [city, setCity] = useState("Karachi");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const result = await signup({
      email,
      password,
      full_name: fullName,
      phone,
      role: "TUTOR",
      city,
      cnic,
    });

    setLoading(false);
    if (result.success) {
      switchPanel("TUTOR");
      markTutorOnboardingPending();
      router.push("/tutor/account?onboarding=1");
    } else {
      setErrorMsg(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <AuthBrandPanel
        badge="Educator Network Portal"
        badgeIcon={GraduationCap}
        title="Teach and Earn with Pakistan's Top Network"
        description="Connect with students across Pakistan and online worldwide. 0% commission from Month 2 onward."
      />

      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to FayazTutes
          </Link>
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Tutor Account
            </h2>
            <p className="text-xs text-slate-500">
              Sign up with your basic details — you&apos;ll build your teaching profile right after.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-2xl text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mobile / WhatsApp *</label>
                  <input
                    type="text"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">CNIC Number *</label>
                  <input
                    type="text"
                    placeholder="42101-1234567-1"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Create Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Choose a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? "Creating account..." : "Create Account & Build Profile"}
              </Button>

              <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-slate-500 font-medium">
                <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">✓ 0% Month 2 Commission</span>
                <span className="bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-full border border-indigo-200">✓ Free Demo Policy</span>
              </div>
            </form>

            <div className="text-center text-xs text-slate-500">
              Already registered? <Link href="/auth/login" className="font-bold text-indigo-600 hover:underline">Sign In Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
