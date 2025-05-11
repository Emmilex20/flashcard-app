// convex/flashcards/updateFlashcard.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updateFlashcard = mutation({
  args: {
    id: v.id('flashcards'),
    term: v.optional(v.string()),
    definition: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});
