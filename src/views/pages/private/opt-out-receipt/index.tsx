/* eslint-disable react-hooks/exhaustive-deps */
import { useNotification } from '@app/hooks/use-notification'
import { usePagination } from '@app/hooks/use-pagination'
import { httpClient } from '@app/services/http-client'
import { Format } from '@app/utils/format'
import { DoubleLine } from '@views/components/double-line'
import { GoBack } from '@views/components/go-back'
import { Pagination } from '@views/components/pagination'
import { useEffect, useState } from 'react'

interface IOptOut {
  id: string
  ecClientName: string
  ecClientDocument: string
  externalCode: string
  c2cardsDocument: string
  responsibleName: string
  responsibleDocument: string
  responsibleEmail: string
  responsibleWhatsapp: string
  protocol: string
  createdAt: string
}

export function OptOutReceipt() {
  const { errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [loading, setLoading] = useState(true)
  const [optOuts, setOptOuts] = useState<IOptOut[]>([])

  async function loadOptOuts() {
    setLoading(true)
    try {
      const { data } = await httpClient.get(`/opt-out`)
      setOptOuts(data.optOuts)
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
    loadOptOuts()
  }, [currentPage])

  return (
    <>
      <GoBack title="Opt-ins" />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Consultar comprovantes Opt-outs
        </h1>

        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  <p className="whitespace-nowrap">Nome da empresa</p>
                  <p className="whitespace-nowrap">CPF/CNPJ</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Protoclo C2 CARDS</p>
                  <p className="whitespace-nowrap">Protoclo B3</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Data de inativação</p>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {optOuts.map((optOut: IOptOut) => (
                <tr key={optOut.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <DoubleLine
                      title="Nome da empresa:"
                      value={optOut.ecClientName}
                    />

                    <DoubleLine
                      title="CPF/CNPJ:"
                      value={Format.document(optOut.ecClientDocument)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Protocolo C2 CARDS:"
                      value={optOut.externalCode}
                    />

                    <DoubleLine
                      title="Protocolo C2 CARDS:"
                      value={optOut.protocol}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-600 font-normal">
                      {Format.parseIso(optOut.createdAt)}
                    </p>
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
