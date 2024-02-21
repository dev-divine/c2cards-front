import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useSignUpController() {
  const isPending = false

  const schema = z.object({
    document: z.string({ required_error: 'O CPF é obrigatório' }),
    password: z.string({ required_error: 'A senha é obrigatória' }),
  })
  // const { signIn } = useAuth()

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return {
    errors,
    control,
    isPending,
    register,
  }
}
