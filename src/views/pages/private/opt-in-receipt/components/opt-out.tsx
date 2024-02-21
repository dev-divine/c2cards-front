import { Format } from '@app/utils/format'
import { Pagination } from '@views/components/pagination'

export function OptOutReceipt() {
  const userName = 'Cesar Galvão'
  const totalCompleted = 2

  const optOut = [
    {
      company_name: 'Vini Cell',
      cpf: '23850275850',
      processing_date: '2024-02-01T16:33:40.111-03:00',
      c2_cards_protocol: '23850FS8LECKQAZ',
      process_protocol: 'P2024020107930312',
      b3_protocol: 'B3-2024020108150396',
    },
    {
      company_name: 'Vini Cell',
      cpf: '23850275850',
      processing_date: '2024-02-01T16:33:40.111-03:00',
      c2_cards_protocol: '23850FS8LECKQAZ',
      process_protocol: 'P2024020107930312',
      b3_protocol: 'B3-2024020108150396',
    },
  ]

  return (
    <>
      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Comprovantes opt-out: {userName}
        </h1>
        <h3 className="mb-4 text-lg font-medium text-dark-blue">
          Total realizados: {totalCompleted}
        </h3>
        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Empresa - CPF/CNPJ
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
                  Número do processo
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Protocolos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {optOut.map((optout) => (
                <tr key={optout.b3_protocol}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-dark-blue sm:pl-6">
                    <p>{Format.name(optout.company_name)}</p>
                    <p>{Format.document(optout.cpf)}</p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Data:
                      </span>
                      {Format.parseIso(optout.processing_date)}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {optout.process_protocol}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Protocolo B3:
                      </span>
                      {optout.b3_protocol}
                    </p>
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Protocolo C2 Cards:
                      </span>
                      {optout.c2_cards_protocol}
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
