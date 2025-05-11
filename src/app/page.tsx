'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import FlashcardItem from '../components/FlashcardItem';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // For animations


const HomePage = () => {
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState('General');

  const { user } = useUser(); 
  const router = useRouter(); 

  const userId = user?.id || ''; 

  const addFlashcardMutation = useMutation(api.flashcards.addFlashcard.addFlashcard);
  const fetchFlashcardsQuery = useQuery(api.flashcards.getFlashcards.getFlashcards, { userId });

  useEffect(() => {
    if (fetchFlashcardsQuery) {
      setFlashcards(fetchFlashcardsQuery);
    }

    if (!user) {
      router.push('/sign-up');
    }
  }, [fetchFlashcardsQuery, user, router]);

  const handleAddFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!term || !definition || !category || !userId) return;

    await addFlashcardMutation({ term, definition, category, userId });

    setTerm('');
    setDefinition('');
    setCategory('General');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 py-10 px-6">
      <Navbar />
      <section className="max-w-4xl mt-12 mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-6">🎓 My Flashcards</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center text-lg mb-10">
          Learn faster and retain more with your personalized flashcards.
        </p>

        {/* Add Flashcard Form */}
        <form
          onSubmit={handleAddFlashcard}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl rounded-2xl p-6 md:p-8 mb-12 space-y-6 border border-indigo-100 dark:border-gray-700"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Term</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 text-gray-700 dark:text-white"
              placeholder="Enter term"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Definition</label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 text-gray-700 dark:text-white"
              rows={3}
              placeholder="Enter definition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 text-gray-700 dark:text-white"
            >
              <option value="General">General</option>
              <option value="Verbs">Verbs</option>
              <option value="Nouns">Nouns</option>
              <option value="Phrases">Phrases</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
          >
            ➕ Add Flashcard
          </motion.button>
        </form>

        {/* Flashcards Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flashcards.map((flashcard, index) => (
            <motion.div
              key={flashcard._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlashcardItem
                _id={flashcard._id}
                term={flashcard.term}
                definition={flashcard.definition}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation button to go to Dashboard */}
        <div className="mt-6 text-center">
          <Link href="/dashboard" passHref>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
