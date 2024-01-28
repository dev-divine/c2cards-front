import { httpClient } from '@/app/services/http-client'

type Output = any

export async function save(id: string) {
  const { data } = await httpClient.get<Output>(`/citizen/${id}`)

  return data
}
