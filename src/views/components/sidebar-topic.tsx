import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@app/utils/cn'

interface Props {
  title: string
  Icon: ReactNode
  linkTo: string
  selected?: boolean
}

export function SidebarTopic({ Icon, linkTo, title, selected }: Props) {
  return (
    <li>
      <Link
        to={linkTo}
        className={cn(
          selected
            ? 'bg-transparent font-bold text-main-green'
            : 'text-green-normal hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )}
      >
        {Icon}
        {title}
      </Link>
    </li>
  )
}
