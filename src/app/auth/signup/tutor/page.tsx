"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";

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
  const [subjects, setSubjects] = useState("O Level Math, Physics, Computer Science");
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

    const subjectList = subjects.split(",").map(s => s.trim()).filter(Boolean);

    const success = await signup({
      email,
      password,
      full_name: fullName,
      phone,
      role: "TUTOR",
      city,
      subjects: subjectList
    });

    setLoading(false);
    if (success) {
      switchPanel("TUTOR");
      router.push("/tutor");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row selection:bg-indigo-500 selection:text-white">
      {/* Left 50% Visual Showcase (Inspired by GlobalTutor) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-white text-indigo-700 font-extrabold text-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              FT
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              FayazTutes
            </span>
          </Link>

          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold border border-white/20">
              <GraduationCap className="w-4 h-4 text-amber-300" /> Educator Network Portal
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Teach & Earn with Pakistan's Top Network
            </h1>
            <p className="text-indigo-100 text-base leading-relaxed font-normal">
              Connect with thousands of students across Karachi, Lahore, Islamabad, and online worldwide. <strong>0% commission from Month 2 onward!</strong>
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">0% Cut From Month 2</h3>
              <p className="text-xs text-indigo-100">Keep 100% of your earnings after 1st month.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Verified CNIC Badge</h3>
              <p className="text-xs text-indigo-100">Stand out to parents with verified checkmark.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-purple-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Home & Online</h3>
              <p className="text-xs text-indigo-100">Choose your preferred mode and location.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-blue-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Escrow Guaranteed</h3>
              <p className="text-xs text-indigo-100">Timely 1st month bank transfer payouts.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-indigo-200 border-t border-white/10 flex items-center justify-between relative z-10">
          <span>© 2026 FayazTutes Platform. All rights reserved.</span>
          <span>Educator Network</span>
        </div>
      </div>

      {/* Right 50% Form Area (Inspired by GlobalTutor) */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Tutor Account
            </h2>
            <p className="text-xs text-slate-500">
              Fill in your academic details to start receiving tuition leads.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Subjects You Can Teach</label>
                <input
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="e.g. O Level Math, Physics, Computer Science"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  required
                />
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? "Registering Profile..." : "Complete Tutor Registration 🚀"}
              </button>

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
