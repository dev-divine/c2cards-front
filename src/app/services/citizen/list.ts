import { httpClient } from '@/app/services/http-client'

type Output = any

export async function list() {
  const { data } = await httpClient.get<Output>('/citizen')

  return data
}
