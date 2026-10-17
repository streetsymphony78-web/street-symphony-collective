import { useSyncExternalStore } from "react";

/**
 * Street Symphony prototype auth — a lightweight client-side session.
 * Simulates real authentication so the demo can show role-based dashboards
 * without a backend. Swap for Lovable Cloud auth when going live.
 */

export type Role = "artist" | "booker";

export interface Session {
  role: Role;
  name: string;
  email: string;
}

const KEY = "street-symphony-session";
const listeners = new Set<() => void>();
let cachedSession: Session | null = null;

function emit() {
  listeners.forEach((l) => l());
}

function readSessionFromStorage(): Session | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      cachedSession = null;
      return null;
    }

    const parsed = JSON.parse(raw) as Session;
    cachedSession = cachedSession && cachedSession.role === parsed.role && cachedSession.name === parsed.name && cachedSession.email === parsed.email
      ? cachedSession
      : parsed;

    return cachedSession;
  } catch {
    cachedSession = null;
    return null;
  }
}

export function getSession(): Session | null {
  return readSessionFromStorage();
}

export function signIn(role: Role, name?: string, email?: string): Session {
  const session: Session = {
    role,
    name: name ?? (role === "artist" ? "Meera Rathore" : "Aisha Verma"),
    email: email ?? (role === "artist" ? "meera@example.in" : "aisha@example.in"),
  };
  cachedSession = session;
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("street-symphony-session"));
  emit();
  return session;
}

export function signOut() {
  cachedSession = null;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("street-symphony-session"));
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  window.addEventListener("street-symphony-session", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
    window.removeEventListener("street-symphony-session", cb);
  };
}

export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSession, () => null);
}
