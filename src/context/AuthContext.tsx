"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  clearStoredSession,
  hasStoredSession,
  readStoredSession,
  writeStoredSession,
} from "@/lib/authSession";
import { clearTutorOnboardingPending } from "@/lib/tutorOnboarding";
import { API_BASE_URL } from "@/lib/api";

export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  role: "PARENT" | "TUTOR" | "ADMIN";
}

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  currentPanel: "PARENT" | "TUTOR" | "ADMIN" | "VISITOR";
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserSession["role"] }>;
  signup: (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
    phone?: string;
    city?: string;
    cnic?: string;
    subjects?: string[];
    subject_ids?: string[];
    teaching_grade_ids?: string[];
  }) => Promise<{ success: boolean; error?: string; role?: UserSession["role"] }>;
  logout: () => void;
  syncSession: () => void;
  switchPanel: (panel: "PARENT" | "TUTOR" | "ADMIN" | "VISITOR") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentPanel, setCurrentPanel] = useState<"PARENT" | "TUTOR" | "ADMIN" | "VISITOR">("VISITOR");

  const applySession = useCallback(
    (session: ReturnType<typeof readStoredSession>) => {
      if (!session) {
        setUser(null);
        setToken(null);
        setCurrentPanel("VISITOR");
        return;
      }
      setUser(session.user);
      setToken(session.token);
      setCurrentPanel(
        (session.panel as "PARENT" | "TUTOR" | "ADMIN" | "VISITOR") || session.user.role
      );
    },
    []
  );

  const syncSession = useCallback(() => {
    applySession(readStoredSession());
  }, [applySession]);

  useEffect(() => {
    syncSession();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) syncSession();
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") syncSession();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [syncSession]);

  const login = async (email: string, password: string) => {
    const cleanEmail = email.toLowerCase().trim();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const sessionUser: UserSession = {
          id: data.user_id,
          email: data.email,
          full_name: data.full_name,
          role: data.role as UserSession["role"],
        };

        setUser(sessionUser);
        setToken(data.access_token);
        setCurrentPanel(sessionUser.role);
        writeStoredSession(sessionUser, data.access_token, sessionUser.role);
        return { success: true, role: sessionUser.role };
      }

      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.detail || "Invalid email or password." };
    } catch {
      return { success: false, error: "Unable to reach the server. Please try again." };
    }
  };

  const signup = async (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
    phone?: string;
    city?: string;
    cnic?: string;
    subjects?: string[];
    subject_ids?: string[];
    teaching_grade_ids?: string[];
  }) => {
    const cleanEmail = data.email.toLowerCase().trim();

    if (data.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters." };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email: cleanEmail }),
      });

      if (res.ok) {
        const resData = await res.json();
        const newUser: UserSession = {
          id: resData.user_id,
          email: resData.email,
          full_name: resData.full_name,
          role: resData.role as UserSession["role"],
        };

        setUser(newUser);
        setToken(resData.access_token);
        setCurrentPanel(newUser.role);
        writeStoredSession(newUser, resData.access_token, newUser.role);
        return { success: true, role: newUser.role };
      }

      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.detail || "Registration failed. Please try again." };
    } catch {
      return { success: false, error: "Unable to reach the server. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCurrentPanel("VISITOR");
    clearStoredSession();
    clearTutorOnboardingPending();
  };

  const switchPanel = (panel: "PARENT" | "TUTOR" | "ADMIN" | "VISITOR") => {
    setCurrentPanel(panel);
    localStorage.setItem("ft_panel", panel);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        currentPanel,
        isAuthenticated: !!user && !!token && hasStoredSession(),
        login,
        signup,
        logout,
        syncSession,
        switchPanel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
