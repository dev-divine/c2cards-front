import { httpClient } from '@/app/services/http-client'

interface LoginResponse {
  name: string
  email: string
}

export async function me() {
  const { data } = await httpClient.get<LoginResponse>('/auth/accounts/me')

  return data
}
