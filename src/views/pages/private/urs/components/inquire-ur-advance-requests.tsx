import {
  BanknotesIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

import { Format } from '@app/utils/format'

import { Pagination } from '@views/components/pagination'

interface Props {
  setTabs: (tab: string) => void
}

export function InquireURAdvanceRequests({ setTabs }: Props) {
  const urs: string[] = []

  return (
    <>
      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Consultar antecipação de URs
        </h1>

        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  CPF/CNPJ
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Nome
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  E-mail
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Data de criação
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Ver URs
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {urs?.map((ur) => (
                <tr key={ur}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {ur === 'success' ? (
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
                    {Format.document(ur)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {ur}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {ur}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(ur)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => setTabs('inquire-ur-advance-requests')}
                    >
                      <BanknotesIcon className="w-6 text-dark-blue" />
                    </button>
                    <button>
                      <ClipboardDocumentListIcon className="ml-1 w-6 text-dark-blue" />
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
