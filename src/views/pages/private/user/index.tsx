import { useState } from 'react'
// import { endOfMonth, startOfMonth, subHours } from 'date-fns'

// import { Datepicker } from '@views/components/date-picker'
import { SelectFilters, SelectProps } from '@views/components/select-filters'
import { Input } from '@views/components/input'
import { Button } from '@views/components/button'
import { Pagination } from '@views/components/pagination'
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { Format } from '@app/utils/format'

export function Users() {
  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  const people = [
    {
      status: 'success',
      document: '12345678900',
      name: 'Lindsay Walton',
      phone: '+5511999999999',
      email: 'lindsay.walton@example.com',
      createdAt: new Date('2023-05-19').toISOString(),
    },
    {
      status: 'error',
      document: '12345678900',
      name: 'Lindsay Walton Paula',
      phone: '+5531988888888',
      email: 'lindsay.walton@example.com',
      createdAt: new Date('2024-01-15').toISOString(),
    },
  ]

  // const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  // const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  return (
    <div className="">
      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

        <SelectFilters
          options={[
            // { id: 'document', name: 'CPF/CNPJ', hidden: 'CPF/CNPJ' },
            // { id: 'date', name: 'Data', hidden: 'Data' },
            { id: 'name', name: 'Nome', hidden: 'Nome' },
            { id: 'email', name: 'E-mail', hidden: 'E-mail' },
          ]}
          selected={filter}
          onChange={setFilter}
        />

        {/* {filter.id === 'date' && (
          <Datepicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            className="ml-px max-w-[382px]"
          />
        )} */}

        {/* {filter.id === 'document' && (
          <Input
            type="text"
            label="CPF/CNPJ:"
            placeholder="Digite o seu CPF/CNPJ..."
            className="ml-px max-w-[382px]"
            name="document"
          />
        )} */}

        {filter.id === 'name' && (
          <Input
            type="text"
            label="Nome:"
            placeholder="Digite o seu nome..."
            className="ml-px max-w-[382px]"
            name="name"
          />
        )}

        {filter.id === 'email' && (
          <Input
            type="email"
            label="E-mail:"
            placeholder="Digite o seu e-mail..."
            className="ml-px max-w-[382px]"
            name="email"
          />
        )}

        {filter.id && (
          <Button type="button" className="ml-px mt-8 max-w-[382px]">
            <span>Pesquisar</span>
          </Button>
        )}
      </div>

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-blue">
            Registro de Usuários Agentes
          </h1>

          <button className="bg-green-base rounded p-3 shadow">
            <PlusIcon className="w-7 text-white" strokeWidth={3} />
          </button>
        </div>
        <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
          <thead className="bg-semi-gray">
            <tr>
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
                NOME
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                E-MAIL
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                DATA DE CRIAÇÃO
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
            {people.map((person) => (
              <tr key={person.email}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.document(person.document)}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.name(person.name)}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {person.email}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.parseIso(person.createdAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button>
                    <InformationCircleIcon className="w-6 text-dark-blue" />
                  </button>
                  <button>
                    <PencilSquareIcon className="ml-1 w-6 text-dark-blue" />
                  </button>
                  <button>
                    <TrashIcon className="ml-1 w-6 text-dark-blue" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  )
}
