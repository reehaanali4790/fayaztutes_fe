import type { UserSession } from "@/context/AuthContext";

const USER_KEY = "ft_user";
const TOKEN_KEY = "ft_token";
const PANEL_KEY = "ft_panel";

export function readStoredSession(): { user: UserSession; token: string; panel: string | null } | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN_KEY);
  const userRaw = localStorage.getItem(USER_KEY);
  if (!token || !userRaw) return null;

  try {
    const user = JSON.parse(userRaw) as UserSession;
    if (!user?.id || !user?.role) return null;
    return { user, token, panel: localStorage.getItem(PANEL_KEY) };
  } catch {
    return null;
  }
}

export function writeStoredSession(user: UserSession, token: string, panel?: string) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  if (panel) localStorage.setItem(PANEL_KEY, panel);
}

export function clearStoredSession() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PANEL_KEY);
}

export function hasStoredSession(): boolean {
  return readStoredSession() !== null;
}
