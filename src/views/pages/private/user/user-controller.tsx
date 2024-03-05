import { httpClient } from '@app/services/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'

export function useUserController() {

    const schema = z.object({
        name: z.string().min(1, {message: 'Nome é obrigatório'}),
        document: z.string().min(1, {message: 'CPF é obrigatório'}),
        email: z.string().email({message: 'E-mail inválido'}),
        phone: z.string().min(1, {message: 'Telefone é obrigatório'}),
        whatsapp: z.string().min(1, {message: 'Whatsapp é obrigatório'}),
        job: z.string().min(1, {message: 'Cargo é obrigatório'}),
        role: z.string(),
        accessLevel: z.string().min(1, {message: 'Nível de acesso é obrigatório'}),
        password: z.string().min(1, {message: 'Senha é obrigatória'}),
    })

    type formData = z.infer<typeof schema>
    const {
        register,
        formState: { errors },
        control,
        handleSubmit: hookFormHandleSubmit,
        reset,
    } = useForm<formData>({
        resolver: zodResolver(schema),
    })
    
    const handleCreateUser = hookFormHandleSubmit(async (data) => {
        try {
            await httpClient.post('/user', data)
        } catch (error:any) {
           alert(error.response.data.message)
           reset() 
        } finally {
              alert('Usuário criado com sucesso') 
            reset()
        }
    })

    

    return { register, errors, control, handleCreateUser }
}


