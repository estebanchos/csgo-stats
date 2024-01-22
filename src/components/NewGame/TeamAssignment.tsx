import { type TPlayers } from '~/lib/types';
import PlayersMultiselect from '../inputs/PlayersMultiselect';
import { SelectedPlayerList } from '../inputs/SelectedPlayerList';

type TProps = {
  selectedPlayers: TPlayers | undefined;
  setSelectedPlayers: (people: TPlayers | undefined) => void;
  availablePlayers: TPlayers | undefined;
  team: 'terrorists' | 'counter';
};
export function TeamAssignment({
  selectedPlayers,
  setSelectedPlayers,
  availablePlayers,
  team,
}: TProps) {
  return (
    <div className='col-span-2 grid grid-cols-2 gap-2'>
      <div className='flex flex-col gap-2'>
        <label className='col-span-2 text-white'>Available players</label>
        <PlayersMultiselect
          selectedPeople={selectedPlayers}
          setSelectedPeople={setSelectedPlayers}
          availablePlayers={availablePlayers}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h3 className='col-span-2 text-white'>
          {team === 'counter' ? 'Counter-terrorirst Team' : 'Terrorist Team'}
        </h3>
        <SelectedPlayerList
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
      </div>
    </div>
  );
}
