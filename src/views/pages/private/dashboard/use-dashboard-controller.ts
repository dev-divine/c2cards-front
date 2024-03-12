import { zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useDashboardController() {
  const schema = z.object({
    document: z
      .string(zodStringParser('CPF/CNPJ'))
      .min(11, 'O CPF deve ter 11 caracteres.')
      .max(14, 'O CNPJ deve ter 14 caracteres.'),
    company: z.string(zodStringParser('nome da empresa')),
    phone: z
      .string(zodStringParser('telefone'))
      .min(1, 'O telefone é obrigatório.'),
    email: z
      .string(zodStringParser('e-mail'))
      .email('O e-mail informado é inválido.'),
    zip_code: z.string(zodStringParser('CEP')),
    state: z.string(zodStringParser('estado')),
    city: z.string(zodStringParser('cidade')),
    neighborhood: z.string(zodStringParser('bairro')),
    street: z.string(zodStringParser('rua')),
    number: z.string(zodStringParser('número')),
    complement: z.string(zodStringParser('complemento')).optional(),
    responsible_name: z.string(zodStringParser('nome do responsável')),
    responsible_email: z
      .string(zodStringParser('e-mail do responsável'))
      .email('O e-mail do responsável informado é inválido.'),
    responsible_phone: z
      .string(zodStringParser('telefone do responsável'))
      .min(1, 'O telefone é obrigatório.'),
    responsible_document: z
      .string(zodStringParser('CPF do responsável'))
      .transform((cpf) => cpf.replace(/\D/g, '')),
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
