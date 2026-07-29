"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

export interface NavItem {
  name: string;
  href: string;
  badge?: string | number;
}

interface PortalShellProps {
  children: React.ReactNode;
  portal: "tutor" | "parent" | "admin";
  navItems: NavItem[];
  accent?: "indigo" | "purple";
}

const portalLabels = {
  tutor: { label: "TUTOR PORTAL", badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  parent: { label: "PARENT PORTAL", badge: "bg-purple-50 text-purple-700 border-purple-200" },
  admin: { label: "ADMIN CONSOLE", badge: "bg-slate-100 text-slate-700 border-slate-200" },
};

export default function PortalShell({
  children,
  portal,
  navItems,
  accent = portal === "parent" ? "purple" : "indigo",
}: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const meta = portalLabels[portal];
  const activeBorder = accent === "purple" ? "border-purple-600 text-purple-600" : "border-indigo-600 text-indigo-600";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href={portal === "parent" ? "/parent/dashboard" : portal === "admin" ? "/admin" : "/tutor"} className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              FT
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">FayazTutes</span>
              <span className={cn("hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border", meta.badge)}>
                {meta.label}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Avatar name={user.full_name} size="sm" />
                <span>{user.full_name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <aside
          className={cn(
            "fixed lg:sticky top-[65px] left-0 z-30 h-[calc(100vh-65px)] w-64 bg-white border-r border-slate-200 p-4 transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition",
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <span>{item.name}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
