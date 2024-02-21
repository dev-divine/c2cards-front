import { Format } from '@app/utils/format'
import {
  ArrowDownOnSquareIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { Pagination } from '@views/components/pagination'
import { useNavigate } from 'react-router-dom'

interface Props {
  setType: (value: string) => void
  setOpenRequestAgendaModal: (value: boolean) => void
}

export function Schedule({ setType, setOpenRequestAgendaModal }: Props) {
  const navigate = useNavigate()

  const receivablesSchedules = [
    {
      status: 'success',
      document: '12345678900',
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      created_at: new Date('2023-05-19').toISOString(),
    },
    {
      status: 'error',
      document: '12345678900',
      name: 'Lindsay Walton Paula',
      email: 'lindsay.walton@example.com',
      created_at: new Date('2023-01-15').toISOString(),
    },
  ]

  return (
    <>
      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Consultar agenda de recebíveis
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
                  Nome
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
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {receivablesSchedules.map((schedules) => (
                <tr key={schedules.email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {schedules.status === 'success' ? (
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
                    {Format.document(schedules.document)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.name(schedules.name)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {schedules.email}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(schedules?.created_at)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => setOpenRequestAgendaModal(true)}
                    >
                      <ArrowDownOnSquareIcon className="w-7 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('schedule-report')}
                    >
                      <EyeIcon className="ml-1 w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/schedule_receipt')}
                    >
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
