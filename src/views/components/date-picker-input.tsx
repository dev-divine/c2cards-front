import { useState } from 'react'
import { CrossCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@app/utils/cn'
import { formatDate } from '@app/utils/format-date'

import { Popover } from '@views/components/popover'
import { ReactDayPicker } from '@views/components/react-day-picker'

interface Props {
  error?: string
  className?: string
  value?: Date
  onChange?(date: Date): void
}

export function DatePickerInput({ className, value, onChange, error }: Props) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())

  function handleChangeDate(date: Date) {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <div className="w-full">
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'focus:ring-0" h-10 w-full rounded border border-zinc-900 bg-light-gray px-2 py-1 text-left shadow focus:outline-none',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="w-full text-left">{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <ReactDayPicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
