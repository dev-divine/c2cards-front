import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useAuth } from '@app/hooks/use-auth'

export function useEnrollmentController() {
  const navigate = useNavigate()

  const isPending = false

  const schema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
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
    genre: z.string().min(1, 'O genero é obrigatório'),
    school: z.string().min(1, 'A escolha da escola é obrigatória'),
    gradeLevel: z.string().min(1, 'A série é obrigatória'),
    period: z.string().min(1, 'O período é obrigatório'),
    responsibleName: z.string().min(1, 'Nome do responsável é obrigatório'),
    responsibleEmail: z.string().email('E-mail do responsável inválido'),
    responsiblePhone: z
      .string()
      .min(1, 'Telefone do responsável é obrigatório'),
    responsibleCpf: z.string().min(1, 'CPF do responsável é obrigatório'),
    responsibleRg: z.string().min(1, 'RG do responsável é obrigatório'),
    responsibleRelationship: z.enum(['father', 'mother']).optional(),
    desiredModality: z.string().min(1, 'Modalidade é obrigatória'),
    imageRelease: z.enum(['yes', 'no']).optional(),
    shirtSize: z.string().min(1, 'O tamanho da camisa é obrigatório.'),
    shortSize: z.string().min(1, 'O tamanho da short é obrigatório.'),
  })
  const { signIn } = useAuth()

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      // requisição back

      signIn('token')

      toast.success('Login realizado com sucesso')
      navigate('/home')
      // const { access_token: accessToken } = await mutateAsync(data)
      // signIn(accessToken)
    } catch (error) {
      console.error(error, data)
      toast.error('Erro ao realizar login')
    }
  })

  return {
    errors,
    control,
    isPending,
    watch,
    register,
    handleSubmit,
  }
}
