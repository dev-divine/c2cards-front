import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

interface Props {
  setOpen: (value: boolean) => void
}

export function TableTitle({ setOpen }: Props) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1 className="text-2xl font-bold text-dark-blue">
        Meus Clientes (E.C) - Estabelecimento Comercial
      </h1>

      <button
        type="button"
        className="rounded bg-green-base p-3 shadow"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="w-7 text-white" strokeWidth={3} />
      </button>
    </div>
  )
}
