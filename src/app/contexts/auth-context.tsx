import {
  createContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from 'react'

const localStoragesKeys = {
  ACCESS_TOKEN: 'accessToken', // Ensure you have the correct key here
}

interface AuthContextValue {
  signedIn: boolean
  signIn(accessToken: string): void
  signOut(): void
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStoragesKeys.ACCESS_TOKEN,
    )
    return !!storedAccessToken
  })

  const isError = false

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStoragesKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStoragesKeys.ACCESS_TOKEN)

    setSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError) {
      signOut()
    }
  }, [isError, signOut])

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
