/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./globals.css";
import {
  Bungee_Spice,
  IBM_Plex_Mono,
  Manrope,
  Montserrat,
  Orbitron,
  Pacifico,
  Pinyon_Script,
} from "next/font/google";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/content/navbar";
import LandingPage from "@/components/content/landing-page";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/content/protected/dashboard-navbar";
import { AppProvider } from "@/components/providers/user-provider";

export const metadata: Metadata = {
  title: "E-Library",
  description: "Create your own digital library",
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased `}>
        <Toaster richColors position="top-center" />
        <Navbar />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
