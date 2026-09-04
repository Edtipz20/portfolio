import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "./sidebar";
import { signOutAction } from "@/lib/actions/user.action";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Belt-and-suspenders: middleware already blocks unauthenticated requests
  // to /admin, but checking again here means this layout never silently
  // renders admin content if it's ever reached without a session.
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-[#07070c]">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
          <p className="text-sm text-white/50">
            Signed in as{" "}
            <span className="text-white/80">{session.user.email}</span>
          </p>

          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-lg border border-white/15 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              Sign out
            </button>
          </form>
        </header>

        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
