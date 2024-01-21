import { ReactNode } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { isCurrentRoute } from "~/lib/client";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div className="bg-gray-800 text-white">
      <header className="flex justify-center items-center flex-col">
        <div className="flex justify-between w-full px-8 py-4">
          <nav className="flex gap-12">
            <Link
              className="nav-button"
              href="/input"
            >
              Add a match
            </Link>
            <div className="flex gap-4">
              <Link
                className={!isCurrentRoute('/', router) ? "nav-link" : 'nav-link__active'}
                href="/"
              >
                Home
              </Link>
              <Link
                className={!isCurrentRoute('/players', router) ? "nav-link" : 'nav-link__active'}
                href="/players"
              >
                Players
              </Link>
            </div>
          </nav>
          <div className="flex gap-4 ml-6">
            {session && (
              <p className="flex items-center font-medium">{session.user?.name}</p>
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
    </div>
  )
}