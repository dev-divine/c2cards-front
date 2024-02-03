import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { zodStringParser } from '@app/utils/custom-zod-error'

export function useProfileController() {
  const schema = z.object({
    phone: z
      .string(zodStringParser('telefone'))
      .min(1, { message: 'Telefone é obrigatório.' }),
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
