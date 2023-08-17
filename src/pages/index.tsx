import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import StatCard from "~/components/stats/StatCard";
import { RouterOutputs, api } from "~/utils/api";

type TPlayer = RouterOutputs["players"]['getById']

export default function Home() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const { data: session } = useSession();
  const { data: players, refetch: refetchPlayers, isLoading: isLoadingPlayers } = api.players.getAll.useQuery();

  const createPlayer = api.players.create.useMutation({
    onSuccess: () => {
      refetchPlayers();
      setName("");
      setNickname("");
    }
  });

  return (
    <>
      <Head>
        <title>CS:GO | Stats</title>
        <meta name="description" content="Stats from CS:GO Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {!session ? (
          <button
            onClick={() => signIn()}
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => signOut()}
          >
            Logout
          </button>
        )
        }
        {session && (
          <div>
            <p>{session.user?.name}</p>
            <p>{session.user?.email}</p>
            <p>{session.role}</p>
          </div>
        )}
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">
          Players
        </h1>
        <ul className="my-4 border w-96">
          {isLoadingPlayers
            ? <span>...</span>
            : players?.map((player) => (
              <li
                className="px-4 py-2"
                key={player.id}
              >
                {player.nickname}
                <section className="grid grid-cols-3">
                <StatCard 
                  name="Kills"
                  value={10}
                />
                <StatCard 
                  name="Assists"
                  value={5}
                />
                <StatCard 
                  name="Deaths"
                  value={8}
                />
                </section>
              </li>
            ))
          }
        </ul>
        {session && (
          <section>
            <form>
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  className="border rounded-md px-4 py-2"
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="nickname">Nickname</label>
                <input
                  className="border rounded-md px-4 py-2"
                  id="nickname"
                  type="text"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                />
              </div>
              <button
                className="border rounded-md px-4 py-2"
                type="submit"
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

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
