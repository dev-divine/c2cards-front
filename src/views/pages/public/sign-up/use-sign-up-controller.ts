import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@app/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useNotification } from '@app/hooks/use-notification'
import { httpClient } from '@app/services/http-client'
import { zodStringParser } from '@app/utils/custom-zod-error'

export function useSignUpController() {
  const { successToast, errorToast, parseError } = useNotification()
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)

  const schema = z.object({
    name: z.string(zodStringParser('nome')),
    document: z.string(zodStringParser('CPF')),
    email: z
      .string(zodStringParser('e-mail'))
      .email({ message: 'E-mail inválido' }),
    phone: z.string(zodStringParser('telefone')),
    whatsapp: z.string(zodStringParser('WhatsApp')),
    password: z.string(zodStringParser('senha')),
  })

  type formData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setIsPending(true)
    try {
      const response = await httpClient.post('/user', {
        ...data,
        document: data.document.replace(/\D/g, ''),
        phone: data.phone.replace(/[^\d+]/g, ''),
        whatsapp: data.whatsapp.replace(/[^\d+]/g, ''),
      })

      const { accessToken } = response.data

      signIn(accessToken)

      successToast({
        title: `Seja bem vindo ${response.data.user.name}!`,
        message:
          'Agora você já pode realizar login e utilizar nossa plataforma.',
      })

      navigate('/')
    } catch (error) {
      errorToast({
        title: 'Erro ao cadastrar usuário.',
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
