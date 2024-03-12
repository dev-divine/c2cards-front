/* eslint-disable react-hooks/exhaustive-deps */
import {
  CheckCircleIcon,
  DocumentMinusIcon,
  DocumentPlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodStringParser } from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'

import { Pagination } from '@views/components/pagination'
import { SelectProps } from '@views/components/select-filters'

import { useNotification } from '@app/hooks/use-notification'
import { usePagination } from '@app/hooks/use-pagination'
import { httpClient } from '@app/services/http-client'
import { PlusIcon } from '@radix-ui/react-icons'
import { Filter } from '@views/pages/private/opt-in/components/filter'
import { OptInModal } from '@views/pages/private/opt-in/components/opt-in-modal'
import { useNavigate } from 'react-router-dom'
import { OptOutModal } from './components/opt-out-modal'

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
    .length(18, 'O CNPJ deve ter 14 caracteres.'),
  responsibleName: z
    .string(zodStringParser('nome do responsável'))
    .min(1, { message: 'O nome do responsável é obrigatório.' }),
  responsibleEmail: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsiblePhone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone do representante é obrigatório.'),
  responsibleDocument: z
    .string(zodStringParser('CPF do responsável'))
    .min(1, 'O CPF do responsável é obrigatório.'),
  activationDate: z
    .string(zodStringParser('data de ativação'))
    .min(1, 'A data de ativação é obrigatória.')
    .default(new Date().toISOString()),
  expirationDate: z
    .string(zodStringParser('data de expiração'))
    .min(1, { message: 'A data de expiração é obrigatória.' })
    .default(
      new Date(
        new Date().setFullYear(new Date().getFullYear() + 2),
      ).toISOString(),
    ),
})

type FormData = z.infer<typeof schema>

export function OptIn() {
  const { successToast, errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  const navigate = useNavigate()

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
  const [openOptInModal, setOpenOptInModal] = useState(false)
  const [openOptOutModal, setOpenOptOutModal] = useState(false)
  const [optIns, setOptIns] = useState<IOptIn[]>([])
  const [optIn, setOptIn] = useState<IOptIn>({} as IOptIn)

  const handleCreate = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      const response = await httpClient.post('/opt-in', {
        ...data,
        companyDocument: data.companyDocument.replace(/\D/g, ''),
        responsibleDocument: data.responsibleDocument.replace(/\D/g, ''),
        responsiblePhone: data.responsiblePhone.replace(/[^\d+]/g, ''),
        financialAgentDocument: data.responsibleDocument?.replace(/\D/g, ''),
        activationDate: Format.parseIsoBack(data.activationDate),
        signatureDate: Format.parseIsoBack(data.activationDate),
        expirationDate: Format.formatIso(data.expirationDate),
      })
      console.log(response.status)

      setOpenOptInModal(false)

      successToast({
        title: `Opt-in ${1} cadastrado com sucesso!`,
        message: 'O opt-in foi cadastrado no sistema com sucesso.',
      })

      await loadOptIns()
    } catch (error) {
      errorToast({
        title: 'Erro ao cadastrar opt-in!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  })

  async function loadOptIns() {
    try {
      const { data } = await httpClient.get(`/opt-in`)
      setOptIns(data.optIns)
      setTotalPages(data.totalPages)
    } catch (error) {
      errorToast({
        title: 'Erro ao carregar as Opt-ins!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOptIns()
  }, [currentPage])

  return (
    <>
      <OptInModal
        open={openOptInModal}
        setOpen={setOpenOptInModal}
        hookForm={{
          errors,
          control,
          loading,
          register,
          handleCreate,
          setValue,
        }}
      />

      <OptOutModal
        open={openOptOutModal}
        setOpen={setOpenOptOutModal}
        optIn={optIn}
        loadOptIns={loadOptIns}
      />

      <Filter filter={filter} setFilter={setFilter} />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-blue">
            Registrar OPT-In
          </h1>

          <button
            type="button"
            className="rounded bg-green-base p-3 shadow"
            onClick={() => setOpenOptInModal(true)}
          >
            <PlusIcon className="w-7 h-7 text-white" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="w-[10%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  NOME DA EMPRESA
                </th>
                <th
                  scope="col"
                  className="w-[12%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  CPF/CNPJ
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  E-MAIL
                </th>
                <th
                  scope="col"
                  className="w-[18%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  DATA DE CRIAÇÃO
                </th>
                <th
                  scope="col"
                  className="w-[18%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  DATA DE EXPIRAÇÃO
                </th>
                <th
                  scope="col"
                  className="w-[10%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {optIns.map((optIn: IOptIn) => (
                <tr key={optIn.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {optIn.isActive ? (
                      <CheckCircleIcon
                        className="w-7 text-green-hover"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <XCircleIcon
                        className="w-7 text-red-400"
                        strokeWidth={1.5}
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {optIn.ecClientName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.document(optIn.ecClientDocument)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {optIn.responsibleEmail}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(optIn.activationDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(optIn.expirationDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setOptIn(optIn)
                        setOpenOptOutModal(true)
                      }}
                    >
                      <TrashIcon className="w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate('/opt_in_receipt', { state: optIns })
                      }
                    >
                      <DocumentPlusIcon className="w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/opt_out_receipt')}
                    >
                      <DocumentMinusIcon className="ml-1 w-6 text-dark-blue" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination />
    </>
  )
}
