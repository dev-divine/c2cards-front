import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'

export function useSignUpController() {
  const navigate = useNavigate()

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
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return {
    errors,
    control,
    isPending,
    register,
    handleSubmit,
  }
}
