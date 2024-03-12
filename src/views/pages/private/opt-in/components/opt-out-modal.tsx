/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@views/components/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodStringParser } from '@app/utils/custom-zod-error'

import { useNotification } from '@app/hooks/use-notification'
import { httpClient } from '@app/services/http-client'
import { InputPhone } from '@views/components/input-phone'

export interface IOptIn {
  id: string
  activationDate: string
  c2CardsDocument: string
  ecClientDocument: string
  ecClientName: string
  expirationDate: string
  externalCode: string
  financialAgentDocument: string
  protocol: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleName: string
  responsibleWhatsapp: string
  signatureDate: string
  isActive: boolean
  createdAt: string
}

const schema = z.object({
  companyName: z
    .string(zodStringParser('nome da empresa'))
    .min(1, { message: 'O nome da empresa é obrigatório.' }),
  companyDocument: z
    .string(zodStringParser('CPF/CNPJ'))
    .max(18, 'O CNPJ deve ter 14 caracteres.'),
  responsibleName: z
    .string(zodStringParser('nome do responsável'))
    .min(1, { message: 'O nome do responsável é obrigatório.' }),
  responsibleEmail: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsibleDocument: z.string(zodStringParser('CPF do responsável')),
  responsiblePhone: z.string(zodStringParser('telefone do responsável')),
  externalCode: z.string(zodStringParser('código externo')),
  b3Protocol: z.string(zodStringParser('protocolo')),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  optIn: IOptIn
  loadOptIns: () => Promise<void>
}

export function OptOutModal({ open, setOpen, optIn, loadOptIns }: Props) {
  const { successToast, errorToast, parseError } = useNotification()

  console.log(optIn)

  const cancelButtonRef = useRef(null)

  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const handleCreate = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      const response = await httpClient.put('/opt-out', {
        ...data,
        companyDocument: data.companyDocument.replace(/\D/g, ''),
        responsibleDocument: data.responsibleDocument.replace(/\D/g, ''),
        responsiblePhone: data.responsiblePhone.replace(/[^\d+]/g, ''),
      })

      console.log(response.data)

      setOpen(false)

      successToast({
        title: `Opt-in ${1} cadastrado com sucesso!`,
        message: 'O opt-in foi cadastrado no sistema com sucesso.',
      })

      await loadOptIns()
    } catch (error) {
      console.error(error)
      errorToast({
        title: 'Erro ao cadastrar opt-in!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  })

  useEffect(() => {
    setValue('companyName', optIn?.ecClientName)
    setValue('companyDocument', optIn?.ecClientDocument)
    setValue('responsibleName', optIn?.responsibleName)
    setValue('responsibleEmail', optIn?.responsibleEmail)
    setValue('responsibleDocument', optIn?.responsibleDocument)
    setValue('responsiblePhone', optIn?.responsibleWhatsapp)
    setValue('externalCode', optIn?.externalCode)
    setValue('b3Protocol', optIn?.protocol)
  }, [setValue, optIn])

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
                        Solicitar Opt-out
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
                      error={errors.companyName?.message}
                      {...register('companyName')}
                    />

                    <InputDocument
                      id="company_document"
                      label="CNPJ"
                      maxLength={18}
                      control={control}
                      error={errors.companyDocument?.message}
                      {...register('companyDocument')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Nome do representante"
                      error={errors.responsibleName?.message}
                      {...register('responsibleName')}
                    />

                    <Input
                      label="E-mail do representante"
                      error={errors.responsibleEmail?.message}
                      {...register('responsibleEmail')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <InputDocument
                      label="CPF do representante"
                      control={control}
                      error={errors.responsibleDocument?.message}
                      {...register('responsibleDocument')}
                    />

                    <InputPhone
                      label="Telefone do representante"
                      mask="(99) 99999-9999"
                      error={errors.responsiblePhone?.message}
                      {...register('responsiblePhone')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Código externo"
                      error={errors.externalCode?.message}
                      {...register('externalCode')}
                    />

                    <Input
                      label="Protocolo B3"
                      error={errors.b3Protocol?.message}
                      {...register('b3Protocol')}
                    />
                  </div>

                  <div className="-mx-8 mt-4 bg-gray-50 px-4 py-1.5 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      isLoading={loading}
                      onClick={handleCreate}
                    >
                      Solicitar
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
