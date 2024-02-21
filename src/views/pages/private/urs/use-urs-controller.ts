import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { zodStringParser } from '@app/utils/custom-zod-error'

export function useUrsController() {
  const schema = z.object({
    email: z
      .string(zodStringParser('e-mail'))
      .email('O e-mail informado é inválido.')
      .optional(),
    ownership_transfer: z
      .string(zodStringParser('transferência de titularidade'))
      .transform((ownership) => ownership === 'yes')
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
