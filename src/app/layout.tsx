'use client';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

Amplify.configure(awsExports);

import { Inter } from 'next/font/google';

import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchUser = useAppStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
