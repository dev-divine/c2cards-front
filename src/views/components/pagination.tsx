import { DocumentIcon } from '@heroicons/react/24/outline'

export function Pagination() {
  return (
    <div className="flex justify-between">
      <p className="hidden w-full min-w-24 items-center gap-1.5 pt-7 sm:flex">
        Total de 46 páginas{' '}
        <DocumentIcon className="text-cyan h-4" strokeWidth={2} />
      </p>
      <nav className="flex w-full items-center justify-between pt-2 sm:justify-end sm:px-0">
        <a
          href="#"
          className="relative mt-4 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Anterior
        </a>
        <a
          href="#"
          className="relative ml-3 mt-4 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Próximo
        </a>
      </nav>
    </div>
  )
}
