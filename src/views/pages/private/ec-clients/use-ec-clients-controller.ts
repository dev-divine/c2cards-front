/* eslint-disable react-hooks/exhaustive-deps */
import { useNotification } from '@app/hooks/use-notification'
import { usePagination } from '@app/hooks/use-pagination'
import { httpClient } from '@app/services/http-client'
import { zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface IECClient {
  id?: string
  user_id?: string
  company_name: string
  company_document: string
  company_phone: string
  company_email: string
  company_zip_code: string
  company_state: string
  company_city: string
  company_neighborhood: string
  company_street: string
  company_number: string
  company_complement?: string
  responsible_name: string
  responsible_email: string
  responsible_whatsapp: string
  responsible_document: string
  responsible_zip_code?: string
  responsible_state?: string
  responsible_city?: string
  responsible_neighborhood?: string
  responsible_street?: string
  responsible_number?: string
  responsible_complement?: string
  profile?: string
  created_at?: string
}

const schema = z.object({
  company_name: z
    .string(zodStringParser('nome da empresa'))
    .min(1, 'O nome é obrigatório.'),
  company_document: z
    .string(zodStringParser('CNPJ'))
    .length(18, 'O CNPJ deve ter 14 caracteres.')
    .min(1, 'O CNPJ é obrigatório.'),
  company_phone: z
    .string(zodStringParser('telefone'))
    .min(1, 'O telefone é obrigatório.'),
  company_whatsapp: z
    .string(zodStringParser('whatsapp'))
    .min(1, 'O telefone é obrigatório.'),
  company_email: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  company_zip_code: z
    .string(zodStringParser('CEP'))
    .min(1, 'O CEP é obrigatório.'),
  company_state: z
    .string(zodStringParser('estado'))
    .min(1, 'O estado é obrigatório.'),
  company_city: z
    .string(zodStringParser('cidade'))
    .min(1, 'O cidade é obrigatório.'),
  company_neighborhood: z
    .string(zodStringParser('bairro'))
    .min(1, 'O bairro é obrigatório.'),
  company_street: z
    .string(zodStringParser('rua'))
    .min(1, 'O rua é obrigatório.'),
  company_number: z
    .string(zodStringParser('número'))
    .min(1, 'O número é obrigatório.')
    .optional(),
  company_complement: z.string(zodStringParser('complemento')).optional(),
  responsible_name: z.string(zodStringParser('nome do responsável')),
  responsible_email: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsible_whatsapp: z
    .string(zodStringParser('whatsapp do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsible_document: z.string(zodStringParser('CPF do responsável')),
  responsible_zip_code: z
    .string(zodStringParser('CEP do responsável'))
    .optional(),
  responsible_state: z
    .string(zodStringParser('estado do responsável'))
    .optional(),
  responsible_city: z
    .string(zodStringParser('cidade do responsável'))
    .optional(),
  responsible_neighborhood: z
    .string(zodStringParser('bairro do responsável'))
    .optional(),
  responsible_street: z
    .string(zodStringParser('rua do responsável'))
    .optional(),
  responsible_number: z
    .string(zodStringParser('número do responsável'))
    .optional(),
  responsible_complement: z
    .string(zodStringParser('complemento do responsável'))
    .optional(),
  profile: z.string(zodStringParser('perfil')).optional(),
})

export type FormData = z.infer<typeof schema>

export function useEcClientsController() {
  const { errorToast, parseError } = useNotification()
  const { setTotalPages, currentPage } = usePagination()

  const [loading, setLoading] = useState(false)
  const [eCClients, setECClients] = useState<IECClient[]>([])

  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function loadECClients() {
    try {
      const { data } = await httpClient.get(
        `/ec-clients?page=${currentPage}&perPage=${20}`,
      )
      setECClients(data.ec_clients)
      setTotalPages(data.total_pages)
    } catch (error) {
      errorToast({
        title: 'Erro ao carregar os munícipes!',
        message: parseError(error).message,
        error,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadECClients()
  }, [currentPage])

  return {
    errors,
    control,
    loading,
    eCClients,
    register,
    setValue,
    handleSubmit,
    setLoading,
    loadECClients,
  }
}
