/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodNumberParser, zodStringParser } from '@app/utils/custom-zod-error'
import { Format } from '@app/utils/format'

import { PlusIcon } from '@radix-ui/react-icons'

import { DoubleLine } from '@views/components/double-line'
import { useNotification } from '@app/hooks/use-notification'
import { usePagination } from '@app/hooks/use-pagination'
import { httpClient } from '@app/services/http-client'
import { CreateContractModal } from './components/create-contract-modal'
import { EditContractModal } from './components/edit-contract-modal'

interface IContract {
  id: string
  externalCode: string
  contractIdentifier: string
  deptorContractName?: string | undefined
  holderName?: string | undefined
  contractStatus?: string
  debtorContractDocument: string
  participantCnpj: string
  holderDocument: string
  contractEffectType: string
  outstandingBalanceOrLimit: number
  minimumValueToBeMaintained: number
  signatureDate: string
  expirationDate: string
  divisionRule: number
  createdAt: Date
}

const schema = z.object({
  contractIdentifier: z
    .string(zodStringParser('identificador do contrato'))
    .optional(),
  contractStatus: z.boolean().optional(),
  contractEffectType: z
    .string(zodStringParser('tipo de efeito do contrato'))
    .min(1, { message: 'O tipo de efeito do contrato é obrigatório.' }),
  deptorContractName: z.string(
    zodStringParser('nome do estabelecimento comercial'),
  ),
  debtorContractDocument: z.string(
    zodStringParser('documento do estabelecimento comercial'),
  ),
  holderName: z
    .string(zodStringParser('nome do titular'))
    .min(1, { message: 'O nome do titular é obrigatório.' }),
  holderDocument: z.string(zodStringParser('documento do titular')),
  outstandingBalanceOrLimit: z.coerce.number(
    zodNumberParser('saldo devedor ou limite'),
  ),
  minimumValueToBeMaintained: z.coerce.number(
    zodNumberParser('valor mínimo a ser mantido'),
  ),
  signatureDate: z
    .string(zodStringParser('data de assinatura'))
    .min(1, { message: 'A data de assinatura é obrigatória.' }),
  expirationDate: z
    .string(zodStringParser('data de expiração'))
    .min(1, { message: 'A data de expiração é obrigatória.' }),
})

type FormData = z.infer<typeof schema>

export function Contracts() {
  const { successToast, errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [loading, setLoading] = useState(false)
  const [openContractModal, setOpenContractModal] = useState(true)
  const [contracts, setContracts] = useState<IContract[]>([])
  const [contract, setContract] = useState({} as IContract)
  const [openEditContractModal, setOpenEditContractModal] = useState(false)

  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleCreate = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      const response = await httpClient.post('/contract', {
        ...data,
        debtorContractDocument: data.debtorContractDocument.replace(/\D/g, ''),
        holderDocument: data.holderDocument.replace(/\D/g, ''),
        signatureDate: data.signatureDate.split('/').reverse().join('-'),
        expirationDate: data.expirationDate.split('/').reverse().join('-'),
      })

      setOpenContractModal(false)

      successToast({
        title: 'Contrato cadastrado com sucesso!',
        message: 'O contrato foi cadastrado no sistema com sucesso.',
      })

      await loadContracts()
    } catch (error) {
      errorToast({
        title: 'Erro ao cadastrar opt-in!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  })

  async function loadContracts() {
    try {
      const { data } = await httpClient.get('/contract/list')
      setContracts(data.contracts)
      setTotalPages(data.totalPages)
    } catch (error) {
      errorToast({
        title: 'Erro ao carregar os contratos!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContracts()
  }, [currentPage])

  return (
    <>
      <CreateContractModal
        open={openContractModal}
        setOpen={setOpenContractModal}
        hookForm={{
          errors,
          control,
          loading,
          register,
          handleCreate,
          setValue,
        }}
      />

      <EditContractModal
        open={openEditContractModal}
        setOpen={setOpenEditContractModal}
        contract={contract}
        loadContracts={loadContracts}
      />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-blue">
            Registrar Contrato
          </h1>

          <button
            type="button"
            className="rounded bg-green-base p-3 shadow"
            onClick={() => setOpenContractModal(true)}
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6 pl-4"
                >
                  <p className="whitespace-nowrap">Status</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Nome da empresa</p>
                  <p className="whitespace-nowrap">CNPJ da empresa</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="truncate">Tipo de contrato</p>
                  <p className="truncate">Documento do titular</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="truncate">Saldo devedor ou limite</p>
                  <p className="truncate">Valor mínimo a ser mantido</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="truncate">Data de Assinatura</p>
                  <p className="truncate">Data de Expiração</p>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {contracts.map((contract: IContract) => (
                <tr key={contract.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contract.contractStatus === 'Ativo' ? (
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

                  <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                    <DoubleLine
                      title="Nome da empresa"
                      value={contract.deptorContractName ?? ''}
                    />

                    <DoubleLine
                      title="CNPJ da empresa:"
                      value={Format.document(
                        contract.debtorContractDocument ?? '',
                      )}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Tipo de contrato:"
                      value={contract.contractEffectType}
                    />

                    <DoubleLine
                      title="CNPJ do titular:"
                      value={Format.document(contract.holderDocument ?? '')}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Saldo devedor ou limite:"
                      value={Format.currency(
                        contract.outstandingBalanceOrLimit,
                      )}
                    />

                    <DoubleLine
                      title="Valor mínimo a ser mantido:"
                      value={Format.currency(
                        contract.minimumValueToBeMaintained,
                      )}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Data de assinatura:"
                      value={Format.parseIso(contract.signatureDate)}
                    />

                    <DoubleLine
                      title="Data de expiração:"
                      value={Format.parseIso(contract.expirationDate)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
