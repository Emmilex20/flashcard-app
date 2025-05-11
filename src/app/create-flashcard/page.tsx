'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; 
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

const CreateFlashcardPage = () => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState('General');

  const router = useRouter();
  const addFlashcardMutation = useMutation(api.flashcards.addFlashcard.addFlashcard);
  const { user } = useUser();

  const userId = user?.id;

  const handleAddFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term || !definition || !category || !user?.id) return;

    await addFlashcardMutation({
      term,
      definition,
      category,
      userId: user?.id,
    });

    setTerm('');
    setDefinition('');
    setCategory('General');
    router.push('/dashboard');
  };

  return (
    <>
      <Navbar />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">📝 Create a New Flashcard</h2>
          <form onSubmit={handleAddFlashcard} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Term</label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
                placeholder="e.g., Bonjour"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Definition</label>
              <textarea
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
                placeholder="e.g., Hello in French"
                rows={4}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
              >
                <option value="General">General</option>
                <option value="Verbs">Verbs</option>
                <option value="Nouns">Nouns</option>
                <option value="Phrases">Phrases</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              ➕ Create Flashcard
            </button>
          </form>
        </main>
      </SignedIn>
    </>
  );
};

export default CreateFlashcardPage;
