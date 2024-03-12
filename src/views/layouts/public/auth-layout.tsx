import { Outlet } from 'react-router-dom'

import loginImage from '@/assets/login-image.png'

export function AuthLayout() {
  return (
    <div className="flex max-h-screen bg-white">
      <div className="my-10 ml-10 hidden max-h-screen w-full sm:block">
        <div className="h-full w-full max-w-[95%] rounded-3xl bg-light-blue p-12 shadow-xl">
          <p className="mb-3 text-2xl font-bold text-dark-blue">
            CONHECIMENTO DE MERCADO
          </p>

          <p className="mb-4 text-main-text">
            Usamos nossa experiência e estudos constantes sobre o mercado do
            fomento, para conduzir nossos parceiros para o caminho do sucesso.
            Queremos que você aproveite as melhores oportunidades do mercado,
            amplie seu portfólio de produtos, conquiste mais clientes e se
            destaque nos negócios.
          </p>

          <p className="mb-3 pt-3 text-2xl font-bold text-dark-blue">
            TECNOLOGIA X SISTEMA SEGURO E ÁGIL
          </p>

          <p className="font-bold text-main-green">
            Trabalhamos com as melhores tecnologias do mercado.
          </p>

          <p className="mb-3 pt-1.5 text-main-text">
            Nossa plataforma conta com a registradora B3 – Bolsa de Valores,
            referência mundial em infraestrutura de mercado financeiro. O nosso
            processo de emissão de Notas Comerciais está validado e aprovado
            pelas principais Administradoras e Gestoras de Fundos de
            Investimentos.
          </p>

          <p className="mb-16 text-main-text">
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
