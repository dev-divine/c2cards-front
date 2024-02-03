import { httpClient } from '@/app/services/http-client'

interface Input {
  page: number
  perPage: number
}

interface Citizen {
  id: string
  name: string
  cpf: string
  phone: string
  created_at: string
  updated_at: string
  deleted_at: string
}

interface Output {
  citizens: Citizen[]
  totalPages: number
}

export async function list({ page, perPage }: Input): Promise<Output> {
  const { data } = await httpClient.get<Output>(
    `/citizen?page=${page}&perPage=${perPage}`,
  )

  return data
}
