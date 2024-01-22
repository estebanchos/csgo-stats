import { TrashIcon } from '@heroicons/react/20/solid';
import { type TPlayers } from '~/lib/types';

type TProps = {
  selectedPlayers: TPlayers | undefined;
  setSelectedPlayers: (people: TPlayers | undefined) => void;
};
export function SelectedPlayerList({ selectedPlayers, setSelectedPlayers }: TProps) {
  function handleRemovePlayer(playerId: number) {
    setSelectedPlayers(selectedPlayers?.filter((player) => player.id !== playerId));
  }

  return (
    <ul className='flex flex-col gap-2'>
      {selectedPlayers?.map((player) => (
        <li key={player?.id} className='flex justify-between px-4 italic text-white'>
          <span>{player?.nickname}</span>
          <button onClick={() => handleRemovePlayer(player.id)}>
            <TrashIcon className='h-5 w-5' />
            <span className='sr-only'>Remove from team</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
