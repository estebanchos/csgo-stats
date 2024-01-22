import { Fragment } from 'react';
import { Combobox, Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { type TPlayers } from '~/lib/types';

type TProps = {
  selectedPeople: TPlayers | undefined;
  setSelectedPeople: (people: TPlayers | undefined) => void;
  availablePlayers: TPlayers | undefined;
};

export default function PlayersMultiselect({
  selectedPeople,
  setSelectedPeople,
  availablePlayers,
}: TProps) {
  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <Listbox.Button className='min-w-[18rem] border-none bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'>
        {selectedPeople?.map((person) => person.name).join(', ')}
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {availablePlayers?.map((person) => (
            <Listbox.Option key={person.id} value={person.id}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
    // <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
    //   <div className='relative w-full cursor-default overflow-hidden rounded-md border bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
    //     <Combobox.Input className='min-w-[18rem] border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0' />
    //     <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
    //       <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
    //     </Combobox.Button>
    //   </div>
    //   <Transition
    //     as={Fragment}
    //     leave='transition ease-in duration-100'
    //     leaveFrom='opacity-100'
    //     leaveTo='opacity-0'
    //   >
    //     <div className='relative'>
    //       <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
    //         {availablePlayers?.map((player) => (
    //           <Combobox.Option
    //             className={({ active }) =>
    //               `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
    //               }`
    //             }
    //             key={player.id}
    //             value={player}
    //           >
    //             {player.nickname} - {player.name}
    //           </Combobox.Option>
    //         ))}
    //       </Combobox.Options>
    //     </div>
    //   </Transition>
    // </Combobox>
  );
}
