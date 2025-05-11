// convex/flashcards/addFlashcard.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const addFlashcard = mutation({
  args: {
    term: v.string(),
    definition: v.string(),
    category: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('flashcards', args);
  },
});
