import { ReactNode } from 'react'

interface ModalContentBodyProps {
  children: ReactNode
}

export function ModalContentBody({ children }: ModalContentBodyProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
      <div className="flex flex-1 items-center">{children}</div>
    </div>
  )
}
