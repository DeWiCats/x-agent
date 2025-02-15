import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UsersProvider } from "@/hooks/useUsers";
import WalletProvider from "@/components/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlineAI",
  description:
    "SlineAI is an intelligent social media management platform that lets you create and manage AI-powered Twitter agents.",
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
        <WalletProvider>
          <UsersProvider>{children}</UsersProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
