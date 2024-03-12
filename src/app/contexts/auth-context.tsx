/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import axios from 'axios'

import { localStorageKeys } from '@app/config/local-storage-keys'

import { LaunchScreen } from '@views/components/launch-screen'
import { httpClient } from '@app/services/http-client'

export enum UserRole {
  DASHBOARD = 'DASHBOARD',
  CLIENTE_EC = 'CLIENTE_EC',
  OPT_IN = 'OPT_IN',
  RECEBIVEIS = 'RECEBIVEIS',
  URS = 'URS',
  ANTECIPACOES = 'ANTECIPACOES',
  USUARIOS = 'USUARIOS',
  NOTA_COMERCIAL = 'NOTA_COMERCIAL',
  SIMULACAO = 'SIMULACAO',
  ASSINATURAS = 'ASSINATURAS',
}

export interface User {
  id: string
  name: string
  document: string
  email: string
  phone: string
  whatsapp: string
  job: string
  role: UserRole
  password: string
  accessLevel: string
  createdAt?: Date
}

interface AuthState {
  token: string
  user?: User
}

interface AuthContextValue {
  user: User
  signedIn: boolean
  signIn(accessToken: string): Promise<void>
  signOut(): void
}

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
)

export function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true)

  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
    const user = localStorage.getItem(localStorageKeys.KEY_USER)

    return {
      token: token ?? '',
      user: user ? JSON.parse(user) : undefined,
    }
  })

  const signedIn = !!authState.token

  useEffect(() => {
    if (authState.token && !authState.user) {
      getUser()
    } else {
      setLoading(false)
    }
  }, [authState.token])

  const getUser = async () => {
    setLoading(true)
    try {
      const { data } = await httpClient.get<User>('/user/me')
      setAuthState((state) => ({ ...state, user: data }))
      localStorage.setItem(localStorageKeys.KEY_USER, JSON.stringify(data))
    } catch (err) {
      signOut()
    } finally {
      setLoading(false)
    }
  }

  const signIn = useCallback(async (token: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get<{ user: User }>('/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token)
      localStorage.setItem(localStorageKeys.KEY_USER, JSON.stringify(data.user))

      setAuthState({ token, user: data.user })
    } catch (error) {
      console.error('SignIn error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    localStorage.removeItem(localStorageKeys.KEY_USER)
    setAuthState({ token: '' })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        // @ts-expect-error - user is inside user object
        user: authState.user?.user,
        signedIn,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={loading} />
      {!loading && children}
    </AuthContext.Provider>
  )
}
