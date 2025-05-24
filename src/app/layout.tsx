'use client';
import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/createQueryClient';

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
        <QueryClientProvider client={createQueryClient()}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
