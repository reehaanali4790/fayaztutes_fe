"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { hasStoredSession, readStoredSession } from "@/lib/authSession";
import { Lock, ShieldAlert } from "lucide-react";
import type { UserSession } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"PARENT" | "TUTOR" | "ADMIN">;
}

type AuthState = "checking" | "unauthenticated" | "forbidden" | "authorized";

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { syncSession } = useAuth();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  const verifyAccess = useCallback(() => {
    syncSession();

    const session = readStoredSession();
    if (!session) {
      setCurrentUser(null);
      setAuthState("unauthenticated");
      router.replace("/auth/login");
      return;
    }

    if (!allowedRoles.includes(session.user.role)) {
      setCurrentUser(session.user);
      setAuthState("forbidden");
      return;
    }

    setCurrentUser(session.user);
    setAuthState("authorized");
  }, [allowedRoles, router, syncSession]);

  useEffect(() => {
    verifyAccess();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) verifyAccess();
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") verifyAccess();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [verifyAccess]);

  if (authState === "checking") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
        <div className="space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-bold text-slate-600">Verifying Authorization & Session...</div>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated" || !hasStoredSession()) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md space-y-4 shadow-xl">
          <Lock className="w-12 h-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-extrabold text-slate-900">Authentication Required</h2>
          <p className="text-xs text-slate-600">Your session has ended. Please sign in again.</p>
          <button
            onClick={() => router.replace("/auth/login")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (authState === "forbidden" && currentUser) {
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
              if (currentUser.role === "TUTOR") router.replace("/tutor");
              else if (currentUser.role === "PARENT") router.replace("/parent/dashboard");
              else if (currentUser.role === "ADMIN") router.replace("/admin");
              else router.replace("/");
            }}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
          >
            Go to Your Authorized Portal
          </button>
        </div>
      </div>
    );
  }

  if (authState !== "authorized") {
    return null;
  }

  return <>{children}</>;
}
