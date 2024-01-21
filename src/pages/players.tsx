import { useState } from 'react';
import UpdatePlayerInfo from '~/components/modals/UpdatePlayerModal';
import { api } from '~/utils/api';

export type TValueUpdate = {
  playerId: number;
  value: string;
  field: 'name' | 'nickname';
};

export default function PlayersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueToEdit, setValueToEdit] = useState<TValueUpdate | {}>({});
  const { data: players, refetch: refetchPlayers, isLoading: isLoadingPlayers } = api.players.getAll.useQuery();

  function openModal({ playerId, field, value }: TValueUpdate) {
    setIsModalOpen(true);
    setValueToEdit({ playerId, field, value });
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <main className='flex flex-col items-center justify-center'>
      <h1>Players</h1>
      <ul className='m-auto grid w-96 grid-cols-1 gap-2'>
        {isLoadingPlayers ? (
          <span>...</span>
        ) : (
          players?.map((player) => (
            <li key={player.id} className='grid grid-cols-4 gap-4'>
              <span
                className='col-span-2'
                onClick={() =>
                  openModal({
                    playerId: player.id,
                    field: 'nickname',
                    value: player.nickname,
                  })
                }
              >
                {player.nickname}
              </span>
              <span
                className='col-span-2'
                onClick={() =>
                  openModal({
                    playerId: player.id,
                    field: 'name',
                    value: player.name,
                  })
                }
              >
                {player.name}
              </span>
            </li>
          ))
        )}
      </ul>
      <UpdatePlayerInfo
        isOpen={isModalOpen}
        closeModal={closeModal}
        fieldUpdate={valueToEdit as TValueUpdate}
        refetchPlayers={refetchPlayers}
      />
    </main>
  );
}
