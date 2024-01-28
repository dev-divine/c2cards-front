import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.png'

import { cn } from '@app/utils/cn'

import { Pagination } from '@views/components/pagination'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [{ name: 'Sair', href: '#' }]

export function PrivateLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleAthletes = () => navigate('/athletes-dashboard')
  const handleCitizens = () => navigate('/citizen')
  const handleClasses = () => navigate('/classes-dashboard')
  const handleCoaches = () => navigate('/coaches-dashboard')
  const handleGames = () => navigate('/games-dashboard')
  const handleSportsFacilities = () => navigate('/sports-facilities-dashboard')
  const handleGeneralObservations = () => navigate('/')

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src={logo}
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            <a
                              className={cn(
                                location.pathname === '/coaches-dashboard'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/coaches-dashboard'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleCoaches}
                            >
                              Treinadores
                            </a>

                            <a
                              className={cn(
                                location.pathname === '/athletes-dashboard'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/athletes-dashboard'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleAthletes}
                            >
                              Atletas
                            </a>

                            <a
                              className={cn(
                                location.pathname === '/classes-dashboard'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/classes-dashboard'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleClasses}
                            >
                              Turmas
                            </a>

                            <a
                              className={cn(
                                location.pathname === '/games-dashboard'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/games-dashboard'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleGames}
                            >
                              Jogos
                            </a>

                            <a
                              className={cn(
                                location.pathname ===
                                  '/sports-facilities-dashboard'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname ===
                                '/sports-facilities-dashboard'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleSportsFacilities}
                            >
                              Espaços esportivos
                            </a>

                            <a
                              className={cn(
                                location.pathname === '/citizen'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/citizen'
                                  ? 'page'
                                  : undefined
                              }
                              onClick={handleCitizens}
                            >
                              Munícipes
                            </a>

                            <a
                              className={cn(
                                location.pathname === '/'
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                              )}
                              aria-current={
                                location.pathname === '/' ? 'page' : undefined
                              }
                              onClick={handleGeneralObservations}
                            >
                              Observações Gerais
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <UserIcon className="h-8 w-8 rounded-full bg-zinc-400 p-1.5" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      className={cn(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                      )}
                                    >
                                      Sair
                                    </div>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="border-b border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <UserIcon className="h-8 w-8 rounded-full bg-zinc-400 p-1.5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/coaches-dashboard'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/coaches-dashboard'
                          ? 'page'
                          : undefined
                      }
                      onClick={handleCoaches}
                    >
                      Treinadores
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/athletes-dashboard'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/athletes-dashboard'
                          ? 'page'
                          : undefined
                      }
                      onClick={handleAthletes}
                    >
                      Atletas
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/classes-dashboard'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/classes-dashboard'
                          ? 'page'
                          : undefined
                      }
                      onClick={handleClasses}
                    >
                      Turmas
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/games-dashboard'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/games-dashboard'
                          ? 'page'
                          : undefined
                      }
                      onClick={handleGames}
                    >
                      Jogos
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/sports-facilities-dashboard'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/sports-facilities-dashboard'
                          ? 'page'
                          : undefined
                      }
                      onClick={handleSportsFacilities}
                    >
                      Espaços esportivos
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/citizen'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/citizen' ? 'page' : undefined
                      }
                      onClick={handleCitizens}
                    >
                      Munícipes
                    </Disclosure.Button>

                    <Disclosure.Button
                      as="div"
                      className={cn(
                        location.pathname === '/'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={
                        location.pathname === '/' ? 'page' : undefined
                      }
                      onClick={handleGeneralObservations}
                    >
                      Observações Gerais
                    </Disclosure.Button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {location.pathname === '/citizen' && 'Munícipes'}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Outlet />
              <Pagination />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
