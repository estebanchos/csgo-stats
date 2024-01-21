import Head from 'next/head';
import { type MouseEvent, useState } from 'react';
import MapSearchbox from '~/components/inputs/MapsSearchbox';
import PlayersMultiselect from '~/components/inputs/PlayersMultiselect';
import { api } from '~/utils/api';

export default function InputPage() {
  const [selectedMap, setSelectedMap] = useState({});
  const [isMapConfirmed, setIsMapConfirmed] = useState(false);
  const [selectedTerroists, setSelectedTerroists] = useState<[] | typeof players>([]);
  const [selectedCounter, setSelectedCounter] = useState<[] | typeof players>([]);

  const { data: players, isLoading } = api.players.getAll.useQuery(undefined, {
    refetchOnMount: false,
    staleTime: Infinity,
  });

  function confirmMap(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsMapConfirmed(true);
  }
  function restartMapSelection(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsMapConfirmed(false);
  }

  return (
    <>
      <Head>
        <title>New Game Results | CS:GO</title>
        <meta name='description' content='Stats from CS:GO Game' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='mt-4 flex justify-center text-6xl'>Game Results Input</h1>
      <section className='mt-4 flex min-h-screen flex-col items-center'>
        <h2 className='text-2xl font-bold'>Inputs</h2>
        <form className='col-span-1 grid gap-4'>
          <section>
            <h3>Game Date</h3>
            <input
              className='relative w-full cursor-default overflow-hidden rounded-md border bg-white px-4 py-2 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
              type='date'
            />
          </section>
          <section>
            <h3>Map Selection</h3>
            <MapSearchbox
              selected={selectedMap}
              setSelected={setSelectedMap}
              isDisabled={isMapConfirmed}
            />
            <div className='mt-4 flex gap-x-4'>
              <button
                type='button'
                className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                onClick={(e) => confirmMap(e)}
                disabled={Object.keys(selectedMap).length === 0 || isMapConfirmed}
              >
                Confirm Map
              </button>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md border border-blue-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                onClick={(e) => restartMapSelection(e)}
              >
                Restart
              </button>
            </div>
          </section>
          <section className='grid grid-cols-2 gap-4'>
            <h3 className='col-span-2'>Team Assignment</h3>
            {isLoading ? (
              <span>...</span>
            ) : (
              <>
                <div>
                  <h4>Terrorists</h4>
                  <PlayersMultiselect />
                </div>
                <div>
                  <h4>Counter-terrorist</h4>
                  <PlayersMultiselect />
                </div>
              </>
            )}
          </section>
        </form>
      </section>
    </>
  );
}
