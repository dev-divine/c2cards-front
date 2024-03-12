import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef } from 'react'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'

import { Button } from '@views/components/button'
import { Format } from '@app/utils/format'
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  hookForm: {
    item: any
    errors: any
    control: any
    loading: boolean
    register: any
    setValue: any
    handleEdit: (event: React.FormEvent<HTMLFormElement>) => void
  }
}

export function EditModal({ open, setOpen, hookForm }: Props) {
  const { errors, control, loading, register, handleEdit, setValue, item } =
    hookForm

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setValue('companyName', item?.companyName ?? '')
    setValue('companyDocument', item?.companyDocument ?? '')
    setValue('companyPhone', Format.phone(item?.companyPhone ?? ''))
    setValue('companyWhatsApp', Format.phone(item?.companyWhatsApp ?? ''))
    setValue('companyEmail', item?.companyEmail ?? '')
    setValue('companyZipCode', item?.companyZipCode ?? '')
    setValue('companyState', item?.companyState ?? '')
    setValue('companyCity', item?.companyCity ?? '')
    setValue('companyNeighborhood', item?.companyNeighborhood ?? '')
    setValue('companyStreet', item?.companyStreet ?? '')
    setValue('companyNumber', item?.companyNumber ?? '')
    setValue('companyComplement', item?.companyComplement ?? '')
    setValue('responsibleName', item?.responsibleName ?? '')
    setValue('responsibleEmail', item?.responsibleEmail ?? '')
    setValue('responsiblePhone', Format.phone(item?.responsiblePhone ?? ''))
    setValue(
      'responsibleWhatsapp',
      Format.phone(item?.responsibleWhatsapp ?? ''),
    )
    setValue('responsibleDocument', item?.responsibleDocument ?? '')
    setValue('responsibleZipCode', item?.responsibleZipCode ?? '')
    setValue('responsibleState', item?.responsibleState ?? '')
    setValue('responsibleCity', item?.responsibleCity ?? '')
    setValue('responsibleNeighborhood', item?.responsibleNeighborhood ?? '')
    setValue('responsibleStreet', item?.responsibleStreet ?? '')
    setValue('responsibleNumber', item?.responsibleNumber ?? '')
    setValue('responsibleComplement', item?.responsibleComplement ?? '')
  }, [setValue, item])

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

        <div className="fixed inset-0 z-10 ml-36 w-screen overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                  <div className="flex items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-px sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-zinc-900"
                      >
                        Editar estabelecimento comercial - (E.C)
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

                <form onSubmit={handleEdit} className="px-8 py-3">
                  <p className="mb-1 text-center font-medium text-zinc-900">
                    Dados da empresa
                  </p>
                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Empresa"
                      placeholder="Digite o nome"
                      error={errors.companyName?.message}
                      {...register('companyName')}
                    />
                    <InputDocument
                      id="company_document_edit"
                      label="CNPJ"
                      placeholder="Digite o CNPJ"
                      control={control}
                      error={errors.companyDocument?.message}
                      {...register('companyDocument')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="E-mail"
                      placeholder="Digite o e-mail"
                      error={errors.companyEmail?.message}
                      {...register('companyEmail')}
                    />

                    <InputPhone
                      label="Telefone"
                      placeholder="Digite o telefone"
                      mask="+55 (99) 9999-9999"
                      error={errors.companyPhone?.message}
                      {...register('companyPhone')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <InputPhone
                      label="WhatsApp"
                      placeholder="Digite o WhatsApp"
                      mask="+55 (99) 99999-9999"
                      error={errors.companyWhatsApp?.message}
                      {...register('companyWhatsApp')}
                    />

                    <Input
                      label="CEP"
                      placeholder="Digite o CEP"
                      error={errors.companyZipCode?.message}
                      {...register('companyZipCode')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Estado"
                      placeholder="Digite o estado"
                      error={errors.companyState?.message}
                      {...register('companyState')}
                    />

                    <Input
                      label="Cidade"
                      placeholder="Digite a cidade"
                      error={errors.companyCity?.message}
                      {...register('companyCity')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Bairro"
                      placeholder="Digite o bairro"
                      error={errors.companyNeighborhood?.message}
                      {...register('companyNeighborhood')}
                    />

                    <Input
                      label="Rua"
                      placeholder="Digite a rua"
                      error={errors.companyStreet?.message}
                      {...register('companyStreet')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Número"
                      placeholder="Digite o número"
                      error={errors.companyNumber?.message}
                      {...register('companyNumber')}
                    />

                    <Input
                      label="Complemento (opcional)"
                      placeholder="Digite o complemento"
                      error={errors.companyComplement?.message}
                      {...register('companyComplement')}
                    />
                  </div>

                  <div className="mb-2 mt-4 h-px w-full bg-zinc-300" />

                  <p className="mb-2 text-center font-medium text-zinc-900">
                    Dados do representante
                  </p>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Nome"
                      placeholder="Digite o nome"
                      error={errors.responsibleName?.message}
                      {...register('responsibleName')}
                    />

                    <InputDocument
                      id="responsible_document"
                      label="CPF"
                      placeholder="Digite o CPF"
                      maxLength={14}
                      control={control}
                      error={errors.responsibleDocument?.message}
                      {...register('responsibleDocument')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="E-mail"
                      placeholder="Digite o e-mail"
                      error={errors.responsibleEmail?.message}
                      {...register('responsibleEmail')}
                    />

                    <InputPhone
                      label="WhatsApp"
                      placeholder="Digite o WhatsApp"
                      mask="+55 (99) 99999-9999"
                      error={errors.responsibleWhatsapp?.message}
                      {...register('responsibleWhatsapp')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="CEP"
                      placeholder="Digite o CEP"
                      error={errors.responsibleZipCode?.message}
                      {...register('responsibleZipCode')}
                    />

                    <Input
                      label="Estado"
                      placeholder="Digite o estado"
                      error={errors.responsibleState?.message}
                      {...register('responsibleState')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Cidade"
                      placeholder="Digite a cidade"
                      error={errors.responsibleCity?.message}
                      {...register('responsibleCity')}
                    />

                    <Input
                      label="Bairro"
                      placeholder="Digite o bairro"
                      error={errors.responsibleNeighborhood?.message}
                      {...register('responsibleNeighborhood')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Número"
                      placeholder="Digite o número"
                      error={errors.responsibleNumber?.message}
                      {...register('responsibleNumber')}
                    />

                    <Input
                      label="Complemento (opcional)"
                      placeholder="Digite o complemento"
                      error={errors.responsibleComplement?.message}
                      {...register('responsibleComplement')}
                    />
                  </div>

                  <div className="-mx-8 mt-4 bg-gray-50 px-4 pb-2 pt-6 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      isLoading={loading}
                    >
                      Salvar alterações
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
