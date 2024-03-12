import { zodDateParser, zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
// import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useAgendaController() {
  const schema = z.object({
    company_name: z.string(zodStringParser('nome da empresa')),
    company_document: z
      .string(zodStringParser('CPF/CNPJ'))
      .min(11, 'O CPF deve ter 11 caracteres.')
      .max(14, 'O CNPJ deve ter 14 caracteres.'),
    company_email: z
      .string(zodStringParser('e-mail'))
      .email('O e-mail informado é inválido.'),
    acquirer: z.string(zodStringParser('credenciadora')),
    responsible_name: z.string(zodStringParser('nome do responsável')),
    responsible_document: z
      .string(zodStringParser('CPF do responsável'))
      .transform((cpf) => cpf.replace(/\D/g, '')),
    responsible_email: z
      .string(zodStringParser('e-mail do responsável'))
      .email('O e-mail do responsável informado é inválido.'),
    responsible_phone: z
      .string(zodStringParser('telefone do responsável'))
      .min(1, 'O telefone é obrigatório.'),
    initial_date: z.date(zodDateParser('data de início')),
    end_date: z.date(zodDateParser('data de fim')),
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
