import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer Opportunities | Adelowo Ajibola",
  description: "Join our community and make a difference! Explore volunteer opportunities for upcoming events organized by Adelowo Ajibola.",
  openGraph: {
    title: "Volunteer Opportunities | Adelowo Ajibola",
    description: "Join our community and make a difference! Explore volunteer opportunities for upcoming events organized by Adelowo Ajibola.",
  },
};

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
