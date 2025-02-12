import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { UsersProvider } from "@/hooks/useUsers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intern AI",
  description: "AI-powered platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`flex flex-col h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UsersProvider>
          <Navbar />
          {children}
        </UsersProvider>
      </body>
    </html>
  );
}
