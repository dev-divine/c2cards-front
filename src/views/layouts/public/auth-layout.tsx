import { Outlet } from 'react-router-dom'

import authImage from '@/assets/auth-image.jpg'

export function AuthLayout() {
  return (
    <div className="flex h-full bg-background">
      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <Outlet />
      </div>

      <div className="my-10 mr-10 hidden max-h-screen w-full sm:block">
        <img
          src={authImage}
          alt="Pessoas praticando esportes"
          className="h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full select-none rounded-[32px] border object-cover shadow-lg"
        />
      </div>
    </div>
  )
}
