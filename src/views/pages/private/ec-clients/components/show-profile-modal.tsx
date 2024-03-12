import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

// import { useAuth } from '@app/hooks/use-auth'
import { Format } from '@app/utils/format'

import { Input } from '@views/components/input'
import { useAuth } from '@app/hooks/use-auth'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  hookForm: any
}

export function ShowClientModal({ open, setOpen, hookForm }: Props) {
  const { user } = useAuth()

  const { item, setValue } = hookForm

  const cancelButtonRef = useRef(null)

  console.log(item.responsibleNeighborhood)

  useEffect(() => {
    setValue('companyDocument', Format.document(item?.companyDocument ?? ''))
    // setValue('user', user.name) // Quando implementar auth
    setValue('companyEmail', item?.companyEmail)
    setValue(
      'responsibleWhatsapp',
      Format.phone(item?.responsibleWhatsapp ?? ''),
    )
    setValue(
      'responsibleWhatsapp',
      Format.phone(item?.responsibleWhatsapp ?? ''),
    )
    setValue(
      'responsibleCity',
      `${item?.responsibleCity} - ${item?.responsibleState}`,
    ) // Criar format de UF
    setValue('responsibleZipCode', item?.responsibleZipCode) // Adicionar format zipcode
    setValue('responsibleNeighborhood', item?.responsibleNeighborhood)
    setValue(
      'responsibleStreet',
      `${item?.responsibleStreet} - nº ${item?.responsibleNumber}`,
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
                    defaultValue={'Cliente (Estabelecimento Comercial)'}
                    label="Perfil"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="companyName"
                    defaultValue={item?.companyName}
                    label="Empresa"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="companyDocument"
                    defaultValue={item?.companyDocument}
                    label="CPF/CNPJ"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <div className="py-4 sm:mt-px">
                    <h3 className="text-base font-semibold leading-6 text-zinc-900">
                      Dados do representante - (E.C)
                    </h3>
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="user"
                      defaultValue={JSON.stringify(user.name)
                        .replace(`"`, ``)
                        .replace(`"`, ``)}
                      label="Usuário"
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="companyEmail"
                      defaultValue={item?.companyEmail}
                      label="E-mail"
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="responsiblePhone"
                      defaultValue={Format.phone(item?.responsiblePhone ?? '')}
                      label="Telefone"
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="responsibleWhatsapp"
                      defaultValue={Format.phone(
                        item?.responsibleWhatsapp ?? '',
                      )}
                      label="WhatsApp"
                      className="pointer-events-none mb-1 max-w-lg"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="responsibleZipCode"
                      defaultValue={item?.responsibleZipCode}
                      label="CEP"
                      className="mb-1 max-w-lg"
                      disabled
                    />

                    <Input
                      name="responsibleCity"
                      defaultValue={`${item?.responsibleCity} - ${item?.responsibleState}`}
                      label="Cidade - UF"
                      className="mb-1 max-w-lg"
                      disabled
                    />
                  </div>

                  <Input
                    name="responsibleNeighborhood"
                    defaultValue={item?.responsibleNeighborhood}
                    label="Bairro"
                    className="mb-1 max-w-lg"
                    disabled
                  />

                  <Input
                    name="responsibleStreet"
                    defaultValue={`${item?.responsibleStreet} - nº ${item?.responsibleNumber}`}
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
