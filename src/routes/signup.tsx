import { createFileRoute } from "@tanstack/react-router";

import { BookerAuthCard } from "@/components/auth/BookerAuthCard";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Booker sign up — Street Symphony" },
      {
        name: "description",
        content: "Create a first-time booker account to request artists and manage event bookings.",
      },
      { property: "og:title", content: "Booker sign up — Street Symphony" },
      {
        property: "og:description",
        content: "Create your booker profile and sign up to request artists for your next event.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookerSignupPage,
});

function BookerSignupPage() {
  return <BookerAuthCard mode="signup" />;
}
