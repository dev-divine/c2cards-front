import { useState } from 'react'
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { Format } from '@app/utils/format'

import { Pagination } from '@views/components/pagination'
import { SelectProps } from '@views/components/select-filters'

import { CreateModal } from '@views/pages/private/ec-clients/components/create-modal'
import { Filter } from '@views/pages/private/ec-clients/components/filter'
// import { ShowClientModal } from '@views/pages/private/ec-clients/components/show-profile-modal'
// import { RemoveModal } from '@views/pages/private/ec-clients/components/remove-modal'
// import { EditModal } from '@views/pages/private/ec-clients/components/edit-modal'
import { TableTitle } from '@views/pages/private/ec-clients/components/table-title'

import {
  IECClient,
  useEcClientsController,
} from '@views/pages/private/ec-clients/use-ec-clients-controller'

export function ECClients() {
  const { eCClients } = useEcClientsController()

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  // const [openProfileModal, setOpenProfileModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  // const [openEditModal, setOpenEditModal] = useState(false)
  // const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [item, setItem] = useState({} as IECClient)

  console.log(item)

  return (
    <div>
      {/* <ShowClientModal
        open={openProfileModal}
        setOpen={setOpenProfileModal}
        item={item}
      /> */}
      <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
      {/* <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        item={item.id}
      />
      <RemoveModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        item={item.id}
      /> */}

      <Filter filter={filter} setFilter={setFilter} />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <TableTitle setOpen={setOpenCreateModal} />

        <div className="overflow-x-auto">
          <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
            <thead className="bg-semi-gray">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  NOME
                </th>

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
                  E-MAIL
                </th>

                <th
                  scope="col"
                  className="w-[10%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  WHATSAPP
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
              {eCClients.map((eCClient: IECClient) => (
                <tr key={eCClient.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.name(eCClient.company_name)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.document(eCClient.company_document)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {eCClient.company_email}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p></p>
                    {Format.phone(eCClient.company_phone)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(eCClient.created_at ?? '')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        // setOpenProfileModal(true)
                      }}
                    >
                      <InformationCircleIcon className="w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        // setOpenEditModal(true)
                      }}
                    >
                      <PencilSquareIcon className="ml-1 w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        // setOpenDeleteModal(true)
                      }}
                    >
                      <TrashIcon className="ml-1 w-6 text-dark-blue" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination />
    </div>
  )
}
