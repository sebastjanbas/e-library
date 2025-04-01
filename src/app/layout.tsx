/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./globals.css";
import {
  Bungee_Spice,
  IBM_Plex_Mono,
  Montserrat,
  Pacifico,
  Pinyon_Script,
} from "next/font/google";
import {Toaster} from "sonner"

export const metadata: Metadata = {
  title: "E-Library",
  description: "Create your own digital library",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

const bungee = Bungee_Spice({
  subsets: ["latin"],
  weight: ["400"],
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
      <body className="font-seba tracking-tighter ">
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
