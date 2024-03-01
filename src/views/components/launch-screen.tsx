import { Transition } from '@headlessui/react'

import logoImage from '@/assets/logo.png'
import { Spinner } from '@views/components/spinner'

interface Props {
  isLoading: boolean
}

export function LaunchScreen({ isLoading }: Props) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-primary fixed left-0 top-0 grid h-full w-full place-items-center">
        <div className="flex flex-col items-center gap-4">
          <img src={logoImage} alt="logo image" className="h-10 text-white" />
          <Spinner className="text-primary fill-white" />
        </div>
      </div>
    </Transition>
  )
}
