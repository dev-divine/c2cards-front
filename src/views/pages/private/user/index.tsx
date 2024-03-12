/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Format } from '@app/utils/format'
import {
  InformationCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import { Pagination } from '@views/components/pagination'
import { SelectProps } from '@views/components/select-filters'
import { httpClient } from '@app/services/http-client'
import { CreateModal } from './components/create-modal'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { zodStringParser } from '@app/utils/custom-zod-error'
import { usePagination } from '@app/hooks/use-pagination'
import { useNotification } from '@app/hooks/use-notification'
import { RemoveModal } from './components/remove-modal'
import { ShowClientModal } from './components/show-profile-modal'
import { EditModal } from './components/edit-modal'
import { Filter } from './components/filter'

interface User {
  id: string
  name: string
  document: string
  email: string
  phone: string
  whatsapp: string
  job: string
  role: string
  accessLevel: string
  password: string
  createdAt: string
}

const schema = z.object({
  name: z
    .string(zodStringParser('nome'))
    .min(1, { message: 'Nome é obrigatório' }),
  document: z
    .string(zodStringParser('CPF'))
    .min(1, { message: 'CPF é obrigatório' }),
  email: z
    .string(zodStringParser('e-mail'))
    .email({ message: 'E-mail inválido' }),
  phone: z
    .string(zodStringParser('telefone'))
    .min(1, { message: 'Telefone é obrigatório' }),
  whatsapp: z
    .string(zodStringParser('whatsapp'))
    .min(1, { message: 'WhatsApp é obrigatório' }),
  job: z
    .string(zodStringParser('Cargo'))
    .min(1, { message: 'Cargo é obrigatório' }),
  role: z
    .string(zodStringParser('permissões'))
    .min(1, { message: 'Permissões é obrigatório' }),
  accessLevel: z
    .string(zodStringParser('nível de acesso'))
    .min(1, { message: 'Nível de acesso é obrigatório' }),
  password: z.string(zodStringParser('senha')).optional(),
})

type FormData = z.infer<typeof schema>

export function Users() {
  const { successToast, errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState<User>({} as User)
  const [users, setUsers] = useState<User[]>([])

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  const [openProfileModal, setOpenProfileModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleCreate = hookFormHandleSubmit(async (data: FormData) => {
    setLoading(true)
    window.scrollTo(0, 0)

    try {
      const response = await httpClient.post('/user', {
        ...data,
        document: data.document?.replace(/[^\d+]/g, ''),
        phone: data.phone?.replace(/[^\d+]/g, ''),
        whatsapp: data.whatsapp?.replace(/[^\d+]/g, ''),
      })

      setOpenCreateModal(false)

      successToast({
        title: `Agente financeiro ${response.data.user.name} cadastrado com sucesso!`,
        message: 'O agente financeiro foi cadastrado no sistema com sucesso.',
      })

      await loadUsers()
    } catch (error) {
      console.error(error)
      errorToast({
        title: 'Erro ao cadastrar agente financeiro!',
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
      await httpClient.put(`/user/${item.id}`, {
        ...data,
        document: data.document?.replace(/[^\d+]/g, ''),
        phone: data.phone?.replace(/[^\d+]/g, ''),
        whatsapp: data.whatsapp?.replace(/[^\d+]/g, ''),
      })

      setOpenEditModal(false)

      successToast({
        title: 'Agente financeiro editado com sucesso',
        message:
          'Os dados do agente financeiro foram editados com sucesso no sistema.',
      })

      await loadUsers()
    } catch (error) {
      errorToast({
        title: 'Erro ao editar agente financeiro!',
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
      const { data } = await httpClient.delete(`/user/${item.id}`)

      if (data.success) {
        successToast({
          title: 'Agente financeiro (A.F) removido com sucesso!',
          message: 'O agente financeiro foi removido do sistema com sucesso.',
        })
      }

      setOpenDeleteModal(false)

      await loadUsers()
    } catch (error) {
      errorToast({
        title: 'Erro ao remover o agente financeiro!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  async function loadUsers() {
    try {
      const { data } = await httpClient.get(
        `/user/list?page=${currentPage}&perPage=${20}`,
      )
      setUsers(data.users)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error(error)
      console.log(parseError(error))
      console.log(error)
      errorToast({
        title: 'Erro ao carregar os usuários!',
        message: parseError(error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [currentPage])

  return (
    <>
      <ShowClientModal open={openProfileModal} setOpen={setOpenProfileModal} />

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
            Registro de Usuários Agentes
          </h1>

          <button
            type="button"
            className="rounded bg-green-base p-3 shadow"
            onClick={() => setOpenCreateModal(true)}
          >
            <PlusIcon className="w-7 text-white" strokeWidth={3} />
          </button>
        </div>
        <div className="overflow-x-auto">
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
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.document}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.name}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {Format.parseIso(user.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setItem(user)
                        setOpenProfileModal(true)
                      }}
                    >
                      <InformationCircleIcon className="w-6 text-dark-blue" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setItem(user)
                        setOpenEditModal(true)
                      }}
                    >
                      <PencilSquareIcon className="ml-1 w-6 text-dark-blue" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setItem(user)
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
    </>
  )
}
