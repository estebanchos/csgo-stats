import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { api } from '~/utils/api';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function PlayersMultiselect() {
  const [selectedPeople, setSelectedPeople] = useState<[] | typeof players>([]);
  const { data: players, isLoading } = api.players.getAll.useQuery();

  const nonSelectedPlayers = players?.filter(
    (player) => !selectedPeople?.some((selected) => selected.id === player.id)
  );

  if (isLoading) return <span>...</span>;

  return (
    // @ts-expect-error multiple should be allowed
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <div className='relative w-full cursor-default overflow-hidden rounded-md border bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
        <Combobox.Input className='min-w-[18rem] border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0' />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>
      </div>
      {selectedPeople && selectedPeople?.length > 0 && (
        <ul>
          {selectedPeople?.map((person) => (
            <li key={person?.id}>{person?.nickname}</li>
          ))}
        </ul>
      )}
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {nonSelectedPlayers?.map((player) => (
            <Combobox.Option
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                }`
              }
              key={player.id}
              value={player}
            >
              {player.nickname} - {player.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}
