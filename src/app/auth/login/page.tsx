"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthBrandPanel } from "@/components/layout/AuthBrandPanel";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPanel } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await login(email, password);
    setLoading(false);

    if (result.success && result.role) {
      switchPanel(result.role);
      if (result.role === "PARENT") router.push("/parent/dashboard");
      else if (result.role === "ADMIN") router.push("/admin");
      else router.push("/tutor");
    } else {
      setErrorMsg(result.error || "Invalid email or password. Please check your credentials or register a new account.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <AuthBrandPanel />

      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to FayazTutes
          </Link>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In to Account</h2>
            <p className="text-xs text-slate-500">Welcome back! Please enter your details to access your portal.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-bold text-center">
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

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? "Authenticating..." : "Sign In to FayazTutes"}
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
              <div>Don&apos;t have an account yet?</div>
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
