import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-course(.*)'
]);

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/course/[courseId]',
  '/course/[courseId]/start',
  '/api/webhook/clerk',
  '/api/uploadthing',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/trpc(.*)'
];

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Skip middleware for public routes
  if (publicRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      // Handle dynamic routes like /course/[courseId]
      const basePath = route.split('[')[0];
      return pathname.startsWith(basePath);
    }
    return pathname === route || pathname.startsWith(route);
  })) {
    return null;
  }
  
  // For protected routes, require authentication
  if (isProtectedRoute(req)) {
    auth.protect();
  }
  
  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};