import { XMarkIcon } from '@heroicons/react/20/solid'
import { ReactNode } from 'react'

interface ModalContentHeaderProps {
  children?: ReactNode
  actionCloseButton: () => void
}

export function ModalContentHeader({
  children,
  actionCloseButton,
}: ModalContentHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
      <div className="flex items-center">{children}</div>

      <button
        type="button"
        className="rounded-md bg-gray-50 p-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
        onClick={() => actionCloseButton()}
      >
        <span className="sr-only">Fechar</span>
        <XMarkIcon
          className="h-7 w-7 text-red-500"
          aria-hidden="true"
          strokeWidth={2.5}
        />
      </button>
    </div>
  )
}
