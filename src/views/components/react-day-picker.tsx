import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import { capitalizeFirstLetter } from '@app/utils/capitalize-first-letter'

interface Props {
  value: Date
  onChange?(date: Date): void
}

export function ReactDayPicker({ value, onChange }: Props) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        caption: 'flex items-center justify-between',
        nav: 'flex gap-1',
        nav_button_previous:
          'text-dark-blue flex items-center justify-center !bg-transparent',
        nav_button_next:
          'text-dark-blue flex items-center justify-center !bg-transparent',
        head_cell: 'uppercase text-xs text-gray-500 font-medium pt-1 pb-2',
        button:
          'text-gray-700 cursor-pointer w-10 h-10 hover:bg-blue-100 rounded-full',
        day_today: 'bg-gray-100 font-bold text-gray-900',
        day_selected: '!bg-dark-blue text-white font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <span className="texrt-gray-900 font-medium tracking-[-0.408px]">
              {capitalizeFirstLetter(format(date, 'LLLL yyyy', options))}
            </span>
          )
        },
      }}
    />
  )
}
