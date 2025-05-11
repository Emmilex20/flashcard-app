// convex/flashcards/deleteFlashcard.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const deleteFlashcard = mutation({
  args: { id: v.id('flashcards') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
