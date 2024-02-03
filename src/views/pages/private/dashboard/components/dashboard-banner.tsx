import logoImage from '@/assets/logo.png'

interface Props {
  client: string
}

export function DashboardBanner({ client }: Props) {
  return (
    <div className="mt-5 flex h-full w-full flex-col items-center justify-evenly gap-8 rounded bg-main-gradient px-8 py-10 shadow md:flex-row">
      <div className="max-w-[35rem]">
        <h2 className="mb-2 text-xl text-white">Olá, {client}</h2>

        <h1 className="mb-4 text-3xl font-bold text-white">
          Bem-vindo(a) ao seu dashboard!
        </h1>

        <p className="font-medium text-white">
          Este Dashboard foi desenhado para proprocionar a você a melhor
          experiência de gerenciamento de seus recebíveis.
        </p>
      </div>

      <img src={logoImage} alt="logo" />
    </div>
  )
}
