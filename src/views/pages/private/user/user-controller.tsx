import { httpClient } from '@app/services/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'


export type User = {
    id: string
    name: string
    document: string
    email: string
    phone: string
    whatsapp: string
    job: string
    role: string
    accessLevel: string
    password: string
    createdAt: string
}

export function useUserController() {
    const [user, setUser] = useState() as [User | undefined, (user: User) => void]

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
        createdAt: z.string()
    })

    type formData = z.infer<typeof schema>
    const {
        register,
        formState: { errors },
        control,
        handleSubmit: hookFormHandleSubmit,
        reset,
         setValue,
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

    const handleDeleteUser = async (id: string) => {
        try {
            await httpClient.delete(`/user/${id}`)
        } catch (error:any) {
            alert(error.response.data.message)
        } finally {
            alert(`Usuário deletado com sucesso ID: ${id}`)
        }
    }

    const setUserData = (data: any) => {
        setUser(data)
    }

    useEffect(() => {
        setUserData(user)
    }, [user])

    const handleFetchUser = async (id: string) => {
        try {
            const response = await httpClient.get(`/user/${id}`)
            const userData = response.data.user
           
            setValue('name', userData.name)
            setValue('document', userData.document)
            setValue('email', userData.email)
            setValue('phone', userData.phone)
            setValue('whatsapp', userData.whatsapp)
            setValue('job', userData.job)
            setValue('role', userData.role)
            setValue('accessLevel', userData.accessLevel)
            setValue('createdAt', userData.createdAt)

            setUser(userData)
        } catch (error:any) {
            alert(error.response.data.message)
        }
    }

    const handleUpdateUser = hookFormHandleSubmit(async (data) => {

        try {
            await httpClient.put(`/user/${user?.id}`, data)
            reset()
        } catch (error:any) {
            alert(error.response.data.message)
        } finally {
            alert(`Usuário atualizado com sucesso ID: ${user?.id}`)
        } 
    } 

    )
    return { register, errors, control, handleCreateUser, handleDeleteUser, handleFetchUser, handleUpdateUser}
}


