import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Format } from '@app/utils/format'

import { Input } from '@views/components/input'
import { useAuth } from '@app/hooks/use-auth'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ShowClientModal({ open, setOpen }: Props) {
  const { user } = useAuth()

  const cancelButtonRef = useRef(null)

  // useEffect(() => {
  //   setValue('name', item?.name)
  //   setValue('document', item?.document)
  //   setValue('email', user?.email)
  //   setValue('phone', Format.phone(user?.phone ?? ''))
  //   setValue('whatsapp', Format.phone(user?.whatsapp ?? ''))
  //   setValue('job', user?.job)
  //   setValue('role', user?.role)
  //   setValue('accessLevel', user?.accessLevel)
  // }, [item, setValue])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto lg:ml-36">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-px sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-zinc-900"
                      >
                        Dados do usuário
                      </Dialog.Title>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-gray-50 p-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon
                      className="h-7 w-7 text-red-500"
                      aria-hidden="true"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                <div className="px-8 py-3">
                  <Input
                    name="name"
                    label="Nome"
                    defaultValue={user.name}
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="document"
                    label="CPF"
                    defaultValue={Format.document(user.document ?? '')}
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="email"
                    label="E-mail"
                    defaultValue={user.email}
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <div className="flex gap-3">
                    <Input
                      name="phone"
                      label="Telefone"
                      defaultValue={Format.phone(user.phone ?? '')}
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="whatsapp"
                      label="WhatsApp"
                      defaultValue={Format.phone(user.whatsapp ?? '')}
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="job"
                      label="Cargo"
                      defaultValue={user.job}
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="accessLevel"
                      label="Nivél de acesso"
                      defaultValue={user.accessLevel}
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <Input
                    name="role"
                    label="Permissões"
                    defaultValue={user.role}
                    className="pointer-events-none mb-1 max-w-lg"
                    disabled
                  />

                  <div className="-mx-8 mt-4 bg-gray-50 px-4 pb-2 pt-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      form="create-form"
                      className="inline-flex w-full justify-center rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Retornar
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
