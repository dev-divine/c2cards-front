import { httpClient } from '@/app/services/http-client'

type Output = any

export async function create() {
  const response = await httpClient.post<Output>('/b3', {
    data: {
      accreditation_date: '2024-02-22',
      acquirer_document_number: ['12345678901'],
      commercial_establishment_document_number: '98765432109',
      corporate_name: 'Nome da Empresa Ltda',
      document_type: 2,
      external_id: 'abc123',
      mcc_code: '1234',
      situation_type: 1,
    },
  })

  return response
}
