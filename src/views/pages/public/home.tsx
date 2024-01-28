import { useState } from 'react'
import { Dialog, Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  MinusIcon,
  PlusIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import logo from '@/assets/logo.png'
import { faqs, footerNavigation } from './data/home'

export function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50 rounded-b bg-gray-200 shadow">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="http://localhost:3000" className="-m-1.5 p-1.5">
              <span className="sr-only">Secretaria de Esportes</span>
              <img
                className="h-16 w-auto"
                src={logo}
                alt="Secretaria de Esportes"
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menu principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              className="font-bold leading-6 text-zinc-900 underline-offset-2 transition duration-200 ease-in-out hover:text-primary hover:drop-shadow-sm"
            >
              Frazer Matrícula
            </a>
            <a
              href="#"
              className="font-bold leading-6 text-zinc-900 underline-offset-2 transition duration-200 ease-in-out hover:text-primary hover:drop-shadow-sm"
            >
              Empréstimo de Espaços Esportivos
            </a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="hidden lg:flex lg:justify-end">
              <a
                href="#"
                className="rounded border border-primary px-3 py-1.5 font-medium leading-6 text-zinc-700 shadow"
              >
                Entrar <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="hidden lg:ml-8 lg:flex lg:justify-end">
              <a
                href="#"
                className="rounded border border-primary px-3 py-1.5 font-medium leading-6 text-zinc-700 shadow"
              >
                Cadastrar <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />

          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Secretaria de Esportes</span>
                <img
                  className="h-16 w-auto"
                  src={logo}
                  alt="Secretaria de Esportes"
                />
              </a>

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-zinc-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-zinc-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-gray-50"
                  >
                    Frazer Matrícula
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-gray-50"
                  >
                    Empréstimo de Espaços Esportivos
                  </a>
                </div>

                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-zinc-900 hover:bg-gray-50"
                  >
                    Entrar
                  </a>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-zinc-900 hover:bg-gray-50"
                  >
                    Cadastrar
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-20">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background object-cover" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                  Bem vindo à Secretaria de Esportes
                </h1>
                <p className="mt-6 text-lg leading-8 text-zinc-700">
                  Aqui promovemos saúde e bem-estar através do esporte, apoiando
                  atletas e incentivando atividades físicas para todos.
                </p>
                <div className="mt-10 flex items-start justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  >
                    Fazer matrícula
                  </a>

                  <div className="flex flex-col items-start">
                    <a
                      href="#"
                      className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                    >
                      Empréstimo de espaços esportivos
                    </a>
                    <p className="mt-2 flex gap-1">
                      <ShieldExclamationIcon className="h-4 text-zinc-900" />
                      <span className="max-w-64 text-left text-xs text-zinc-400">
                        Obs: o empréstimo dos espaços esportivos não contemplam
                        materiais
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-zinc-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-zinc-900">
              Perguntas Frequentes - FAQ:
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-zinc-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-zinc-900">
                          <span className="text-base font-semibold leading-7">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-zinc-600">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-32 bg-gray-900 sm:mt-56"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <img
            className="mx-auto h-16"
            src={logo}
            alt="Secretária de esportes"
          />
          <div className="flex flex-col items-center md:gap-8 ">
            <div>
              <h3 className="mt-8 text-center text-lg font-semibold leading-6 text-white">
                Redes sociais
              </h3>
              <ul
                role="list"
                className="mt-6 flex flex-col flex-wrap space-x-0 space-y-4 sm:flex-row sm:flex-nowrap sm:space-x-4 sm:space-y-0"
              >
                {footerNavigation.socialMedia.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2.5 rounded border border-white py-1 pl-1.5 pr-3"
                  >
                    <CursorArrowRaysIcon className="h-4 text-zinc-300" />
                    <a
                      href={item.href}
                      className="leading-6 text-zinc-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="flex h-12 w-full items-center justify-center bg-zinc-900 text-zinc-400">
        <p className="mx-3 text-center text-sm">
          Todos os direitos reservados © Secretaria de Esportes 2024.
        </p>
      </div>
    </div>
  )
}
