'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface FlashcardProps {
  term: string;
  definition: string;
  _id: string; // Assuming _id is a string, but it needs to be cast to Id<"flashcards">
}

const FlashcardItem = ({ term, definition, _id }: FlashcardProps) => {
  const deleteFlashcard = useMutation(api.flashcards.deleteFlashcard.deleteFlashcard);
  const updateFlashcard = useMutation(api.flashcards.updateFlashcard.updateFlashcard);

  const [editing, setEditing] = useState(false);
  const [newTerm, setNewTerm] = useState(term);
  const [newDefinition, setNewDefinition] = useState(definition);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cast _id to Id<"flashcards"> if it is a string
      await updateFlashcard({ id: _id as any, term: newTerm, definition: newDefinition });
      setEditing(false);
    } catch (err: unknown) {
      setError('Failed to update flashcard. Please try again.');
      if (err instanceof Error) {
        console.error('Update error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cast _id to Id<"flashcards"> if it is a string
      await deleteFlashcard({ id: _id as any });
    } catch (err: unknown) {
      setError('Failed to delete flashcard. Please try again.');
      if (err instanceof Error) {
        console.error('Delete error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-700 shadow-md rounded-xl p-4 space-y-2 border border-gray-200">
      {editing ? (
        <>
          <input
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            className="w-full border p-2 rounded mb-2 text-gray-700"
          />
          <textarea
            value={newDefinition}
            onChange={(e) => setNewDefinition(e.target.value)}
            className="w-full border p-2 rounded text-gray-700"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-xl">{term}</h3>
          <p className="text-gray-700">{definition}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:underline"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FlashcardItem;
