import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useAuth } from '@app/hooks/use-auth'
import { httpClient } from '@app/services/http-client'

export function useSignInController() {
  const navigate = useNavigate()

  const isPending = false

  const schema = z.object({
    document: z.string().min(1, 'CPF é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
    /*  email: z.string().email('E-mail inválido'),
    name: z.string().min(1, 'O nome é obrigatório'),
    birthdate: z.string().min(1, 'A data de nascimento é obrigatória'),
    phone: z.string().min(1, 'O telefone é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    rg: z.string().min(1, 'RG é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    age: z.number().min(0, 'Idade inválida'),
    weight: z.string().min(1, 'Peso é obrigatório'),
    height: z.number().min(0, 'Altura inválida'),
    vaccinated: z.enum(['yes', 'no']).optional(),
    healthConditions: z.enum(['yes', 'no']).optional(),
    genre: z.enum(['male', 'female']).optional(),
    responsibleName: z.string().min(1, 'Nome do responsável é obrigatório'),
    responsibleEmail: z.string().email('E-mail do responsável inválido'),
    responsiblePhone: z
      .string()
      .min(1, 'Telefone do responsável é obrigatório'),
    responsibleCpf: z.string().min(1, 'CPF do responsável é obrigatório'),
    responsibleRg: z.string().min(1, 'RG do responsável é obrigatório'),
    imageRelease: z.enum(['yes', 'no']).optional(), */
  })
  const { signIn } = useAuth()

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    
      
    try {

    console.warn(data)
      // requisição back
      const response = await httpClient.post('/auth/sessions', data)
        const { accessToken: accessToken } = response.data
        console.warn(accessToken)
        signIn(accessToken)
        navigate('/')
    
    } catch (error) {
      console.error(error, data)
      toast.error('Erro ao realizar login')
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
