import NextAuth from "next-auth";
import authConfig from "./src/auth.config";

// This is the piece that was missing: auth.config.ts defines an `authorized`
// callback that decides which routes need a session, but nothing actually
// ran it. Wrapping NextAuth's edge-compatible config here and exporting the
// result as `middleware` is what wires it into the request pipeline.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Run on every route except static assets/images/api internals, so the
  // /admin(\/.*)? check inside auth.config.ts's `authorized` callback
  // actually gets a chance to fire.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
