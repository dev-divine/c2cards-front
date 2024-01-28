import { Fragment, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  ClipboardDocumentIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/solid'

import { useNotification } from '@app/hooks/notification'

import { Input } from '@views/components/input'
import { useCitizenController } from '@views/pages/private/citizen/use-citizen-controller'

export function Citizen() {
  const { showNotification, hidden } = useNotification()

  const citizens = [
    {
      name: 'João da Silva',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      email: 'joao@mail.com',
    },
  ]

  const { open, setOpen, register, errors, handleSubmit } =
    useCitizenController()

  const cancelButtonRef = useRef(null)

  return (
    <div className="">
      <div className="sm:flex sm:items-end">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Munícipes
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Cadastre munícipes para enviar informações.
          </p>
        </div>
        <div className="mt-4 flex justify-end sm:mx-0 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block max-h-10 rounded-md bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={() => setOpen(true)}
          >
            Cadastrar
          </button>
        </div>
      </div>
      <div className="mx-4 mt-8 flow-root sm:mx-0">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CPF
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Telefone
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {citizens.map((citizen) => (
                    <tr key={citizen.cpf}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {citizen.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {citizen.cpf}
                      </td>
                      <td className="flex gap-2 whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {citizen.phone}{' '}
                        <CopyToClipboard
                          text={citizen.email}
                          onCopy={() => {
                            showNotification({
                              type: 'success',
                              title: 'Copiado',
                              message: 'Chave copiada com sucesso',
                            })

                            setTimeout(() => {
                              hidden()
                            }, 1000)
                          }}
                        >
                          <ClipboardDocumentIcon className="text-cyan w-5 cursor-pointer" />
                        </CopyToClipboard>
                      </td>

                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex h-full items-center justify-end">
                          <PencilIcon className="ml-6 w-6 cursor-pointer text-primary" />

                          <TrashIcon className="ml-6 w-6 cursor-pointer text-red-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
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

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <UserIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Novo munícipe
                        </Dialog.Title>
                        <div className="mt-2 space-y-3 pb-4 text-left">
                          <Input
                            label="Nome:"
                            placeholder="Digite o nome completo"
                            error={errors.name?.message}
                            {...register('name')}
                          />

                          <Input
                            label="CPF:"
                            placeholder="123.456.789-00"
                            type="tel"
                            error={errors.cpf?.message}
                            {...register('cpf')}
                          />

                          <Input
                            label="Telefone:"
                            placeholder="+55 (99) 99999-9999"
                            type="tel"
                            error={errors.phone?.message}
                            {...register('phone')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                      >
                        Cadastrar
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </form>
    </div>
  )
}
