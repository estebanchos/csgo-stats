import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { type RouterOutputs, api } from '~/utils/api';

type TMap = RouterOutputs['maps']['getAll'][0];

interface IProps {
  selected: TMap | {};
  setSelected: (map: TMap | {}) => void;
  isDisabled?: boolean;
}

export default function MapSearchbox({ selected, setSelected, isDisabled = false }: IProps) {
  const [query, setQuery] = useState('');
  const { data: maps, isLoading } = api.maps.getAll.useQuery();

  const filteredMaps =
    query === ''
      ? maps
      : maps?.filter((map) =>
          map.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (isLoading) return <span>...</span>;

  return (
    <Combobox value={selected} onChange={setSelected} disabled={isDisabled}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-md border bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            id='map'
            className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
            displayValue={(map: TMap) => map.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredMaps?.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              filteredMaps?.map((map) => (
                <Combobox.Option
                  key={map.id}
                  className={({ selected, active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 
                      ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}
                      ${selected ? 'bg-teal-100 font-medium text-gray-900' : 'font-normal'}
                      `
                  }
                  value={map}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {map.name} - {map.isDefusal ? 'Defusal' : 'Hostage'}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
