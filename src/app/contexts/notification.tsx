import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, ReactNode, createContext, useState } from 'react'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export type Notification = {
  type: 'error' | 'warning' | 'success' | 'info'
  title: string
  message: string
}

type NotificationContextData = {
  isShow: boolean
  hidden: () => void
  showNotification: (data: Notification) => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotificationContextData)

export function NotificationProvider({ children }: AuthProviderProps) {
  const [show, setShow] = useState(false)

  const [notification, setNotification] = useState<Notification>(
    {} as Notification,
  )

  function hidden() {
    setShow(false)
  }

  function showNotification(data: Notification) {
    setNotification({
      type: data.type,
      title: data.title,
      message: data.message,
    })
    setShow(true)
  }

  return (
    <NotificationContext.Provider
      value={{ showNotification, isShow: show, hidden }}
    >
      {children}

      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded bg-white  shadow-lg ring-1 ring-black ring-opacity-5`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === 'success' && (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}

                    {notification.type === 'error' && (
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </NotificationContext.Provider>
  )
}
