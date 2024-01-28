import { httpClient } from '@/app/services/http-client'

export interface LoginParams {
  document: string
  password: string
}

interface LoginResponse {
  access_token: string
}

export async function logIn(params: LoginParams) {
  const { data } = await httpClient.post<LoginResponse>(
    '/auth/sessions',
    params,
  )

  return data
}
