import { httpClient } from '@/app/services/http-client'

interface Input {
  name: string
  cpf: string
  phone: string
}

type Output = any

export async function create(citizenData: Input) {
  const { data } = await httpClient.post<Output>('/citizen', citizenData)

  return data
}
