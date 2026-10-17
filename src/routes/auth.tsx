import { createFileRoute } from "@tanstack/react-router";

import { BookerAuthCard } from "@/components/auth/BookerAuthCard";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Booker login — Street Symphony" },
      {
        name: "description",
        content: "Sign in as a booker to request artists, track availability, and manage your events.",
      },
      { property: "og:title", content: "Booker login — Street Symphony" },
      {
        property: "og:description",
        content: "Bookers can sign in with their mobile number and name to request artists for events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookerAuthPage,
});

function BookerAuthPage() {
  return <BookerAuthCard mode="login" />;
}
