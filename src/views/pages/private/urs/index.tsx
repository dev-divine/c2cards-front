import { useState } from 'react'
import { endOfMonth, startOfMonth, subHours } from 'date-fns'

import { Button } from '@views/components/button'
import { Datepicker } from '@views/components/date-picker'
import { Input } from '@views/components/input'
import { InputCheckbox } from '@views/components/input-checkbox'
import { SelectFilters, SelectProps } from '@views/components/select-filters'

import { useUrsController } from '@views/pages/private/urs/use-urs-controller'
import { ViewRequestedURs } from '@views/pages/private/urs/components/view-requested-urs'
import { InquireURAdvanceRequests } from '@views/pages/private/urs/components/inquire-ur-advance-requests'

export function Urs() {
  const { register, errors, control } = useUrsController()

  const [filter, setFilter] = useState<SelectProps>({
    id: '',
    name: 'Selecione o tipo de filtro',
    hidden: 'Selecione o tipo de filtro',
  })

  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  const [tabs, setTabs] = useState('view-requested-urs')

  return (
    <>
      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

        <SelectFilters
          options={[
            { id: 'date', name: 'Data', hidden: 'Data' },
            { id: 'email', name: 'E-mail', hidden: 'E-mail' },
            {
              id: 'ownership_transfer',
              name: 'Tranferência de Titularidade:',
              hidden: 'Tranferência de Titularidade:',
            },
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

        {filter.id === 'email' && (
          <Input
            type="email"
            label="E-mail:"
            placeholder="Digite o seu e-mail..."
            className="ml-px max-w-[382px]"
            error={errors.email?.message}
            {...register('email')}
          />
        )}

        {filter.id === 'ownership_transfer' && (
          <InputCheckbox
            name="ownership_transfer"
            label="Tranferência de Titularidade:"
            control={control}
            options={[
              { label: 'Efetivada', value: 'yes' },
              { label: 'Não efetivada', value: 'no' },
            ]}
          />
        )}

        {filter.id && (
          <Button type="button" className="ml-px mt-8 max-w-[382px]">
            <span>Pesquisar</span>
          </Button>
        )}
      </div>

      {tabs === 'view-requested-urs' ? (
        <InquireURAdvanceRequests setTabs={setTabs} />
      ) : (
        <ViewRequestedURs setTabs={setTabs} />
      )}
    </>
  )
}
