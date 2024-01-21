import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import { type RouterOutputs, api } from '~/utils/api';

type TPlayer = RouterOutputs['players']['getById'];

export default function Home() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const { data: session } = useSession();
  const {
    data: players,
    refetch: refetchPlayers,
    isLoading: isLoadingPlayers,
  } = api.players.getAll.useQuery();

  const createPlayer = api.players.create.useMutation({
    onSuccess: () => {
      refetchPlayers();
      setName('');
      setNickname('');
    },
  });

  return (
    <>
      <Head>
        <title>CS:GO | Stats</title>
        <meta name='description' content='Stats from CS:GO Game' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold'>Players</h1>
        <ul className='my-4 grid grid-cols-3 gap-4 border'>
          {isLoadingPlayers ? (
            <span>...</span>
          ) : (
            players?.map((player) => (
              <li className='col-span-1 px-4 py-2' key={player.id}>
                {player.nickname}
              </li>
            ))
          )}
        </ul>
        {session && (
          <section>
            <form>
              <div className='flex flex-col'>
                <label htmlFor='name'>Name</label>
                <input
                  className='rounded-md border px-4 py-2'
                  id='name'
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='nickname'>Nickname</label>
                <input
                  className='rounded-md border px-4 py-2'
                  id='nickname'
                  type='text'
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                />
              </div>
              <button
                className='rounded-md border px-4 py-2'
                type='submit'
                onClick={async (e) => {
                  e.preventDefault();
                  await createPlayer.mutateAsync({
                    name,
                    nickname,
                  });
                  refetchPlayers();
                }}
              >
                Create Player
              </button>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
