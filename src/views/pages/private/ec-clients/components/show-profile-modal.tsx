import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Format } from '@app/utils/format'

import { Input } from '@views/components/input'

import {
  IECClient,
  useEcClientsController,
} from '@views/pages/private/ec-clients/use-ec-clients-controller'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  item: IECClient
}

export function ShowClientModal({ open, setOpen, item }: Props) {
  const { setValue } = useEcClientsController()

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setValue('profile', item?.profile)
    setValue('company_name', item?.company_name)
    setValue('company_document', Format.document(item?.company_document ?? ''))
    // setValue('user', Format.name(item.user)) // Quando implementar auth
    setValue('company_email', item?.company_email)
    setValue(
      'responsible_whatsapp',
      Format.phone(item?.responsible_whatsapp ?? ''),
    )
    // setValue('com', Format.phone(item?.responsible_whatsapp))
    setValue(
      'responsible_city',
      `${item?.responsible_city} - ${item?.responsible_state}`,
    ) // Criar format de UF
    setValue('responsible_zip_code', item?.responsible_zip_code) // Adicionar format zipcode
    setValue('responsible_neighborhood', item?.responsible_neighborhood)
    setValue(
      'responsible_street',
      `${item?.responsible_street} - nº ${item?.responsible_number}`,
    )
  }, [item, setValue])

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
                        Dados da empresa - (E.C)
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
                    name="profile"
                    label="Perfil"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="company_name"
                    label="Empresa"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="company_document"
                    label="CPF/CNPJ"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <div className="flex gap-3">
                    <Input
                      name="user"
                      label="Usuário"
                      className="mb-1 max-w-lg"
                      value={Format.name('Bruno')} // Quando implementar auth
                      disabled
                    />

                    <Input
                      name="company_email"
                      label="E-mail"
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="responsible_phone"
                      label="Telefone"
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="responsible_whatsapp"
                      label="WhatsApp"
                      className="pointer-events-none mb-1 max-w-lg"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="responsible_zip_code"
                      label="CEP"
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="responsible_city"
                      label="Cidade - UF"
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <Input
                    name="responsible_neighborhood"
                    label="Bairro"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="responsible_street"
                    label="Endereço"
                    className="mb-1 max-w-lg"
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
