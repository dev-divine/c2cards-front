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
    <div className="flex-1">
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'block flex-1 rounded border border-zinc-400 py-1.5 text-xs text-zinc-900 shadow ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-0 focus:ring-inset sm:text-sm sm:leading-6',
              error && '!border-red-600',
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
