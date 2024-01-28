import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: Props) {
  const signedIn = true

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
