'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import FlashcardItem from '../../components/FlashcardItem';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';  // Clerk hook to get current user info
import { useRouter } from 'next/navigation';  // Next.js router for redirection

// Define the type for a flashcard
interface Flashcard {
  _id: string;
  term: string;
  definition: string;
}

const DashboardPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);  // Use the correct Flashcard type
  const { user, isLoaded } = useUser();  // Clerk user hook
  const router = useRouter();  // Router for redirecting

  // If the user is not loaded or not logged in, redirect
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-up');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return null;  // Show a loading spinner or nothing until user is loaded
  }

  // Now use the userId for fetching the flashcards
  const userId = user.id;
  
  // Fetch flashcards using useQuery and type it accordingly
  const fetchedFlashcards = useQuery(api.flashcards.getFlashcards.getFlashcards, {
    userId: userId,  // Pass userId as an argument to the query
  }) as Flashcard[];  // Type the fetched flashcards response

  useEffect(() => {
    if (fetchedFlashcards) {
      setFlashcards(fetchedFlashcards);
    }
  }, [fetchedFlashcards]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              📋 Manage Your Flashcards
            </h2>

            <Link href="/create-flashcard">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                ➕ Create Flashcard
              </button>
            </Link>
          </div>

          {flashcards.length === 0 ? (
            <div className="text-center mt-20 text-gray-600">
              <p className="text-lg">You don’t have any flashcards yet.</p>
              <Link href="/create-flashcard">
                <button className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  ➕ Create your first flashcard
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((card) => (
                <FlashcardItem
                  key={card._id}
                  _id={card._id}
                  term={card.term}
                  definition={card.definition}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
