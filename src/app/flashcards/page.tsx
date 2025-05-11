'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import FlashcardItem from '../../components/FlashcardItem';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs'; 
import { useRouter } from 'next/navigation'; 
import Navbar from '../../components/Navbar';

type Flashcard = {
  _id: string;
  term: string;
  definition: string;
  category: string;
  userId: string;
};

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { user, isLoaded } = useUser(); 
  const router = useRouter(); 

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-up');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return null; 
  }

  const userId = user.id; 

  const fetchedFlashcards = useQuery(api.flashcards.getFlashcards.getFlashcards, { userId });

  useEffect(() => {
    if (fetchedFlashcards) {
      setFlashcards(fetchedFlashcards);
    }
  }, [fetchedFlashcards]);

  const filteredFlashcards =
    categoryFilter === 'All'
      ? flashcards
      : flashcards.filter((fc) => fc.category === categoryFilter);

  const paginatedFlashcards = filteredFlashcards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFlashcards.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">📘 All Flashcards</h2>

          <div className="flex gap-3 flex-wrap">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded text-gray-700 w-full sm:w-auto"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="Verbs">Verbs</option>
              <option value="Nouns">Nouns</option>
              <option value="Phrases">Phrases</option>
            </select>

            <Link href="/create-flashcard">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-2 sm:mt-0">
                ➕ Create Flashcard
              </button>
            </Link>
          </div>
        </div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedFlashcards.length > 0 ? (
            paginatedFlashcards.map((flashcard) => (
              <FlashcardItem
                key={flashcard._id}
                _id={flashcard._id}
                term={flashcard.term}
                definition={flashcard.definition}
              />
            ))
          ) : (
            <p className="text-gray-500">No flashcards available.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredFlashcards.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => (p < totalPages ? p + 1 : p))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default FlashcardsPage;
