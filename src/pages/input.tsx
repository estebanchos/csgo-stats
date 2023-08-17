import Head from "next/head";
import { MouseEvent, useState } from "react";
import MapSearchbox from "~/components/inputs/MapsSearchbox";

export default function InputPage() {
  const [map, setMap] = useState({});
  const [isMapConfirmed, setIsMapConfirmed] = useState(false);

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
        <title>Input Results | CS:GO</title>
        <meta name="description" content="Stats from CS:GO Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center text-6xl mt-4">
        <h1>Game Results Input</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center mt-4">
        <h2 className="text-2xl font-bold">
          Inputs
        </h2>
        <form>
          <section>
            <h3>Map Selection</h3>
            <MapSearchbox selected={map} setSelected={setMap} isDisabled={isMapConfirmed} />
            <div className="mt-4 flex gap-x-4">
              <button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-200`}
                onClick={(e) => confirmMap(e)}
                disabled={Object.keys(map).length === 0 || isMapConfirmed}
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
        </form>
      </main>
    </>
  )
}