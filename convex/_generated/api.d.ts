/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as flashcards_addFlashcard from "../flashcards/addFlashcard.js";
import type * as flashcards_deleteFlashcard from "../flashcards/deleteFlashcard.js";
import type * as flashcards_getFlashcards from "../flashcards/getFlashcards.js";
import type * as flashcards_updateFlashcard from "../flashcards/updateFlashcard.js";
import type * as getUser from "../getUser.js";
import type * as index from "../index.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "flashcards/addFlashcard": typeof flashcards_addFlashcard;
  "flashcards/deleteFlashcard": typeof flashcards_deleteFlashcard;
  "flashcards/getFlashcards": typeof flashcards_getFlashcards;
  "flashcards/updateFlashcard": typeof flashcards_updateFlashcard;
  getUser: typeof getUser;
  index: typeof index;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
