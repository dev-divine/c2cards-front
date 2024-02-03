import { Outlet } from 'react-router-dom'

import loginImage from '@/assets/login-image.png'

export function AuthLayout() {
  return (
    <div className="flex max-h-screen bg-white">
      <div className="my-10 ml-10 hidden max-h-screen w-full sm:block">
        <div className="bg-light-blue h-full w-full max-w-[95%] rounded-3xl p-12 shadow-xl">
          <p className="text-dark-blue mb-3 text-2xl font-bold">
            CONHECIMENTO DE MERCADO
          </p>

          <p className="text-main-text mb-4">
            Usamos nossa experiência e estudos constantes sobre o mercado do
            fomento, para conduzir nossos parceiros para o caminho do sucesso.
            Queremos que você aproveite as melhores oportunidades do mercado,
            amplie seu portfólio de produtos, conquiste mais clientes e se
            destaque nos negócios.
          </p>

          <p className="text-dark-blue mb-3 text-2xl font-bold">
            TECNOLOGIA X SISTEMA SEGURO E ÁGIL
          </p>

          <p className="text-main-green font-bold">
            Trabalhamos com as melhores tecnologias do mercado.
          </p>

          <p className="text-main-text mb-3">
            Nossa plataforma conta com a registradora B3 – Bolsa de Valores,
            referência mundial em infraestrutura de mercado financeiro. O nosso
            processo de emissão de Notas Comerciais está validado e aprovado
            pelas principais Administradoras e Gestoras de Fundos de
            Investimentos.
          </p>

          <p className="text-main-text mb-4">
            Toda solidez, segurança e know-how dessas parceiras garantem
            qualidade total nas informações transacionais e otimização do
            monitoramento da operação.
          </p>

          <img src={loginImage} alt="alt" className="mx-auto h-60" />
        </div>
      </div>

      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
