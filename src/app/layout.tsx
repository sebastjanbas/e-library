import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Library",
  description: "Create your own digital library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
