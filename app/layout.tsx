import type { Metadata } from "next";
import { Space_Grotesk, Inter, Press_Start_2P } from "next/font/google";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${pressStart.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
