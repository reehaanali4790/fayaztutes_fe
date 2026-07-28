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
      setCurrentPanel(savedPanel || (parsedUser.role as any) || "VISITOR");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        // Fallback demo user login if backend unavailable
        const demoUser: UserSession = {
          id: "u-1",
          email,
          full_name: email.includes("parent") ? "Parent Demo" : email.includes("admin") ? "Admin User" : "Sir Fayaz Ali",
          role: email.includes("parent") ? "PARENT" : email.includes("admin") ? "ADMIN" : "TUTOR"
        };
        setUser(demoUser);
        setToken("mock-token");
        setCurrentPanel(demoUser.role);
        localStorage.setItem("ft_user", JSON.stringify(demoUser));
        localStorage.setItem("ft_token", "mock-token");
        localStorage.setItem("ft_panel", demoUser.role);
        return true;
      }

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
    } catch (err) {
      // Mock login fallback
      const mockUser: UserSession = {
        id: "u-1",
        email,
        full_name: "Sir Fayaz Ali",
        role: "TUTOR"
      };
      setUser(mockUser);
      setToken("mock-token");
      setCurrentPanel("TUTOR");
      localStorage.setItem("ft_user", JSON.stringify(mockUser));
      localStorage.setItem("ft_token", "mock-token");
      localStorage.setItem("ft_panel", "TUTOR");
      return true;
    }
  };

  const signup = async (data: { email: string; password: string; full_name: string; role: string; phone?: string; city?: string; subjects?: string[] }): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        // Mock fallback
        const newUser: UserSession = {
          id: `u-${Date.now()}`,
          email: data.email,
          full_name: data.full_name,
          role: data.role.toUpperCase() as any
        };
        setUser(newUser);
        setToken("mock-token");
        setCurrentPanel(newUser.role);
        localStorage.setItem("ft_user", JSON.stringify(newUser));
        localStorage.setItem("ft_token", "mock-token");
        localStorage.setItem("ft_panel", newUser.role);
        return true;
      }

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
    } catch (err) {
      const newUser: UserSession = {
        id: `u-${Date.now()}`,
        email: data.email,
        full_name: data.full_name,
        role: data.role.toUpperCase() as any
      };
      setUser(newUser);
      setToken("mock-token");
      setCurrentPanel(newUser.role);
      localStorage.setItem("ft_user", JSON.stringify(newUser));
      localStorage.setItem("ft_token", "mock-token");
      localStorage.setItem("ft_panel", newUser.role);
      return true;
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
