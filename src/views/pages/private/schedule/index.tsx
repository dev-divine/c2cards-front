import { endOfMonth, startOfMonth, subHours } from 'date-fns'
import { useState } from 'react'

// import { Format } from '@app/utils/format'
import { Button } from '@views/components/button'
import { Datepicker } from '@views/components/date-picker'
import { Input } from '@views/components/input'
// import { Modal } from '@views/components/modal'
import { SelectFilters, SelectProps } from '@views/components/select-filters'
// import { useAgendaController } from './use-schedule-controller'
// import { InputDocument } from '@views/components/input-document'
// import { InputPhone } from '@views/components/input-phone'
import { Schedule } from './components/schedule'
import { ScheduleReport } from './components/schedule-report'

export function Agenda() {
  // const { register, errors, control } = useAgendaController()

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  // const agendas = {
  //   company_name: 'Empresa Exemplo 1',
  //   company_document: '12345678901',
  //   company_email: 'contato@empresaexemplo1.com',
  //   acquirer: 'Credenciadora Exemplo',
  //   responsible_name: 'Responsável Exemplo',
  //   responsible_email: 'responsavel@empresaexemplo1.com',
  //   responsible_phone: '11999999999',
  //   responsible_document: '98765432109',
  //   initial_date: new Date('2024-01-01'),
  //   end_date: new Date('2024-12-31'),
  // }

  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  const [, setOpenRequestAgendaModal] = useState(false)

  const [type, setType] = useState('schedule')

  return (
    <>

      {/* <Modal
        open={openRequestAgendaModal}
        setOpen={setOpenRequestAgendaModal}
        type="title"
        title="Solicitar agenda"
        confirmText="Solicitar agenda"
      >
        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            value={agendas.company_name}
            error={errors.company_name?.message}
            {...register('company_name')}
          />

          <div className="w-[48.5%]">
            <InputDocument
              label="CPF/CNPJ"
              control={control}
              value={Format.document(agendas.company_document)}
              error={errors.company_document?.message}
              {...register('company_document')}
            />
          </div>
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="E-mail:"
            value={agendas.company_email}
            error={errors.company_email?.message}
            {...register('company_email')}
          />

          <Input
            label="Credenciadora:"
            value={agendas.acquirer}
            error={errors.acquirer?.message}
            {...register('acquirer')}
          />
          {/* <Controller
            control={control}
            name="acquirer"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.acquirer?.message}
                onChange={onChange}
                placeholder="Selecione a credenciadora:"
                value={value}
                options={acquirerOptions}
              />
            )}
          /> */}
        {/* </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Nome do representante:"
            value={agendas.responsible_name}
            className="w-full flex-1"
            error={errors.responsible_name?.message}
            {...register('responsible_name')}
          />

          <div className="w-[48.5%]">
            <InputDocument
              label="CPF do representante"
              control={control}
              defaultValue={agendas.responsible_document}
              error={errors.responsible_document?.message}
              {...register('responsible_document')}
            />
          </div>
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="E-mail do representante:"
            value={agendas.responsible_email}
            error={errors.responsible_email?.message}
            {...register('responsible_email')}
          />

          <InputPhone
            label="WhatsApp do representante:"
            value={agendas.responsible_phone}
            error={errors.responsible_phone?.message}
            {...register('responsible_phone')}
          />
        </div>

        <div className="mb-1 flex flex-1 gap-3">
          <Input
            label="Data inicial:"
            value={Format.parseIso(agendas.initial_date.toISOString())}
            error={errors.initial_date?.message}
            {...register('initial_date')}
          />

          <Input
            label="Data final"
            value={Format.parseIso(agendas.end_date.toISOString())}
            error={errors.end_date?.message}
            {...register('end_date')}
          />
        </div>
      </Modal> */}

      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

        <SelectFilters
          options={[
            { id: 'document', name: 'CPF/CNPJ', hidden: 'CPF/CNPJ' },
            { id: 'date', name: 'Data', hidden: 'Data' },
          ]}
          selected={filter}
          onChange={setFilter}
        />

        {filter.id === 'date' && (
          <Datepicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            className="ml-px max-w-[382px]"
          />
        )}

        {filter.id === 'document' && (
          <Input
            type="text"
            label="CPF/CNPJ:"
            placeholder="Digite o seu CPF/CNPJ..."
            className="ml-px max-w-[382px]"
            name="document"
          />
        )}

        {filter.id && (
          <Button type="button" className="ml-px mt-8 max-w-[382px]">
            <span>Pesquisar</span>
          </Button>
        )}
      </div>

      {type === 'schedule' ? (
        <Schedule
          setType={setType}
          setOpenRequestAgendaModal={setOpenRequestAgendaModal}
        />
      ) : (
        <ScheduleReport setType={setType} />
      )}
    </>
  )
}
