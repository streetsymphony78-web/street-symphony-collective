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

function emit() {
  listeners.forEach((l) => l());
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(role: Role, name?: string, email?: string): Session {
  const session: Session = {
    role,
    name: name ?? (role === "artist" ? "Meera Rathore" : "Aisha Verma"),
    email: email ?? (role === "artist" ? "meera@example.in" : "aisha@example.in"),
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  emit();
  return session;
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSession, () => null);
}
