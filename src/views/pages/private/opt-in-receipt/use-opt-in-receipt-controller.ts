import { zodDateParser, zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
// import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useOptInController() {
  const schema = z.object({
    company_name: z.string(zodStringParser('nome da empresa')),
    company_document: z
      .string(zodStringParser('CPF/CNPJ'))
      .min(11, 'O CPF deve ter 11 caracteres.')
      .max(14, 'O CNPJ deve ter 14 caracteres.'),
    b3_protocol: z.string(zodStringParser('protocolo B3')),
    c2_cards_protocol: z.string(zodStringParser('protocolo C2 Cards')),
    process_protocol: z.string(zodStringParser('protocolo do processo')),
    processing_date: z
      .string(zodStringParser('data de processamento'))
      .optional(),
    signature_date: z.date(zodDateParser('data de assinatura')).optional(),
    expiration_date: z.date(zodDateParser('data de vencimento')).optional(),
    optin_active: z
      .string(zodStringParser('optin ativo'))
      .transform((value) => value === 'yes'),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return {
    register,
    errors,
    control,
  }
}
