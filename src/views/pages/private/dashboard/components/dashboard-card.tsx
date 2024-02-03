import { Link } from 'react-router-dom'

import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface Props {
  title: string
  amount: number
  link: string
}

export function DashboardCard({ title, amount, link }: Props) {
  return (
    <div className="flex h-40 flex-1 flex-col justify-between rounded bg-bg-gray p-6 shadow">
      <div className="flex items-center justify-between">
        <p className="text-sm text-darker-gray">{title}</p>

        <p className="text-xl font-bold text-main-black">{amount}</p>
      </div>

      <div className="h-1 w-full bg-main-gray px-3" />

      <Link
        to={link}
        className="flex items-center justify-between rounded border-[1.5px] border-transparent px-3 py-1.5 hover:bg-main-gray hover:shadow focus:border-main-gray focus:outline-none focus:ring-0"
      >
        <p className="text-darker-gray">Ver lista</p>

        <ChevronRightIcon className="w-7 text-dark-gray" />
      </Link>
    </div>
  )
}
