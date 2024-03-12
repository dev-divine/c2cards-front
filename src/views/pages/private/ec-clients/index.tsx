/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

import { Format } from '@app/utils/format'

import { Pagination } from '@views/components/pagination'
import { SelectProps } from '@views/components/select-filters'

import { CreateModal } from '@views/pages/private/ec-clients/components/create-modal'
import { Filter } from '@views/pages/private/ec-clients/components/filter'
import { ShowClientModal } from '@views/pages/private/ec-clients/components/show-profile-modal'
import { RemoveModal } from '@views/pages/private/ec-clients/components/remove-modal'
import { EditModal } from '@views/pages/private/ec-clients/components/edit-modal'

import { useAuth } from '@app/hooks/use-auth'
import { useNotification } from '@app/hooks/use-notification'
import { usePagination } from '@app/hooks/use-pagination'
import { httpClient } from '@app/services/http-client'
import { zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface IECClient {
  id?: string
  userId?: string
  companyName: string
  companyDocument: string
  companyPhone: string
  companyWhatsApp: string
  companyEmail: string
  companyZipCode: string
  companyState: string
  companyCity: string
  companyNeighborhood: string
  companyStreet: string
  companyNumber: string
  companyComplement?: string
  responsibleName: string
  responsibleEmail: string
  responsiblePhone: string
  responsibleWhatsapp: string
  responsibleDocument: string
  responsibleZipCode?: string
  responsibleState?: string
  responsibleCity?: string
  responsibleNeighborhood?: string
  responsibleStreet?: string
  responsibleNumber?: string
  responsibleComplement?: string
  profile?: string
  createdAt?: string
}

export const schema = z.object({
  companyName: z
    .string(zodStringParser('nome da empresa'))
    .min(1, 'O nome é obrigatório.'),
  companyDocument: z
    .string(zodStringParser('CNPJ'))
    .min(1, 'O CNPJ é obrigatório.'),
  companyPhone: z
    .string(zodStringParser('telefone'))
    .min(1, 'O telefone é obrigatório.'),
  companyWhatsApp: z
    .string(zodStringParser('whatsapp'))
    .min(1, 'O telefone é obrigatório.'),
  companyEmail: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  companyZipCode: z
    .string(zodStringParser('CEP'))
    .min(1, 'O CEP é obrigatório.'),
  companyState: z
    .string(zodStringParser('estado'))
    .min(1, 'O estado é obrigatório.'),
  companyCity: z
    .string(zodStringParser('cidade'))
    .min(1, 'O cidade é obrigatório.'),
  companyNeighborhood: z
    .string(zodStringParser('bairro'))
    .min(1, 'O bairro é obrigatório.'),
  companyStreet: z
    .string(zodStringParser('rua'))
    .min(1, 'O rua é obrigatório.'),
  companyNumber: z
    .string(zodStringParser('número'))
    .min(1, 'O número é obrigatório.')
    .optional(),
  companyComplement: z.string(zodStringParser('complemento')).optional(),
  responsibleName: z.string(zodStringParser('nome do responsável')),
  responsibleEmail: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsiblePhone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsibleWhatsapp: z
    .string(zodStringParser('whatsapp do responsável'))
    .min(1, 'O whatsapp é obrigatório.'),
  responsibleDocument: z.string(zodStringParser('CPF do responsável')),
  responsibleZipCode: z
    .string(zodStringParser('CEP do responsável'))
    .optional(),
  responsibleState: z
    .string(zodStringParser('estado do responsável'))
    .optional(),
  responsibleCity: z
    .string(zodStringParser('cidade do responsável'))
    .optional(),
  responsibleNeighborhood: z
    .string(zodStringParser('bairro do responsável'))
    .optional(),
  responsibleStreet: z.string(zodStringParser('rua do responsável')).optional(),
  responsibleNumber: z
    .string(zodStringParser('número do responsável'))
    .optional(),
  responsibleComplement: z
    .string(zodStringParser('complemento do responsável'))
    .optional(),
  profile: z.string(zodStringParser('perfil')).optional(),
})

export type FormData = z.infer<typeof schema>

export function ECClients() {
  const { user } = useAuth()
  const { successToast, errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [loading, setLoading] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openProfileModal, setOpenProfileModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [eCClients, setECClients] = useState<IECClient[]>([])
  const [item, setItem] = useState({} as IECClient)

  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    disabled: true,
    resolver: zodResolver(schema),
  })

  const handleCreate = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      const response = await httpClient.post('/ec-client', {
        ...data,
        userId: user.id,
        companyDocument: data.companyDocument?.replace(/\D/g, ''),
        companyPhone: data.companyPhone?.replace(/[^\d+]/g, ''),
        companyWhatsApp: data.companyWhatsApp?.replace(/[^\d+]/g, ''),
        companyZipCode: data.companyZipCode?.replace(/[^0-9]/g, ''),
        responsiblePhone: data.responsiblePhone?.replace(/[^\d+]/g, ''),
        responsibleDocument: data.responsibleDocument?.replace(/\D/g, ''),
        responsibleWhatsapp: data.responsibleWhatsapp?.replace(/[^\d+]/g, ''),
        responsibleZipCode: data.responsibleZipCode?.replace(/[^0-9]/g, ''),
      })

      setOpenCreateModal(false)

      successToast({
        title: `Estabelecimento comercial ${response.data.ecClient.companyName} cadastrado com sucesso!`,
        message:
          'O estabelecimento comercial foi cadastrado no sistema com sucesso.',
      })

      await loadECClients()
    } catch (error) {
      errorToast({
        title: 'Erro ao cadastrar estabelecimento comercial!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  })

  const handleEdit = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      await httpClient.put(`/ec-client/${item.id}`, {
        ...data,
        userId: user.id,
        companyDocument: data.companyDocument?.replace(/\D/g, ''),
        companyPhone: data.companyPhone?.replace(/[^\d+]/g, ''),
        companyWhatsApp: data.companyWhatsApp?.replace(/[^\d+]/g, ''),
        companyZipCode: data.companyZipCode?.replace(/[^0-9]/g, ''),
        responsibleDocument: data.responsibleDocument?.replace(/\D/g, ''),
        responsibleWhatsapp: data.responsibleWhatsapp?.replace(/[^\d+]/g, ''),
        responsibleZipCode: data.responsibleZipCode?.replace(/[^0-9]/g, ''),
      })

      setOpenEditModal(false)

      successToast({
        title: 'Cliente (E.C) editado com sucesso',
        message:
          'Os dados do estabelecimento comercial foram editados com sucesso no sistema.',
      })

      await loadECClients()
    } catch (error) {
      errorToast({
        title: 'Erro ao editar estabelecimento comercial!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  })

  async function handleDelete() {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      await httpClient.delete<void>(`/ec-client/${item.id}`)

      successToast({
        title: 'Cliente (E.C) removido com sucesso!',
        message:
          'O estabelecimento comercial foi removido do sistema com sucesso.',
      })

      setOpenDeleteModal(false)

      await loadECClients()
    } catch (error) {
      errorToast({
        title: 'Erro ao remover estabelecimento comercial!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  async function loadECClients() {
    try {
      const { data } = await httpClient.get(
        `/ec-client/list?page=${currentPage}&perPage=${20}`,
      )
      console.log(data)
      setECClients(data.ecClient)
      setTotalPages(data.totalPages)
    } catch (error) {
      errorToast({
        title: 'Erro ao carregar os clientes (E.C)!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadECClients()
  }, [currentPage])

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  return (
    <div>
      <ShowClientModal
        open={openProfileModal}
        setOpen={setOpenProfileModal}
        hookForm={{ setValue, item }}
      />

      <CreateModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        hookForm={{
          errors,
          control,
          loading,
          register,
          handleCreate,
          setValue,
        }}
      />

      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        hookForm={{
          item,
          errors,
          control,
          loading,
          register,
          handleEdit,
          setValue,
        }}
      />

      <RemoveModal
        loading={loading}
        handleDelete={handleDelete}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />

      <Filter filter={filter} setFilter={setFilter} />

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-blue">
            Meus Clientes (E.C) - Estabelecimento Comercial
          </h1>

          <button
            type="button"
            className="rounded bg-green-base p-3 shadow"
            onClick={() => setOpenCreateModal(true)}
          >
            <PlusIcon className="w-7 text-white" />
          </button>
        </div>

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
                    {eCClient.companyName}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.document(eCClient.companyDocument ?? '')}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {eCClient.companyEmail}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p></p>
                    {Format.phone(eCClient.companyWhatsApp ?? '')}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(eCClient.createdAt ?? '')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        setOpenProfileModal(true)
                      }}
                    >
                      <InformationCircleIcon className="w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        setOpenEditModal(true)
                      }}
                    >
                      <PencilSquareIcon className="ml-1 w-6 text-dark-blue" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setItem(eCClient)
                        setOpenDeleteModal(true)
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
