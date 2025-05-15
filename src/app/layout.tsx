'use client';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAppStore';

Amplify.configure(awsExports);

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Budget Tracker",
//   description: "Budget Tracker built with Next.js and AWS Amplify",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // 🔁 Restore Cognito session into Zustand on load
  }, [fetchUser]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
