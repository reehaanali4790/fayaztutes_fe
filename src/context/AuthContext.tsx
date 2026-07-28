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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { email: string; password: string; full_name: string; role: string; phone?: string; city?: string; subjects?: string[] }) => Promise<boolean>;
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
    const savedPanel = localStorage.getItem("ft_panel") as any;

    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      setCurrentPanel(savedPanel || parsedUser.role || "VISITOR");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      if (res.ok) {
        const data = await res.json();
        const sessionUser: UserSession = {
          id: data.user_id,
          email: data.email,
          full_name: data.full_name,
          role: data.role as any
        };

        setUser(sessionUser);
        setToken(data.access_token);
        setCurrentPanel(sessionUser.role);
        localStorage.setItem("ft_user", JSON.stringify(sessionUser));
        localStorage.setItem("ft_token", data.access_token);
        localStorage.setItem("ft_panel", sessionUser.role);
        return true;
      }
    } catch (err) {
      console.warn("Backend API unreachable, checking local user storage...", err);
    }

    // Check locally registered accounts in localStorage
    const localUsers = JSON.parse(localStorage.getItem("ft_registered_users") || "[]");
    const matchedUser = localUsers.find(
      (u: any) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (matchedUser) {
      const sessionUser: UserSession = {
        id: matchedUser.id,
        email: matchedUser.email,
        full_name: matchedUser.full_name,
        role: matchedUser.role.toUpperCase() as any
      };
      setUser(sessionUser);
      setToken("local-token");
      setCurrentPanel(sessionUser.role);
      localStorage.setItem("ft_user", JSON.stringify(sessionUser));
      localStorage.setItem("ft_token", "local-token");
      localStorage.setItem("ft_panel", sessionUser.role);
      return true;
    }

    // Default Seed Accounts for testing if valid credentials entered
    if (cleanEmail === "alifayaz455@gmail.com" && password === "password123") {
      const sessionUser: UserSession = {
        id: "tutor-1",
        email: cleanEmail,
        full_name: "Sir Fayaz Ali",
        role: "TUTOR"
      };
      setUser(sessionUser);
      setToken("demo-token");
      setCurrentPanel("TUTOR");
      localStorage.setItem("ft_user", JSON.stringify(sessionUser));
      localStorage.setItem("ft_token", "demo-token");
      localStorage.setItem("ft_panel", "TUTOR");
      return true;
    }

    if (cleanEmail === "hunza@gmail.com" && password === "password123") {
      const sessionUser: UserSession = {
        id: "parent-1",
        email: cleanEmail,
        full_name: "Hunza Bukhari",
        role: "PARENT"
      };
      setUser(sessionUser);
      setToken("demo-token");
      setCurrentPanel("PARENT");
      localStorage.setItem("ft_user", JSON.stringify(sessionUser));
      localStorage.setItem("ft_token", "demo-token");
      localStorage.setItem("ft_panel", "PARENT");
      return true;
    }

    if (cleanEmail === "admin@fayaztutes.com" && password === "admin123") {
      const sessionUser: UserSession = {
        id: "admin-1",
        email: cleanEmail,
        full_name: "System Admin",
        role: "ADMIN"
      };
      setUser(sessionUser);
      setToken("demo-token");
      setCurrentPanel("ADMIN");
      localStorage.setItem("ft_user", JSON.stringify(sessionUser));
      localStorage.setItem("ft_token", "demo-token");
      localStorage.setItem("ft_panel", "ADMIN");
      return true;
    }

    // Return false for invalid credentials
    return false;
  };

  const signup = async (data: { email: string; password: string; full_name: string; role: string; phone?: string; city?: string; subjects?: string[] }): Promise<boolean> => {
    const cleanEmail = data.email.toLowerCase().trim();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email: cleanEmail })
      });

      if (res.ok) {
        const resData = await res.json();
        const newUser: UserSession = {
          id: resData.user_id,
          email: resData.email,
          full_name: resData.full_name,
          role: resData.role as any
        };

        setUser(newUser);
        setToken(resData.access_token);
        setCurrentPanel(newUser.role);
        localStorage.setItem("ft_user", JSON.stringify(newUser));
        localStorage.setItem("ft_token", resData.access_token);
        localStorage.setItem("ft_panel", newUser.role);
        return true;
      }
    } catch (err) {
      console.warn("Backend API unreachable, persisting registration locally...", err);
    }

    // Save registered user locally
    const localUsers = JSON.parse(localStorage.getItem("ft_registered_users") || "[]");
    const newUserRecord = {
      id: `u-${Date.now()}`,
      email: cleanEmail,
      password: data.password,
      full_name: data.full_name,
      role: data.role.toUpperCase(),
      phone: data.phone,
      city: data.city
    };

    localUsers.push(newUserRecord);
    localStorage.setItem("ft_registered_users", JSON.stringify(localUsers));

    const sessionUser: UserSession = {
      id: newUserRecord.id,
      email: newUserRecord.email,
      full_name: newUserRecord.full_name,
      role: newUserRecord.role as any
    };

    setUser(sessionUser);
    setToken("local-token");
    setCurrentPanel(sessionUser.role);
    localStorage.setItem("ft_user", JSON.stringify(sessionUser));
    localStorage.setItem("ft_token", "local-token");
    localStorage.setItem("ft_panel", sessionUser.role);
    return true;
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
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchPanel
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
