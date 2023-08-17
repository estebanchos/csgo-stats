import Head from "next/head";

export default function InputPage() {
  return (
    <>
      <Head>
        <title>Input Results | CS:GO</title>
        <meta name="description" content="Stats from CS:GO Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
       <h1>Game Results Input</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-6xl font-bold">
          Inputs
        </h2>
       
      </main>
    </>
  )
}