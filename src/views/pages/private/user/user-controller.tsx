import { httpClient } from '@app/services/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useState } from 'react'

export function useUserController() {
    const [user, setUser] = useState({})

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

    const handleUpdateUser = async (id: string) => {
        /* const userTeste = {
            "id": "58f5d0bc-72d7-4066-b632-04a9c17e245b",
            "name": "Rodrigao",
            "document": "00000000000",
            "email": "lucas@lucas.com",
            "phone": "5521973400460",
            "whatsapp": "5511973400460",
            "job": "Op de caixa",
            "role": "CLIENTE_EC",
            "accessLevel": "Agente financeiro",
            "createdAt": "2024-03-05T12:58:53.878Z"
        } */
        
        console.warn(user)
        console.warn(id)
        try {
            await httpClient.put(`/user/${id}`, user)
        } catch (error:any) {
            alert(error.response.data.message)
        } finally {
            alert(`Usuário atualizado com sucesso ID: ${id}`)
            alert()
        }
    }

    

    return { register, errors, control, handleCreateUser, handleDeleteUser, handleFetchUser, handleUpdateUser}
}


