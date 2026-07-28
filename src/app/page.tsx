"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  Search, 
  MapPin, 
  BookOpen, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  Award,
  Sparkles,
  Phone,
  MessageSquare,
  Users,
  ChevronRight,
  GraduationCap,
  Clock,
  User,
  LogOut
} from "lucide-react";

export default function RedesignedLightLandingPage() {
  const router = useRouter();
  const { user, isAuthenticated, currentPanel, switchPanel, logout } = useAuth();

  const [searchSubject, setSearchSubject] = useState("");
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedMode, setSelectedMode] = useState("HOME");

  const popularSubjects = [
    "O Level Mathematics", 
    "A Level Physics", 
    "MDCAT Prep", 
    "Female Tutors", 
    "Grade 1-8 All Subjects", 
    "Python Coding", 
    "Quran & Islamic Studies"
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchSubject) query.set("subject", searchSubject);
    if (selectedCity) query.set("city", selectedCity);
    if (selectedMode) query.set("mode", selectedMode);
    router.push(`/parent/post-tuition?${query.toString()}`);
  };

  const featuredTutors = [
    {
      id: "t1",
      name: "Sir Farrukh Nazeer",
      headline: "Ex-Aitchison Faculty • O/A Level Physics Specialist",
      city: "Karachi",
      area: "Clifton & DHA",
      rating: 5.0,
      reviews: 42,
      experience: "12 Yrs",
      subjects: ["Physics 5054", "A Level Physics 9702", "MDCAT"],
      rate: "Rs 40,000 / mo",
      avatar: "FN",
      color: "bg-indigo-600",
      badge: "Top Educator"
    },
    {
      id: "t2",
      name: "Ms. Erum Hassam",
      headline: "Senior Cambridge Educator • English & History Specialist",
      city: "Karachi",
      area: "PECHS & Gulshan",
      rating: 5.0,
      reviews: 35,
      experience: "20 Yrs",
      subjects: ["English Language", "Literature", "Primary Grades"],
      rate: "Rs 32,000 / mo",
      avatar: "EH",
      color: "bg-purple-600",
      badge: "Verified Female Tutor"
    },
    {
      id: "t3",
      name: "Sir Fayaz Ali",
      headline: "Full-Stack Engineer • O/A Level Math & CS Expert",
      city: "Karachi",
      area: "DHA Phase 5",
      rating: 4.9,
      reviews: 24,
      experience: "8 Yrs",
      subjects: ["O Level Math 4024", "A Level CS 9618", "Python"],
      rate: "Rs 35,000 / mo",
      avatar: "FA",
      color: "bg-blue-600",
      badge: "Cambridge Specialist"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Notification & Role Panel Switcher Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Need a tutor immediately? <strong>Get 2 Free Demo Classes</strong></span>
        </div>

        {/* Dynamic Panel Switcher Bar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Panel:</span>
          
          <button
            onClick={() => { switchPanel("PARENT"); router.push("/parent/dashboard"); }}
            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition ${
              currentPanel === "PARENT" 
                ? "bg-purple-600 text-white border-purple-500" 
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            Parent Panel
          </button>

          <button
            onClick={() => { switchPanel("TUTOR"); router.push("/tutor"); }}
            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition ${
              currentPanel === "TUTOR" 
                ? "bg-indigo-600 text-white border-indigo-500" 
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            Tutor Panel
          </button>

          <button
            onClick={() => { switchPanel("ADMIN"); router.push("/admin"); }}
            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition ${
              currentPanel === "ADMIN" 
                ? "bg-emerald-600 text-white border-emerald-500" 
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      {/* Main Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-3.5 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            FT
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-2">
              FayazTutes
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                OFFICIAL
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Smart Tutor Matching Platform</div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="#search" className="hover:text-indigo-600 transition">Find Tutors</Link>
          <Link href="/services" className="hover:text-indigo-600 transition">Services</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About Us</Link>
          <a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a>
          <Link href="/terms" className="hover:text-indigo-600 transition">Terms & Pricing</Link>
        </nav>

        {/* Auth State Action Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900">{user?.full_name}</div>
                <div className="text-[10px] font-bold text-indigo-600">{user?.role} ACCOUNT</div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup/parent"
                className="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs border border-purple-200 transition"
              >
                Parent Sign Up
              </Link>
              <Link
                href="/auth/signup/tutor"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition"
              >
                Tutor Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="search" className="relative pt-12 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            3,494+ Background-Verified Home & Online Tutors
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find the <span className="gradient-text">Perfect Tutor</span> for Your Child
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-normal">
            Personalized 1-on-1 home and online tutoring across Karachi, Lahore, Islamabad, and worldwide. <strong>2 Free Demo Classes included.</strong>
          </p>
        </div>

        {/* Floating Search Hero Form */}
        <form onSubmit={handleHeroSearch} className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Subject Input */}
            <div className="sm:col-span-5 relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 px-1">
                Subject or Grade
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. O Level Physics, Math, MDCAT..."
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* City Selector */}
            <div className="sm:col-span-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 px-1">
                City / Region
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Online">Online Worldwide</option>
              </select>
            </div>

            {/* Submit CTA Button */}
            <div className="sm:col-span-4 flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find Tutors Now
              </button>
            </div>
          </div>

          {/* Popular Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-500 mr-1">Popular:</span>
            {popularSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSearchSubject(sub);
                  router.push(`/parent/post-tuition?subject=${encodeURIComponent(sub)}&city=${encodeURIComponent(selectedCity)}`);
                }}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition border border-slate-200/80"
              >
                {sub}
              </button>
            ))}
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs px-6 lg:px-12 py-12 space-y-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-extrabold text-lg text-white">FayazTutes</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pakistan's premier home & online tutor matching platform.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">Portals</div>
            <div className="space-y-1 flex flex-col">
              <Link href="/tutor" className="hover:text-white">Tutor Dashboard</Link>
              <Link href="/parent/dashboard" className="hover:text-white">Parent Dashboard</Link>
              <Link href="/admin" className="hover:text-white">Admin Console</Link>
              <Link href="/terms" className="hover:text-white">Terms & Policies</Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">Authentication</div>
            <div className="space-y-1 flex flex-col">
              <Link href="/auth/login" className="hover:text-white">Sign In</Link>
              <Link href="/auth/signup/tutor" className="hover:text-white">Register as Tutor</Link>
              <Link href="/auth/signup/parent" className="hover:text-white">Register as Parent</Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">Contact Head Office</div>
            <div className="text-slate-400 space-y-1">
              <div>📍 2nd Floor, Building No. 5, DHA Phase 5, Karachi.</div>
              <div>📞 +92 335 337 5337</div>
              <div>✉️ support@fayaztutes.com</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-center text-slate-500">
          © 2026 FayazTutes Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
