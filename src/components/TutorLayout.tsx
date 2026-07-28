"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  ListFilter, 
  UserCheck, 
  Activity, 
  Bell, 
  Star, 
  Menu, 
  X, 
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface TutorLayoutProps {
  children: React.ReactNode;
}

export default function TutorLayout({ children }: TutorLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/tutor", icon: Home },
    { name: "My Tuitions", href: "/tutor/my-tuitions", icon: BookOpen, badge: "2" },
    { name: "Demo Sessions", href: "/tutor/demos", icon: Calendar },
    { name: "Active Tuitions", href: "/tutor/tuitions", icon: ListFilter, badge: "NEW" },
    { name: "Status Tracking", href: "/tutor/status-tracking", icon: Activity },
    { name: "Hired Tuitions", href: "/tutor/hired", icon: Award },
    { name: "Edit Profile", href: "/tutor/account", icon: UserCheck }
  ];

  const topNavItems = [
    { name: "Home", href: "/tutor" },
    { name: "My Tuitions", href: "/tutor/my-tuitions" },
    { name: "Demos", href: "/tutor/demos" },
    { name: "Status Tracking", href: "/tutor/status-tracking" },
    { name: "Hired Tuitions", href: "/tutor/hired" },
    { name: "Terms & Policies", href: "/terms" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Light Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link href="/tutor" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform text-white font-extrabold text-xl">
              FT
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                FayazTutes
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                TUTOR PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Top Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {topNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors py-1 relative ${
                  isActive ? "text-indigo-600 font-extrabold" : "hover:text-slate-900"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Badge & Notifications */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500" />
            </button>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1 justify-end">
                Fayaz Ali
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-xs text-indigo-600 font-bold flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9 (24 reviews)
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm">
                FA
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main App Workspace */}
      <div className="flex flex-1 relative">
        {/* Left Light Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between transition-transform duration-300 shadow-sm
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="space-y-6">
            <div className="px-3.5 py-3 bg-indigo-50/60 rounded-2xl border border-indigo-100">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Verification Status
              </div>
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>CNIC Verification</span>
                <span className="text-[10px] font-extrabold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                  VERIFIED ✓
                </span>
              </div>
            </div>

            <nav className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Tutor Navigation
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                      ${isActive 
                        ? "bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200/80 shadow-xs" 
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        item.badge === "NEW" 
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                          : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <Link
              href="/parent/dashboard"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between shadow-md transition"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>Switch to Parent Portal</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <div className="text-center text-[11px] text-slate-500 font-medium">
              FayazTutes Official v2.0 • 2026
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
