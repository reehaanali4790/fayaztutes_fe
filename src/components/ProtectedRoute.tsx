"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, ShieldAlert } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"PARENT" | "TUTOR" | "ADMIN">;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Short delay to allow localStorage hydration
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem("ft_user");
      if (!savedUser && !isAuthenticated) {
        router.push("/auth/login");
      } else {
        setChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
        <div className="space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-bold text-slate-600">Verifying Authorization & Session...</div>
        </div>
      </div>
    );
  }

  const currentUser = user || (typeof window !== "undefined" && localStorage.getItem("ft_user") ? JSON.parse(localStorage.getItem("ft_user")!) : null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md space-y-4 shadow-xl">
          <Lock className="w-12 h-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-extrabold text-slate-900">Authentication Required</h2>
          <p className="text-xs text-slate-600">Please sign in to access this portal.</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md space-y-4 shadow-xl">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-extrabold text-slate-900">Access Denied</h2>
          <p className="text-xs text-slate-600">
            Your account ({currentUser.role}) does not have permission to access this area.
          </p>
          <button
            onClick={() => {
              if (currentUser.role === "TUTOR") router.push("/tutor");
              else if (currentUser.role === "PARENT") router.push("/parent/dashboard");
              else if (currentUser.role === "ADMIN") router.push("/admin");
              else router.push("/");
            }}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
          >
            Go to Your Authorized Portal
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
