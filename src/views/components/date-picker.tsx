// import DatePicker from 'react-datepicker'

import { cn } from '@app/utils/cn'
import { DatePickerInput } from './date-picker-input'

interface Props {
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndDate: (date: Date) => void
  className?: string
}

export function Datepicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  className,
}: Props) {
  return (
    <div className={cn('flex w-full max-w-sm items-end', className)}>
      <div className="w-full">
        <p>Data inicial:</p>
        <DatePickerInput value={startDate} onChange={setStartDate} />
        {/* <DatePicker
          className="h-10 w-full rounded bg-light-gray px-2 py-1 shadow focus:outline-none focus:ring-0"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          locale="pt"
          dateFormat="dd/MM/yyyy"
        /> */}
      </div>

      <span className="px-3 py-1">até</span>

      <div className="w-full">
        <p>Data final:</p>
        <DatePickerInput value={endDate} onChange={setEndDate} />

        {/* <DatePicker
          className="h-10 w-full rounded bg-light-gray px-2 py-1 shadow focus:outline-none focus:ring-0"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          locale="pt"
          dateFormat="dd/MM/yyyy"
        /> */}
      </div>
    </div>
  )
}
