import { useEffect } from 'react'

import { useAuth } from '@app/hooks/use-auth'

export function LogOut() {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  })

  return null
}
