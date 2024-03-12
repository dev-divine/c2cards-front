import { cn } from '@app/utils/cn'

interface Props {
  title: string
  value: string | number
}

export function DoubleLine({ title, value }: Props) {
  return (
    <p className="text-gray-600 font-normal">
      <span className={cn('font-semibold text-dark-blue', title && 'mr-1')}>
        {title}
      </span>
      {value}
    </p>
  )
}
