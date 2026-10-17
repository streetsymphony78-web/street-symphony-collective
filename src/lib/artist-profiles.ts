import type { Artist, Review } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export type ArtistProfileInput = {
  name: string;
  phone: string;
  slug: string;
  art_form: string;
  categories: string[];
  city: string;
  state: string;
  region: string;
  image_url: string;
  tagline: string;
  bio: string;
  story: string[];
  price: string;
  price_note: string;
  available: boolean;
  availability_note: string;
  available_days: number[];
  rating: number;
  review_count: number;
  experience_years: number;
  languages: string[];
  available_for: string[];
  formats: string[];
  portfolio: string[];
  reviews: Review[];
  featured: boolean;
  quote: string | null;
  is_published: boolean;
};

type ArtistProfileRow = ArtistProfileInput & {
  id: string;
  created_at: string;
};

function toArtist(row: ArtistProfileRow): Artist {
  return {
    slug: row.slug,
    name: row.name,
    artForm: row.art_form,
    categories: row.categories ?? [],
    city: row.city,
    state: row.state,
    region: row.region,
    image: row.image_url,
    tagline: row.tagline,
    bio: row.bio,
    story: row.story ?? [],
    price: row.price,
    priceNote: row.price_note,
    available: row.available,
    availabilityNote: row.availability_note,
    availableDays: row.available_days ?? [],
    rating: Number(row.rating ?? 0),
    reviewCount: row.review_count ?? 0,
    experienceYears: row.experience_years ?? 0,
    languages: row.languages ?? [],
    availableFor: row.available_for ?? [],
    formats: row.formats ?? [],
    portfolio: row.portfolio?.length ? row.portfolio : [row.image_url],
    reviews: row.reviews ?? [],
    featured: row.featured,
    ...(row.quote ? { quote: row.quote } : {}),
  };
}

export async function getPublishedArtistProfiles(): Promise<Artist[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("artist_profiles")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as ArtistProfileRow[]).map(toArtist);
}

export async function getPublishedArtistBySlug(slug: string): Promise<Artist | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("artist_profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? toArtist(data as ArtistProfileRow) : null;
}

export async function uploadArtistImage(file: File, slug: string): Promise<string> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const path = `${slug}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from("artist-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;
  return supabase.storage.from("artist-images").getPublicUrl(path).data.publicUrl;
}

export async function createArtistProfile(profile: ArtistProfileInput) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("artist_profiles").insert({
    ...profile,
    role: "artist",
    art_description: profile.art_form,
  });
  if (error) throw error;
}