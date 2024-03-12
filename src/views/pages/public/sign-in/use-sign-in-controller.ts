import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '@app/hooks/use-auth'
import { useNotification } from '@app/hooks/use-notification'
import { httpClient } from '@app/services/http-client'
import { zodStringParser } from '@app/utils/custom-zod-error'

export function useSignInController() {
  const { successToast, errorToast, parseError } = useNotification()
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)

  const { signIn } = useAuth()

  const schema = z.object({
    document: z.string(zodStringParser('CPF')).min(1, 'CPF é obrigatório'),
    password: z
      .string(zodStringParser('password'))
      .min(1, 'Senha é obrigatória'),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setIsPending(true)

    try {
      const response = await httpClient.post('/auth/sessions', {
        ...data,
        document: data.document.replace(/\D/g, ''),
      })

      const { accessToken } = response.data

      signIn(accessToken)

      successToast({
        title: 'Login realizado com sucesso!',
        message: 'Seja bem-vindo a plataforma odonto mais.',
      })

      navigate('/')
    } catch (error) {
      errorToast({
        title: 'Erro ao realizar login!',
        message: parseError(error).message,
      })
    } finally {
      setIsPending(false)
    }
  })

  return {
    errors,
    control,
    isPending,
    register,
    handleSubmit,
  }
}
