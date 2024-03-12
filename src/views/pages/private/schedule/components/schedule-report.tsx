import { Format } from '@app/utils/format'
import {
  ArrowUturnLeftIcon,
  // ExclamationTriangleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { Pagination } from '@views/components/pagination'

import getnetLogo from '@/assets/flag-logos/getnet-logo.png'
import mastercardLogo from '@/assets/flag-logos/mastercard-logo.png'
import visaLogo from '@/assets/flag-logos/visa-logo.png'
import cieloLogo from '@/assets/flag-logos/cielo-logo.png'
import redecardLogo from '@/assets/flag-logos/rede-logo.png'
import stoneLogo from '@/assets/flag-logos/stone-logo.png'
import pagarMeLogo from '@/assets/flag-logos/pagarme.png'
import safrapayLogo from '@/assets/flag-logos/banco-safra-logo.png'
import pagseguroLogo from '@/assets/flag-logos/pagseguro-logo.png'
import mercadoPagoLogo from '@/assets/flag-logos/mercado-pago-logo.png'
import { DoubleLine } from '@views/components/double-line'
// import { DatePickerInput } from '@views/components/date-picker-input'
// import { Modal } from '@views/components/modal'
// import { useState } from 'react'
// import { endOfMonth, startOfMonth, subHours } from 'date-fns'
// import { Input } from '@views/components/input'

interface Props {
  setType: (value: string) => void
}

export function ScheduleReport({ setType }: Props) {
  const cardTransactions = [
    {
      flag: 'VISA',
      institution: 'bank_of_america',
      settlement_date: '2024-03-15',
      obligation_type: 'credit_payment',
      value: 150.0,
    },
    {
      flag: 'MASTERCARD',
      institution: 'chase_bank',
      settlement_date: '2024-03-16',
      obligation_type: 'purchase_refund',
      value: 200.0,
    },
    {
      flag: 'CIELO',
      institution: 'wells_fargo',
      settlement_date: '2024-03-17',
      obligation_type: 'debit_payment',
      value: 100.0,
    },
  ]

  // const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  // const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  // const [openScheduleModal, setOpenScheduleModal] = useState(false)

  return (
    <>
      {/* <Modal
        open={openScheduleModal}
        setOpen={setOpenScheduleModal}
        type="title"
        title="Inclusão de Contrato UR"
        confirmText="Avançar"
      >
        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            name="company"
            // error={errors.company?.message}
            // {...register('company')}
          />

          <Input
            label="CPF/CNPJ:"
            name="document"
            // value={Format.document(optin.document)}
            // error={errors.document?.message}
            // {...register('document')}
          />
        </div>

        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Valor disponível:"
            name="total_value"
            // value={optin.nome_representante}
            // error={errors.responsible_name?.message}
            // {...register('responsible_name')}
          />

          <Input
            label="Valor do contrato:"
            name="contract_value"
            // value={Format.document(optin.cpf_representante)}
            // error={errors.responsible_document?.message}
            // {...register('responsible_document')}
          />
        </div>

        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="E-mail do representante:"
            name="arrangement"
            // value={optin.email}
            // error={errors.responsible_email?.message}
            // {...register('responsible_email')}
          />

          <Input
            label="E-mail do representante:"
            name="contract_value"
            // value={optin.email}
            // error={errors.responsible_email?.message}
            // {...register('responsible_email')}
          />
        </div>

        <div className="mb-1 flex w-full flex-1 gap-3">
          <div className="w-full">
            <p className="block w-full text-sm font-medium leading-6 text-zinc-900">
              Data da assinatura:
            </p>
            <DatePickerInput
              value={startDate}
              onChange={setStartDate}
              className="w-full px-3 text-left"
            />
          </div>

          <div className="w-full">
            <p className="block w-full text-sm font-medium leading-6 text-zinc-900">
              Data do vencimento:
            </p>
            <DatePickerInput
              value={endDate}
              onChange={setEndDate}
              className="w-full px-3 text-left"
            />
            <div className="mt-1 flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                <ExclamationTriangleIcon
                  className="h-4 w-4 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <p className="w-full text-xs text-red-700">
                Data de encerramento precisa ser maior que a data de hoje!
              </p>
            </div>
          </div>
        </div>
      </Modal> */}

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <div className="flex w-full items-start justify-between">
          <h1 className="mb-4 text-2xl font-bold text-dark-blue">
            Consultar agenda de recebíveis
          </h1>

          <button
            type="button"
            onClick={() => setType('schedule')}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-dark-blue text-white focus:outline-none">
              <ArrowUturnLeftIcon className="h-5" />
            </div>
            <p className="text-lg font-medium text-zinc-800">Retornar</p>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Bandeira
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Instituição
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Liquidação
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Tipo de obrigação
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Valor
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {cardTransactions.map((transaction) => (
                <tr key={transaction.settlement_date}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {transaction.flag === 'GETNET' && (
                      <img
                        src={getnetLogo}
                        alt="getnet logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'MASTERCARD' && (
                      <img
                        src={mastercardLogo}
                        alt="mastercard logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'VISA' && (
                      <img
                        src={visaLogo}
                        alt="visa logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'CIELO' && (
                      <img
                        src={cieloLogo}
                        alt="cielo logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'REDECARD' && (
                      <img
                        src={redecardLogo}
                        alt="redecard logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'STONE' && (
                      <img
                        src={stoneLogo}
                        alt="stone logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'PAGARME' && (
                      <img
                        src={pagarMeLogo}
                        alt="pagarme logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'SAFRAPAY' && (
                      <img
                        src={safrapayLogo}
                        alt="safrapay logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'PAGSEGURO' && (
                      <img
                        src={pagseguroLogo}
                        alt="pagseguro logo"
                        className="h-7 w-12"
                      />
                    )}
                    {transaction.flag === 'MERCADOPAGO' && (
                      <img
                        src={mercadoPagoLogo}
                        alt="mercado pago logo"
                        className="h-7 w-12"
                      />
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {transaction.institution}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <DoubleLine
                      title="Data:"
                      value={Format.parseIso(transaction.settlement_date)}
                    />
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {transaction.obligation_type}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.currency(transaction.value)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      // onClick={() => setOpenScheduleModal(true)}
                    >
                      <EyeIcon className="ml-1 w-6 text-dark-blue" />
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
