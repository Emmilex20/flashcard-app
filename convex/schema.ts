// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  flashcards: defineTable({
    term: v.string(),
    definition: v.string(),
    category: v.string(),
    userId: v.string(),
  }),
});
