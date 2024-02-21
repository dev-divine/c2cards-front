import { Fragment, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowLeftStartOnRectangleIcon,
  BanknotesIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import logo from '@/assets/logo.png'

import { cn } from '@app/utils/cn'

import { SidebarTopic } from '@views/components/sidebar-topic'

export function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const route = useLocation()

  const pagePaths = route.pathname.split('/')
  pagePaths.shift()

  return (
    <div className="h-full min-h-screen bg-lighter-blue">
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-[250px] top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Fechar barra lateral</span>
                        <XMarkIcon
                          className="h-8 w-8 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-auto shrink-0 items-center">
                      <img
                        className="mx-auto mb-4 mt-10 h-24 w-auto"
                        src={logo}
                        alt="C2 Cards"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul
                        role="list"
                        className="-mx-2 flex flex-1 flex-col gap-y-7"
                      >
                        <div role="list" className="space-y-1">
                          <SidebarTopic
                            Icon={<HomeIcon className="h-6 w-6" />}
                            linkTo="/"
                            title="Dashboard"
                            selected={route.pathname === '/'}
                          />

                          <SidebarTopic
                            Icon={
                              <BuildingStorefrontIcon className="h-6 w-6" />
                            }
                            linkTo="/ec_clients"
                            title="Clientes (E.C)"
                            selected={route.pathname.startsWith('/ec_clients')}
                          />

                          <SidebarTopic
                            Icon={<PencilSquareIcon className="h-6 w-6" />}
                            linkTo="/opt_in"
                            title="OPT-In"
                            selected={route.pathname.startsWith('/opt_in')}
                          />

                          <SidebarTopic
                            Icon={
                              <ClipboardDocumentListIcon className="h-6 w-6" />
                            }
                            linkTo="/agenda"
                            title="Agenda"
                            selected={route.pathname.startsWith('/agenda')}
                          />

                          <SidebarTopic
                            Icon={<BanknotesIcon className="h-6 w-6" />}
                            linkTo="/urs"
                            title="URs"
                            selected={route.pathname.startsWith('/urs')}
                          />

                          <SidebarTopic
                            Icon={<UserIcon className="h-6 w-6" />}
                            linkTo="/users"
                            title="Usuários"
                            selected={route.pathname.startsWith('/users')}
                          />
                        </div>

                        <div className="-mx-4 h-px w-[320px] bg-main-green" />

                        <div className="mb-5">
                          <SidebarTopic
                            Icon={<UserCircleIcon className="h-6 w-6" />}
                            linkTo="/profile"
                            title="Perfil"
                            selected={route.pathname.startsWith('/profile')}
                          />

                          <SidebarTopic
                            Icon={
                              <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                            }
                            linkTo="/logout"
                            title="Sair"
                            selected={route.pathname.startsWith('/logout')}
                          />
                        </div>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-auto shrink-0 items-center">
              <img
                className="mx-auto mb-4 mt-10 h-32 w-auto"
                src={logo}
                alt="C2 Cards"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-2 flex flex-1 flex-col gap-y-7">
                <div role="list" className="space-y-1">
                  <SidebarTopic
                    Icon={<HomeIcon className="h-6 w-6" />}
                    linkTo="/"
                    title="Dashboard"
                    selected={route.pathname === '/'}
                  />

                  <SidebarTopic
                    Icon={<BuildingStorefrontIcon className="h-6 w-6" />}
                    linkTo="/ec_clients"
                    title="Clientes (E.C)"
                    selected={route.pathname.startsWith('/ec_clients')}
                  />

                  <SidebarTopic
                    Icon={<PencilSquareIcon className="h-6 w-6" />}
                    linkTo="/opt_in"
                    title="OPT-In"
                    selected={route.pathname.startsWith('/opt_in')}
                  />

                  <SidebarTopic
                    Icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
                    linkTo="/agenda"
                    title="Agenda"
                    selected={route.pathname.startsWith('/agenda')}
                  />

                  <SidebarTopic
                    Icon={<BanknotesIcon className="h-6 w-6" />}
                    linkTo="/urs"
                    title="URs"
                    selected={route.pathname.startsWith('/urs')}
                  />

                  <SidebarTopic
                    Icon={<UserIcon className="h-6 w-6" />}
                    linkTo="/users"
                    title="Usuários"
                    selected={route.pathname.startsWith('/users')}
                  />
                </div>

                <div className="mb-5 mt-auto">
                  <SidebarTopic
                    Icon={<UserCircleIcon className="h-6 w-6" />}
                    linkTo="/profile"
                    title="Perfil"
                    selected={route.pathname.startsWith('/profile')}
                  />

                  <SidebarTopic
                    Icon={<ArrowLeftStartOnRectangleIcon className="h-6 w-6" />}
                    linkTo="/logout"
                    title="Sair"
                    selected={route.pathname.startsWith('/logout')}
                  />
                </div>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <p className="w-full text-right">
              Sua sessão expira em:
              <span className="ml-1 text-lg font-bold">1 dia e 15 minutos</span>
            </p>
          </div>

          <main className={cn('p-8', sidebarOpen && 'lg:pl-[272px]')}>
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
