import { Format } from '@app/utils/format'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export function OptInReceipt() {
  const optIn = [
    {
      company_name: 'Cesar Galvão',
      cpf: '29860877874',
      signature_date: '18/07/2023',
      expiration_date: '31/12/2023',
      process_protocol: 'P2023071800233272',
      b3_protocol: 'B3-2023071800245451',
      c2_cards_protocol: '298603434TFPDRR',
      optin_active: 'no',
    },
    {
      company_name: 'Cesar Galvão',
      cpf: '29860877874',
      signature_date: '18/07/2023',
      expiration_date: '31/12/2023',
      process_protocol: 'P2023071800233272',
      b3_protocol: 'B3-2023071800245451',
      c2_cards_protocol: '298603434TFPDRR',
      optin_active: 'no',
    },
  ]

  const userName = 'Cesar Galvão'
  const totalCompleted = 2

  return (
    <>
      <div className="flex-1 rounded bg-white px-5 pb-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Comprovantes opt-in: {userName}
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
                  Duração
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {optIn.map((optin) => (
                <tr key={optin.b3_protocol}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-dark-blue sm:pl-6">
                    <p>{optin.company_name}</p>
                    <p>{Format.document(optin.cpf)}</p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Data assinatura:
                      </span>
                      {optin.signature_date}
                    </p>
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Data Expiração:
                      </span>
                      {optin.expiration_date}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Protocolo C2 Cards:
                      </span>
                      {optin.c2_cards_protocol}
                    </p>
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Protocolo B3:
                      </span>
                      {optin.b3_protocol}
                    </p>
                    <p>
                      <span className="mr-1 font-medium text-dark-blue">
                        Protocolo processo:
                      </span>
                      {optin.process_protocol}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {optin.optin_active === 'active' ? (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
