import { Format } from '@app/utils/format'
import { DoubleLine } from '@views/components/double-line'
import { GoBack } from '@views/components/go-back'
import { Pagination } from '@views/components/pagination'
import { useLocation } from 'react-router-dom'
import { IOptIn } from '../opt-in'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export function OptInReceipt() {
  const location = useLocation()

  const optInState: IOptIn[] = location.state

  return (
    <>
      <GoBack title="Opt-ins" />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Consultar comprovantes Opt-ins
        </h1>

        <div className="overflow-x-auto">
          <table className="mt-3 divide-y divide-gray-300 overflow-hidden rounded-t shadow">
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
                  className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Nome da empresa</p>
                  <p className="whitespace-nowrap">CPF/CNPJ</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Data de assinatura</p>
                  <p className="whitespace-nowrap">Data Expiração</p>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  <p className="whitespace-nowrap">Protocolo C2 CARDS</p>
                  <p className="whitespace-nowrap">Protocolo B3</p>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {optInState.map((optin: IOptIn) => (
                <tr key={optin.protocol}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {optin.isActive ? (
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
                      title="Nome da empresa:"
                      value={optin.ecClientName}
                    />

                    <DoubleLine
                      title="CPF/CNPJ:"
                      value={Format.document(optin.ecClientDocument)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Data de assinatura:"
                      value={Format.parseIso(optin.activationDate)}
                    />

                    <DoubleLine
                      title="Data de expiração:"
                      value={Format.parseIso(optin.expirationDate)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Protocolo C2 CARDS:"
                      value={optin.externalCode}
                    />

                    <DoubleLine title="Protolo B3:" value={optin.protocol} />
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
