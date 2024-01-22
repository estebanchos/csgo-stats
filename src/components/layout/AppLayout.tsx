import { type ReactNode } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isCurrentRoute } from '~/lib/client';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div className='bg-gray-800 text-white'>
      <header className='flex flex-col items-center justify-center'>
        <div className='flex w-full justify-between px-8 py-4'>
          <nav className='flex gap-12'>
            <Link className='nav-button' href='/new-game'>
              Add a match
            </Link>
            <div className='flex gap-4'>
              <Link
                className={!isCurrentRoute('/', router) ? 'nav-link' : 'nav-link__active'}
                href='/'
              >
                Home
              </Link>
              <Link
                className={!isCurrentRoute('/players', router) ? 'nav-link' : 'nav-link__active'}
                href='/players'
              >
                Players
              </Link>
            </div>
          </nav>
          <div className='ml-6 flex gap-4'>
            {session && <p className='flex items-center font-medium'>{session.user?.name}</p>}
            <button
              className='w-fit rounded-md border px-4 py-2'
              onClick={() => (!session ? signIn() : signOut())}
            >
              {!session ? 'Login' : 'Logout'}
            </button>
          </div>
        </div>
      </header>
      <main className='flex min-h-screen flex-col items-center justify-center'>{children}</main>
    </div>
  );
}
