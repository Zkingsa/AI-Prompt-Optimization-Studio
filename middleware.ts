import { withAuth } from "next-auth/middleware";

/**
 * Protects every (dashboard) route by requiring a valid NextAuth session.
 * Unauthenticated requests are redirected to /login (configured in lib/auth.ts).
 * Auth routes, the public landing page, and API routes are left out of the matcher.
 */
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/prompts/:path*",
    "/test-suites/:path*",
    "/analytics/:path*",
    "/playground/:path*",
    "/templates/:path*",
    "/settings/:path*",
  ],
};
