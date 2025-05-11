import { clerkMiddleware } from '@clerk/nextjs/server';

// Specify routes that should be public
export default clerkMiddleware({
  // No need for `publicRoutes`, Clerk will handle route protection based on the matcher
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Public routes
    '/sign-up(.*)',
    '/sign-in(.*)',
    '/',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
