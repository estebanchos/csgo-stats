import { TrashIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { type MouseEvent, useState } from 'react';
import { TeamAssignment } from '~/components/NewGame/TeamAssignment';
import MapSearchbox from '~/components/inputs/MapsSearchbox';
import PlayersMultiselect from '~/components/inputs/PlayersMultiselect';
import { SelectedPlayerList } from '~/components/inputs/SelectedPlayerList';
import { api } from '~/utils/api';

export default function InputPage() {
  const [gameData, setGameData] = useState({});
  const [selectedMap, setSelectedMap] = useState({});
  const [isMapConfirmed, setIsMapConfirmed] = useState(false);
  const [selectedTerrorists, setSelectedTerrorists] = useState<typeof players>([]);
  const [selectedCounter, setSelectedCounter] = useState<typeof players>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { data: session } = useSession();

  const { data: players, isLoading } = api.players.getAll.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const remainingPlayers = players?.filter((player) => {
    return (
      !selectedTerrorists?.some((selected) => selected.id === player.id) &&
      !selectedCounter?.some((selected) => selected.id === player.id)
    );
  });

  function confirmMap(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsMapConfirmed(true);
  }
  function restartMapSelection(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsMapConfirmed(false);
    setSelectedMap({});
  }

  if (!session) return <div>Unauthorized. Please Login</div>;

  return (
    <>
      <Head>
        <title>New Game Results | CS:GO</title>
        <meta name='description' content='Stats from CS:GO Game' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='mt-4 flex justify-center text-6xl'>New Game</h1>
      <div className='w-40'>
        <button type='button' className='cancel-cta my-4' onClick={(e) => restartMapSelection(e)}>
          Restart Results
        </button>
      </div>

      <section className='mt-4 flex min-h-screen flex-col items-center'>
        <h2 className='text-2xl font-bold'>Map</h2>
        <form className='col-span-1 mt-4 grid grid-cols-2 gap-4 text-gray-700'>
          <div className='col-span-1'>
            <label htmlFor='date' className='text-white'>
              Game Date
            </label>
            <input
              id='date'
              className='relative mt-1 w-full cursor-default overflow-hidden rounded-md border bg-white px-4 py-2 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
              type='date'
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate}
            />
          </div>

          <div className='col-span-1'>
            <label htmlFor='map' className='text-white'>
              Map Selection
            </label>
            <MapSearchbox
              selected={selectedMap}
              setSelected={setSelectedMap}
              isDisabled={isMapConfirmed}
            />
          </div>
          <div className='col-span-2 mt-4'>
            <button
              type='button'
              className='main-cta'
              onClick={(e) => confirmMap(e)}
              disabled={Object.keys(selectedMap).length === 0 || isMapConfirmed}
            >
              Confirm Map
            </button>
          </div>
        </form>

        <section className='mt-4 grid grid-cols-2 gap-4'>
          <h2 className='col-span-2 flex justify-center text-2xl font-bold text-white'>
            Team Assignment
          </h2>
          {isLoading ? (
            <span>...</span>
          ) : (
            <>
              <TeamAssignment
                selectedPlayers={selectedTerrorists}
                setSelectedPlayers={setSelectedTerrorists}
                availablePlayers={remainingPlayers}
                team='terrorists'
              />
              <TeamAssignment
                selectedPlayers={selectedCounter}
                setSelectedPlayers={setSelectedCounter}
                availablePlayers={remainingPlayers}
                team='counter'
              />
            </>
          )}
        </section>
      </section>
    </>
  );
}
