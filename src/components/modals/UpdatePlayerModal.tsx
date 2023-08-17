import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TValueUpdate } from '~/pages/players';
import { api } from '~/utils/api';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  fieldUpdate: TValueUpdate;
  refetchPlayers: () => void;
}
const schema = z.object({
  updateValue: z.string()
    .min(3, { message: 'Must be at least 3 characters long' })
    .max(30, { message: 'Must be at most 30 characters long' }),
});

type TForm = z.infer<typeof schema>;

export default function UpdatePlayerInfo({ isOpen, closeModal, fieldUpdate, refetchPlayers }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const editName = api.players.editName.useMutation({
    onSuccess: () => {
      refetchPlayers();
      reset();
      closeModal();
    }
  });

  const editNickname = api.players.editNickname.useMutation({
    onSuccess: () => {
      refetchPlayers();
      reset();
      closeModal();
    }
  });

  function onSubmit(data: TForm) {
    if (fieldUpdate.field === 'name') {
      if (editName.isLoading) return;
      editName.mutate({ playerId: fieldUpdate.playerId, name: data.updateValue });
    }
    if (fieldUpdate.field === 'nickname') {
      if (editNickname.isLoading) return;
      editNickname.mutate({ playerId: fieldUpdate.playerId, nickname: data.updateValue });
    }
  }

  function closeAndReset() {
    reset();
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAndReset}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update {fieldUpdate.field}
                  </Dialog.Title>
                  <form
                    action="submit"
                    onSubmit={handleSubmit((data) => onSubmit(data as TForm))}
                  >
                    <div className="mt-2">
                      <input
                        id='updateValue'
                        type='text'
                        inputMode='text'
                        className={`placeholder-gray-700 block py-2 px-4 w-full mt-1 text-sm font-normal leading-5 text-gray-700 border focus:gold-focus-ring ${errors?.updateValue ? 'border-orange-600 rounded-sm' : 'border-primary'}`}
                        placeholder={fieldUpdate.value}
                        {...register('updateValue')}
                      />
                      {errors?.updateValue && (
                        <p className='text-xs font-normal leading-4 text-orange-500'>
                          {errors?.updateValue?.message as string}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex gap-x-4">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-blue-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeAndReset}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
