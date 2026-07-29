"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  signup: (data: { email: string; password: string; full_name: string; role: string; phone?: string; city?: string; subjects?: string[] }) => Promise<{ success: boolean; error?: string; role?: UserSession["role"] }>;
  logout: () => void;
  switchPanel: (panel: "PARENT" | "TUTOR" | "ADMIN" | "VISITOR") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentPanel, setCurrentPanel] = useState<"PARENT" | "TUTOR" | "ADMIN" | "VISITOR">("VISITOR");

  useEffect(() => {
    const savedUser = localStorage.getItem("ft_user");
    const savedToken = localStorage.getItem("ft_token");
    const savedPanel = localStorage.getItem("ft_panel") as "PARENT" | "TUTOR" | "ADMIN" | "VISITOR" | null;

    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      setCurrentPanel(savedPanel || parsedUser.role || "VISITOR");
    }
  }, []);

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
        localStorage.setItem("ft_user", JSON.stringify(sessionUser));
        localStorage.setItem("ft_token", data.access_token);
        localStorage.setItem("ft_panel", sessionUser.role);
        return { success: true, role: sessionUser.role };
      }

      const err = await res.json().catch(() => ({}));
      return { success: false, error: err.detail || "Invalid email or password." };
    } catch {
      return { success: false, error: "Unable to reach the server. Please try again." };
    }
  };

  const signup = async (data: { email: string; password: string; full_name: string; role: string; phone?: string; city?: string; subjects?: string[] }) => {
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
        localStorage.setItem("ft_user", JSON.stringify(newUser));
        localStorage.setItem("ft_token", resData.access_token);
        localStorage.setItem("ft_panel", newUser.role);
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
    localStorage.removeItem("ft_user");
    localStorage.removeItem("ft_token");
    localStorage.removeItem("ft_panel");
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
        isAuthenticated: !!user && !!token,
        login,
        signup,
        logout,
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
