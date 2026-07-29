"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SiteHeaderProps {
  showPromoBar?: boolean;
}

export function SiteHeader({ showPromoBar = false }: SiteHeaderProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      {showPromoBar && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-xs py-2 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-100" />
            <span>
              New families get <strong>2 Free Demo Classes</strong> with every tutor match.
            </span>
          </div>
          <Link
            href="/parent/post-tuition"
            className="hidden sm:inline-flex items-center gap-1.5 text-white font-bold hover:underline shrink-0"
          >
            Request a Tutor
          </Link>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 py-3.5 flex items-center justify-between shadow-sm">
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
            <div className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Smart Tutor Matching Platform
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link href="/#search" className="hover:text-indigo-600 transition">
            Find Tutors
          </Link>
          <Link href="/how-it-works" className="hover:text-indigo-600 transition">
            How It Works
          </Link>
          <Link href="/services" className="hover:text-indigo-600 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link href="/faq" className="hover:text-indigo-600 transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                href={
                  user.role === "PARENT"
                    ? "/parent/dashboard"
                    : user.role === "ADMIN"
                    ? "/admin"
                    : "/tutor"
                }
                className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200 hover:bg-indigo-100 transition"
              >
                Go to{" "}
                {user.role === "PARENT"
                  ? "Parent Portal"
                  : user.role === "ADMIN"
                  ? "Admin Console"
                  : "Tutor Portal"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.replace("/auth/login");
                }}
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
                href="/parent/post-tuition"
                className="hidden sm:inline-block px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs border border-purple-200 transition"
              >
                Request Tutor
              </Link>
              <Link
                href="/auth/signup/tutor"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition"
              >
                Become a Tutor
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
