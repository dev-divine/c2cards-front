import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export function ModalContentHeaderDanger() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
      <ExclamationTriangleIcon
        className="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
  )
}
