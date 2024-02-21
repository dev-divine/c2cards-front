import { Format } from '@app/utils/format'
import { DoubleLine } from '@views/components/double-line'
import { GoBack } from '@views/components/go-back'
import { Pagination } from '@views/components/pagination'

export function ScheduleReceipt() {
  const receivablesSchedules = [
    {
      company_name: 'C2 Cards',
      company_document: '12345678901',
      company_email: 'contato@empresaexemplo1.com',
      acquirer: 'Credenciadora Exemplo',
      responsible_name: 'Responsável Exemplo',
      responsible_email: 'responsavel@empresaexemplo1.com',
      responsible_phone: '11999999999',
      responsible_document: '98765432109',
      initial_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-31'),
      protocol_process: 'P2024020104486744',
      processing_date: new Date('2024-02-01').toISOString(),
      protocol_agenda: 'B3-2024020103825618',
      situation: 'Em processamento',
    },
  ]

  return (
    <>
      <GoBack title="agenda de recebíveis" />

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
                  Nome - CNPJ
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Representante - CPF
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Processamento
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Protocolos
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Situação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {receivablesSchedules.map((schedule) => (
                <tr key={schedule.protocol_process}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <DoubleLine title="" value={schedule.company_name} />
                    <DoubleLine
                      title=""
                      value={Format.document(schedule.company_document)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine title="" value={schedule.responsible_name} />
                    <DoubleLine
                      title=""
                      value={Format.document(schedule.responsible_document)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Data:"
                      value={Format.parseIso(schedule.processing_date)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Protocolo processo:"
                      value={schedule.protocol_process}
                    />
                    <DoubleLine
                      title="Protocolo agenda:"
                      value={schedule.protocol_agenda}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {schedule.situation}
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
