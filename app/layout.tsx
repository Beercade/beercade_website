import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beercade — Redfern",
    template: "%s — Beercade Redfern",
  },
  description:
    "Arcade bar at 113 Regent Street, Redfern. Pinball, arcade, cold beer. Two minutes from the station.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://beercade.com.au"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pressStart.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/xel4rnf.css" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
