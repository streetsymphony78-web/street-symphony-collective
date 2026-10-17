import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabasePublishableKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

export const supabase =
  supabaseUrl && supabasePublishableKey ? createClient(supabaseUrl, supabasePublishableKey) : null;

export async function saveBookerProfile({ name, phone }: { name: string; phone: string }) {
  if (!supabase) {
    return { data: null, error: new Error("Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.") };
  }

  return supabase.from("booker_profiles").insert([{ name, phone, role: "booker" }]);
}

export async function saveArtistApplication({
  name,
  phone,
  artDescription,
}: {
  name: string;
  phone: string;
  artDescription?: string;
}) {
  if (!supabase) {
    return { data: null, error: new Error("Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.") };
  }

  return supabase
    .from("artist_applications")
    .insert([{ name, phone, art_description: artDescription || null, role: "artist" }]);
}

export function getSupabaseErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Unable to save your information. Please try again.";
}
