import { ReactNode } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <>
      <header className="flex justify-center items-center flex-col">
        <div className="flex justify-between w-full px-8 py-4">
          <nav className="flex gap-4">
            <Link
              className="border rounded-md px-4 py-2"
              href="/"
            >
              Home
            </Link>
            <Link
              className="border rounded-md px-4 py-2"
              href="/players"
            >
              Players
            </Link>
            <Link
              className="border rounded-md px-4 py-2"
              href="/input"
            >
              Add a match
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            {session && (
              <div>
                <span className="italic">Logged in as </span>
                <span className="font-medium">{session.user?.name}</span>
              </div>
            )}
            <button
              className="border rounded-md px-4 py-2 w-fit"
              onClick={() => !session ? signIn() : signOut()}
            >
              {!session ? "Login" : "Logout"}
            </button>
          </div>

        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
    </>
  )
}