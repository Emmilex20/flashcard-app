'use client';

import './globals.css';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import Head from 'next/head'; // Import Head from Next.js

// Create a Convex client instance
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!); // Replace with your actual Convex deployment URL

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Head>
          {/* Page Title */}
          <title>Emmy-Code Flash Card App</title>

          {/* Meta Description */}
          <meta name="description" content="Learn and memorize new languages with ease using our interactive flashcard app. Track your progress, test your knowledge, and improve your vocabulary with personalized flashcard sets." />


          {/* Meta Tags for SEO */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <ClerkProvider>
          <ConvexProvider client={convex}>
            {children}
          </ConvexProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
