import { cn } from '@app/utils/cn'

interface Props {
  title: string
  value: string
}

export function DoubleLine({ title, value }: Props) {
  return (
    <p>
      <span className={cn('font-medium text-dark-blue', title && 'mr-1')}>
        {title}
      </span>
      {value}
    </p>
  )
}
