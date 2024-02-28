import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { useNotification } from '@app/hooks/use-notification'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'

import {
  FormData,
  useEcClientsController,
} from '@views/pages/private/ec-clients/use-ec-clients-controller'
import { Button } from '@views/components/button'
import { httpClient } from '@app/services/http-client'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  item?: string
}

export function EditModal({ open, setOpen, item }: Props) {
  const { successToast, errorToast, parseError } = useNotification()

  const {
    errors,
    control,
    loading,
    register,
    handleSubmit,
    setLoading,
    loadECClients,
  } = useEcClientsController()

  const handleEdit = handleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      await httpClient.post(`/ec-client/${item}`, {
        ...data,
        company_document: data.company_document?.replace(/\D/g, ''),
        company_phone: data.company_phone?.replace(/[^\d+]/g, ''),
        company_whatsapp: data.company_whatsapp?.replace(/[^\d+]/g, ''),
        company_zip_code: data.company_zip_code?.replace(/[^0-9]/g, ''),
        responsible_document: data.responsible_document?.replace(/\D/g, ''),
        responsible_whatsapp: data.responsible_whatsapp?.replace(/[^\d+]/g, ''),
        responsible_zip_code: data.responsible_zip_code?.replace(/[^0-9]/g, ''),
      })

      setOpen(false)

      successToast({
        title: 'Cliente (E.C) editado com sucesso',
        message:
          'Os dados do estabelecimento comercial foram editados com sucesso no sistema.',
      })

      // await loadECClients()
    } catch (error) {
      errorToast({
        title: 'Erro ao editar estabelecimento comercial!',
        message: parseError(error).message,
        error,
      })
    } finally {
      setLoading(false)
    }
  })

  const cancelButtonRef = useRef(null)

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
                      error={errors.company_name?.message}
                      {...register('company_name')}
                    />
                    <InputDocument
                      id="company_document"
                      label="CNPJ"
                      placeholder="Digite o CNPJ"
                      control={control}
                      error={errors.company_document?.message}
                      {...register('company_document')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="E-mail"
                      placeholder="Digite o e-mail"
                      error={errors.company_email?.message}
                      {...register('company_email')}
                    />

                    <InputPhone
                      label="Telefone"
                      placeholder="Digite o telefone"
                      mask="+55 (99) 9999-9999"
                      error={errors.company_phone?.message}
                      {...register('company_phone')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <InputPhone
                      label="WhatsApp"
                      placeholder="Digite o WhatsApp"
                      mask="+55 (99) 99999-9999"
                      error={errors.company_whatsapp?.message}
                      {...register('company_whatsapp')}
                    />

                    <Input
                      label="CEP"
                      placeholder="Digite o CEP"
                      error={errors.company_zip_code?.message}
                      {...register('company_zip_code')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Estado"
                      placeholder="Digite o estado"
                      error={errors.company_state?.message}
                      {...register('company_state')}
                    />

                    <Input
                      label="Cidade"
                      placeholder="Digite a cidade"
                      error={errors.company_city?.message}
                      {...register('company_city')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Bairro"
                      placeholder="Digite o bairro"
                      error={errors.company_neighborhood?.message}
                      {...register('company_neighborhood')}
                    />

                    <Input
                      label="Rua"
                      placeholder="Digite a rua"
                      error={errors.company_street?.message}
                      {...register('company_street')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Número"
                      placeholder="Digite o número"
                      error={errors.company_number?.message}
                      {...register('company_number')}
                    />

                    <Input
                      label="Complemento (opcional)"
                      placeholder="Digite o complemento"
                      error={errors.company_complement?.message}
                      {...register('company_complement')}
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
                      error={errors.responsible_name?.message}
                      {...register('responsible_name')}
                    />

                    <InputDocument
                      id="responsible_document"
                      label="CPF"
                      placeholder="Digite o CPF"
                      maxLength={14}
                      control={control}
                      error={errors.responsible_document?.message}
                      {...register('responsible_document')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="E-mail"
                      placeholder="Digite o e-mail"
                      error={errors.responsible_email?.message}
                      {...register('responsible_email')}
                    />

                    <InputPhone
                      label="WhatsApp"
                      placeholder="Digite o WhatsApp"
                      mask="+55 (99) 99999-9999"
                      error={errors.responsible_whatsapp?.message}
                      {...register('responsible_whatsapp')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="CEP"
                      placeholder="Digite o CEP"
                      error={errors.responsible_zip_code?.message}
                      {...register('responsible_zip_code')}
                    />

                    <Input
                      label="Estado"
                      placeholder="Digite o estado"
                      error={errors.responsible_state?.message}
                      {...register('responsible_state')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Cidade"
                      placeholder="Digite a cidade"
                      error={errors.responsible_city?.message}
                      {...register('responsible_city')}
                    />

                    <Input
                      label="Bairro"
                      placeholder="Digite o bairro"
                      error={errors.responsible_neighborhood?.message}
                      {...register('responsible_neighborhood')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Número"
                      placeholder="Digite o número"
                      error={errors.responsible_number?.message}
                      {...register('responsible_number')}
                    />

                    <Input
                      label="Complemento (opcional)"
                      placeholder="Digite o complemento"
                      error={errors.responsible_complement?.message}
                      {...register('responsible_complement')}
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
