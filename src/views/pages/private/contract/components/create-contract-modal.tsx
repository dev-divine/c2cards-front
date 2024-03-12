import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef } from 'react'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'

import { Button } from '@views/components/button'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  hookForm: {
    errors: any
    control: any
    loading: boolean
    register: any
    setValue: any
    handleCreate: (event: React.FormEvent<HTMLFormElement>) => void
  }
}

export function CreateContractModal({ open, setOpen, hookForm }: Props) {
  const { errors, control, loading, register, handleCreate, setValue } =
    hookForm

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setValue('companyName', '')
    setValue('companyDocument', '')
    setValue('responsibleName', '')
    setValue('responsibleEmail', '')
    setValue('responsiblePhone', '')
    setValue('responsibleDocument', '')
    setValue('signatureDate', '')
    setValue('expirationDate', '')
  }, [setValue])

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-1.5">
                  <div className="flex items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-px sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-zinc-900"
                      >
                        Registrar contrato
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

                <form onSubmit={handleCreate} className="px-8 py-3">
                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Nome da empresa"
                      placeholder="Digite o nome da empresa"
                      error={errors.deptorContractName?.message}
                      {...register('deptorContractName')}
                    />

                    <InputDocument
                      id="company_document"
                      label="CNPJ da empresa"
                      placeholder="Digite o CNPJ da empresa"
                      maxLength={18}
                      control={control}
                      error={errors.debtorContractDocument?.message}
                      {...register('debtorContractDocument')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Nome do titular"
                      placeholder="Digite o nome do titular"
                      error={errors.holderName?.message}
                      {...register('holderName')}
                    />

                    <InputDocument
                      id="holder_document"
                      label="CPF/CNPJ do titular"
                      placeholder="Digite o CPF/CNPJ do titular"
                      maxLength={18}
                      control={control}
                      error={errors?.holderDocument?.message}
                      {...register('holderDocument')}
                    />
                  </div>

                  <Input
                    label="Tipo de contrato"
                    placeholder="Digite o tipo do contrato"
                    className="w-full max-w-3xl"
                    error={errors.contractEffectType?.message}
                    {...register('contractEffectType')}
                  />

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Saldo devedor ou limite"
                      placeholder="Digite o saldo devedor ou limite"
                      error={errors.outstandingBalanceOrLimit?.message}
                      {...register('outstandingBalanceOrLimit')}
                    />

                    <Input
                      label="Valor mínimo a ser mantido"
                      placeholder="Digite o valor mínimo a ser mantido"
                      error={errors.minimumValueToBeMaintained?.message}
                      {...register('minimumValueToBeMaintained')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Data inicial"
                      placeholder="DD/MM/AAAA"
                      error={errors.signatureDate?.message}
                      {...register('signatureDate')}
                    />

                    <Input
                      label="Data final"
                      placeholder="DD/MM/AAAA"
                      error={errors.expirationDate?.message}
                      {...register('expirationDate')}
                    />
                  </div>

                  <div className="-mx-8 mt-4 bg-gray-50 px-4 py-1.5 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      isLoading={loading}
                    >
                      Registrar
                    </Button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
