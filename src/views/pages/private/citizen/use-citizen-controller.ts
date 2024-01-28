import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { zodStringParser } from '@app/utils/custom-zod-error'

const schema = z.object({
  name: z.string(zodStringParser('nome')),
  cpf: z
    .string(zodStringParser('CPF'))
    .min(11, 'O CPF deve ter 11 caracteres.'),
  phone: z
    .string(zodStringParser('telefone'))
    .length(13, 'O telefone deve ter 13 caracteres.'),
})

export type FormData = z.infer<typeof schema>

export function useCitizenController() {
  const [open, setOpen] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log('Cadastro realizado com sucesso', data)
      setOpen(false)
    } catch (error) {
      console.log('Erro ao realizar cadastro')
    }
  })

  return {
    open,
    setOpen,
    register,
    errors,
    handleSubmit,
  }
}
