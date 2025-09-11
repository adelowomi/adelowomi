import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Archivo, Besley } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
});

const besley = Besley({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-besley",
});

export const metadata: Metadata = {
  title: "Adelowo Ajibola | Software Engineer & Tech Leader",
  description: "Adelowo Ajibola - Experienced Software Engineer, Tech Leader, and Event Organizer. Explore my work, events, and contributions to the tech community.",
  keywords: ["Adelowo Ajibola", "Software Engineer", "Tech Leader", "Events", "Programming", "Technology"],
  authors: [{ name: "Adelowo Ajibola" }],
  creator: "Adelowo Ajibola",
  openGraph: {
    title: "Adelowo Ajibola | Software Engineer & Tech Leader",
    description: "Experienced Software Engineer, Tech Leader, and Event Organizer. Explore my work, events, and contributions to the tech community.",
    url: "https://adelowomi.com",
    siteName: "Adelowo Ajibola",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adelowo Ajibola | Software Engineer & Tech Leader",
    description: "Experienced Software Engineer, Tech Leader, and Event Organizer.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${besley.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-primary`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
