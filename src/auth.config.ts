import type { NextAuthConfig } from "next-auth";

export default {
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ request, auth }) {
      const protectedPaths = [/\/admin(\/.*)?/];
      const { pathname } = request.nextUrl;
      const isProtected = protectedPaths.some((p) => p.test(pathname));
      if (isProtected) return !!auth;
      return true;
    },
  },
  providers: [], // real providers (with Prisma/bcrypt) live in auth.ts
} satisfies NextAuthConfig;
