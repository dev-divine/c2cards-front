import { httpClient } from '@/app/services/http-client'

type Output = any

export async function remove(id: string) {
  const { data } = await httpClient.delete<Output>(`/citizen/${id}`)

  return data
}
