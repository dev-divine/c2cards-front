import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

interface Props {
  title: string
}

export function GoBack({ title }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="flex items-center gap-2"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded bg-dark-blue text-white focus:outline-none">
        <ArrowUturnLeftIcon className="h-5" />
      </div>
      <p className="text-lg font-medium text-zinc-800">Voltar para {title}</p>
    </button>
  )
}
