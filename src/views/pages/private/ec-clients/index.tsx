import { useState } from 'react'
// import { endOfMonth, startOfMonth, subHours } from 'date-fns'

// import { Datepicker } from '@views/components/date-picker'
import { Format } from '@app/utils/format'
import {
  InformationCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputPhone } from '@views/components/input-phone'
import { Modal } from '@views/components/modal'
import { Pagination } from '@views/components/pagination'
import { SelectFilters, SelectProps } from '@views/components/select-filters'
import { useEcClientsController } from './use-ec-clients-controller'

export function ECClients() {
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

  const profile = {
    document: '29860877874',
    company: 'Cesar Galvão',
    address:
      'Rua Goncalo Fernandes, 153, Jardim Bela Vista - Santo André-SP - 09041-410',
    phone: '+551144277813',
    whatsapp: '+5511944277813',
    email: 'cesardefranca@yahoo.com.br',
    profile: 'Cliente E.C.',
    username: 'Cesar',
    zipCode: '09041-410',
    state: 'São Paulo',
    city: 'Santo André',
    neighborhood: 'Jardim Bela Vista',
    street: 'Rua Goncalo Fernandes',
    number: '153',
    complement: 'Casa',
    responsible_name: 'Cesar Galvão',
    responsible_email: 'cesar@gmail.com',
    responsible_phone: '+5511944277813',
    responsible_document: '29860877874',
  }

  // const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  // const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  const [openProfileModal, setOpenProfileModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { register, errors } = useEcClientsController() // Falta colocar o control

  return (
    <div>
      <Modal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        type="danger"
        title="Remover estabelecimento comercial - (E.C)"
        confirmText="Remover"
      >
        <p className="mb-2 text-zinc-900">
          Este item será removido permanentemente e você não poderá vê-lo
          novamente.
        </p>
        <p className="text-zinc-900">Tem certeza de que deseja continuar?</p>
      </Modal>

      <Modal
        open={openProfileModal}
        setOpen={setOpenProfileModal}
        type="title"
        title="Dados da empresa - (E.C)"
        showCloseButton={false}
        confirmText="Retornar"
      >
        <Input
          name="document"
          label="CPF/CNPJ:"
          className="mb-1 max-w-lg"
          value={Format.document(profile.document)}
          disabled
        />
        <Input
          name="company"
          label="Empresa:"
          className="mb-1 max-w-lg"
          value={profile.company}
          disabled
        />
        <Input
          name="address"
          label="Endereço:"
          className="mb-1 max-w-lg"
          value={profile.address}
          disabled
        />
        <Input
          name="enterprise"
          label="Telefone:"
          className="mb-1 max-w-lg"
          value={Format.phone(profile.phone)}
          disabled
        />
        <Input
          name="whatsapp"
          label="WhatsApp:"
          className="mb-1 max-w-lg"
          value={Format.phone(profile.whatsapp)}
        />
        <Input
          name="email"
          label="E-mail:"
          className="mb-1 max-w-lg"
          value={profile.email}
          disabled
        />
        <Input
          name="profile"
          label="Perfil:"
          className="mb-1 max-w-lg"
          value={profile.profile}
          disabled
        />
        <Input
          name="user"
          label="Usuário:"
          className="mb-1 max-w-lg"
          value={Format.name(profile.username)}
          disabled
        />
      </Modal>

      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
        type="title"
        title="Editar empresa - (E.C)"
        confirmText="Editar empresa"
      >
        {/* Input document com controller */}
        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            value={profile.company}
            error={errors.company?.message}
            {...register('company')}
          />

          <Input
            label="CPF/CNPJ:"
            value={Format.document(profile.document)}
            error={errors.document?.message}
            {...register('document')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <InputPhone
            label="Telefone:"
            mask="+55 (99) 9999-9999"
            value={Format.phone(profile.whatsapp)}
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            label="E-mail:"
            value={profile.email}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="CEP:"
            value={profile.zipCode}
            name="zipCode"
            // error={errors.zipCode?.message}
            // {...register('zipCode')}
          />

          <Input
            label="Estado:"
            value={profile.state}
            error={errors.state?.message}
            {...register('state')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Cidade:"
            value={profile.state}
            error={errors.state?.message}
            {...register('state')}
          />

          <Input
            label="Bairro:"
            value={profile.neighborhood}
            error={errors.neighborhood?.message}
            {...register('neighborhood')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Número:"
            value={profile.number}
            error={errors.number?.message}
            {...register('number')}
          />

          <Input
            label="Complemento: (opcional)"
            value={profile.complement}
            error={errors.complement?.message}
            {...register('complement')}
          />
        </div>

        <div className="my-4 mt-6 h-px w-full bg-zinc-300" />

        {/* Input document com controller */}
        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Nome do representante:"
            value={profile.responsible_name}
            error={errors.responsible_name?.message}
            {...register('responsible_name')}
          />

          <Input
            label="CPF do representante:"
            value={Format.document(profile.responsible_document)}
            error={errors.responsible_document?.message}
            {...register('responsible_document')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <InputPhone
            label="WhatsApp do representante:"
            value={Format.phone(profile.responsible_phone)}
            error={errors.responsible_phone?.message}
            {...register('responsible_phone')}
          />

          <Input
            label="E-mail do representante:"
            value={profile.responsible_email}
            error={errors.responsible_email?.message}
            {...register('responsible_email')}
          />
        </div>
      </Modal>

      <Modal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        type="title"
        title="Criar empresa - (E.C)"
        confirmText="Criar empresa"
      >
        {/* Input document com controller */}
        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            value={profile.company}
            error={errors.company?.message}
            {...register('company')}
          />

          <Input
            label="CPF/CNPJ:"
            value={Format.document(profile.document)}
            error={errors.document?.message}
            {...register('document')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <InputPhone
            label="Telefone:"
            mask="+55 (99) 9999-9999"
            value={Format.phone(profile.whatsapp)}
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            label="E-mail:"
            value={profile.email}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="CEP:"
            value={profile.zipCode}
            error={errors.zip_code?.message}
            {...register('zip_code')}
          />

          <Input
            label="Estado:"
            value={profile.state}
            error={errors.state?.message}
            {...register('state')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Cidade:"
            value={profile.state}
            error={errors.city?.message}
            {...register('city')}
          />

          <Input
            label="Bairro:"
            value={profile.neighborhood}
            error={errors.neighborhood?.message}
            {...register('neighborhood')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Número:"
            value={profile.number}
            error={errors.number?.message}
            {...register('number')}
          />

          <Input
            label="Complemento: (opcional)"
            value={profile.complement}
            error={errors.complement?.message}
            {...register('complement')}
          />
        </div>

        <div className="my-4 mt-6 h-px w-full bg-zinc-300" />

        {/* Input document com controller */}
        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Nome do representante:"
            value={profile.responsible_name}
            error={errors.responsible_name?.message}
            {...register('responsible_name')}
          />

          <Input
            label="CPF do representante:"
            value={Format.document(profile.responsible_document)}
            error={errors.responsible_document?.message}
            {...register('responsible_document')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <InputPhone
            label="WhatsApp do representante:"
            value={Format.phone(profile.responsible_phone)}
            error={errors.responsible_phone?.message}
            {...register('responsible_phone')}
          />

          <Input
            label="E-mail do representante:"
            value={profile.responsible_email}
            error={errors.responsible_email?.message}
            {...register('responsible_email')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="CEP:"
            value={profile.zipCode}
            error={errors.responsible_zip_code?.message}
            {...register('responsible_zip_code')}
          />

          <Input
            label="Estado:"
            value={profile.state}
            error={errors.responsible_state?.message}
            {...register('responsible_state')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Cidade:"
            value={profile.state}
            error={errors.responsible_city?.message}
            {...register('responsible_city')}
          />

          <Input
            label="Bairro:"
            value={profile.neighborhood}
            error={errors.responsible_neighborhood?.message}
            {...register('responsible_neighborhood')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Número:"
            value={profile.number}
            error={errors.responsible_number?.message}
            {...register('responsible_number')}
          />

          <Input
            label="Complemento: (opcional)"
            value={profile.complement}
            error={errors.responsible_complement?.message}
            {...register('responsible_complement')}
          />
        </div>
      </Modal>

      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

        <SelectFilters
          options={[
            { id: 'document', name: 'CPF/CNPJ', hidden: 'CPF/CNPJ' },
            // { id: 'date', name: 'Data', hidden: 'Data' },
            // { id: 'name', name: 'Nome', hidden: 'Nome' },
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

        {filter.id === 'document' && (
          <Input
            type="text"
            label="CPF/CNPJ:"
            placeholder="Digite o seu CPF/CNPJ..."
            className="ml-px max-w-[382px]"
            name="document"
          />
        )}

        {/* {filter.id === 'name' && (
          <Input
            type="text"
            label="Nome:"
            placeholder="Digite o seu nome..."
            className="ml-px max-w-[382px]"
            name="name"
          />
        )} */}

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
            Meus Clientes (E.C) - Estabelecimento Comercial
          </h1>

          <button
            type="button"
            className="rounded bg-green-base p-3 shadow"
            onClick={() => setOpenCreateModal(true)}
          >
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
                  {Format.phone(person.phone)}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.parseIso(person.createdAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => setOpenProfileModal(true)}
                  >
                    <InformationCircleIcon className="w-6 text-dark-blue" />
                  </button>

                  <button type="button" onClick={() => setOpenEditModal(true)}>
                    <PencilSquareIcon className="ml-1 w-6 text-dark-blue" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenDeleteModal(true)}
                  >
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
