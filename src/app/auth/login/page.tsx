"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Sparkles, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPanel } = useAuth();

  const [email, setEmail] = useState("alifayaz455@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      if (email.includes("parent")) {
        switchPanel("PARENT");
        router.push("/parent/dashboard");
      } else if (email.includes("admin")) {
        switchPanel("ADMIN");
        router.push("/admin");
      } else {
        switchPanel("TUTOR");
        router.push("/tutor");
      }
    } else {
      setErrorMsg("Invalid email or password. Please check your credentials.");
    }
  };

  const handleQuickRoleLogin = async (role: "TUTOR" | "PARENT" | "ADMIN") => {
    if (role === "TUTOR") {
      await login("tutor@fayaztutes.com", "password123");
      switchPanel("TUTOR");
      router.push("/tutor");
    } else if (role === "PARENT") {
      await login("parent@fayaztutes.com", "password123");
      switchPanel("PARENT");
      router.push("/parent/dashboard");
    } else if (role === "ADMIN") {
      await login("admin@fayaztutes.com", "password123");
      switchPanel("ADMIN");
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row selection:bg-indigo-500 selection:text-white">
      {/* Left 50% Visual Showcase (Inspired by Global Tutor) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative ambient blur */}
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
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Transform Your Learning Journey
            </h1>
            <p className="text-indigo-100 text-base leading-relaxed font-normal">
              Join thousands of parents and students achieving academic excellence through background-checked, 1-on-1 personalized home & online tutoring.
            </p>
          </div>

          {/* 4 Showcase Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">2 Free Demo Classes</h3>
              <p className="text-xs text-indigo-100">Try free before paying. 0 risk trial for families.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">CNIC Verified Tutors</h3>
              <p className="text-xs text-indigo-100">100% identity & academic degree screening.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-purple-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">O/A Levels & MDCAT</h3>
              <p className="text-xs text-indigo-100">Subject specialists for CAIE, FSc, and IB.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-blue-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">1st Month Escrow</h3>
              <p className="text-xs text-indigo-100">30-day full parent deposit protection.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-indigo-200 border-t border-white/10 flex items-center justify-between relative z-10">
          <span>© 2026 FayazTutes Platform. All rights reserved.</span>
          <span>DHA Phase 5, Karachi</span>
        </div>
      </div>

      {/* Right 50% Form Area */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In to Account
            </h2>
            <p className="text-xs text-slate-500">
              Welcome back! Please enter your details to access your portal.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-2xl text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? "Authenticating..." : "Sign In to FayazTutes 🚀"}
              </button>
            </form>

            {/* Quick Testing Shortcuts */}
            <div className="space-y-2 pt-4 border-t border-slate-100 text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Direct Role Access Shortcuts
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin("TUTOR")}
                  className="py-2 px-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] border border-indigo-200 transition"
                >
                  Tutor Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin("PARENT")}
                  className="py-2 px-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[10px] border border-purple-200 transition"
                >
                  Parent Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickRoleLogin("ADMIN")}
                  className="py-2 px-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] transition"
                >
                  Admin Console
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-500 space-y-2">
              <div>Don't have an account yet?</div>
              <div className="flex items-center justify-center gap-3 font-bold text-indigo-600">
                <Link href="/auth/signup/tutor" className="hover:underline">Register as Tutor</Link>
                <span>•</span>
                <Link href="/auth/signup/parent" className="hover:underline">Register as Parent</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
