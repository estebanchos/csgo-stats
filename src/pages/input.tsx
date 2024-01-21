import Head from "next/head";
import { MouseEvent, useState } from "react";
import MapSearchbox from "~/components/inputs/MapsSearchbox";
import PlayersMultiselect from "~/components/inputs/PlayersMultiselect";
import { api } from "~/utils/api";

export default function InputPage() {
  const [selectedMap, setSelectedMap] = useState({});
  const [isMapConfirmed, setIsMapConfirmed] = useState(false);
  const [selectedTerroists, setSelectedTerroists] = useState<[] | typeof players>([]);
  const [selectedCounter, setSelectedCounter] = useState<[] | typeof players>([]);

  const { data: players, isLoading } = api.players.getAll.useQuery()

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
        <meta name="description" content="Stats from CS:GO Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="flex justify-center text-6xl mt-4">Game Results Input</h1>
      <section className="flex min-h-screen flex-col items-center mt-4">
        <h2 className="text-2xl font-bold">
          Inputs
        </h2>
        <form className="grid col-span-1 gap-4">
          <section>
            <h3>Game Date</h3>
            <input
              className="relative py-2 px-4 w-full cursor-default border overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
              type="date"
            />
          </section>
          <section>
            <h3>Map Selection</h3>
            <MapSearchbox selected={selectedMap} setSelected={setSelectedMap} isDisabled={isMapConfirmed} />
            <div className="mt-4 flex gap-x-4">
              <button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200`}
                onClick={(e) => confirmMap(e)}
                disabled={Object.keys(selectedMap).length === 0 || isMapConfirmed}
              >
                Confirm Map
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-blue-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={(e) => restartMapSelection(e)}
              >
                Restart
              </button>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-4">
            <h3 className="col-span-2">Team Assignment</h3>
            {isLoading ? <span>...</span> :
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
            }
          </section>
        </form>
      </section>
    </>
  )
}