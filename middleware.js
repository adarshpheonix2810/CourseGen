import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!auth || typeof auth !== 'object') {
    console.error('Auth object is undefined or not an object')
    return null
  }
  
  if (isProtectedRoute(req)) {
    if (typeof auth.protect === 'function') {
      auth.protect()
    } else {
      console.error('auth().protect() is not a function')
      return null
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}