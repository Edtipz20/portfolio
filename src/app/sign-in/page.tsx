"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { authenticate, type SignInState } from "../../lib/actions/user.action";

const initialState: SignInState = {};

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07070c] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h1 className="font-display text-2xl font-bold text-white">
          Admin sign in
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Sign in to manage projects and experience entries.
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-medium text-white/70"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-xs font-medium text-white/70"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400"
            />
          </div>

          {state.error && (
            <p role="alert" className="text-sm text-red-400">
              {state.error}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
