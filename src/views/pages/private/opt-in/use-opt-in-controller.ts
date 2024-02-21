import { zodStringParser } from '@app/utils/custom-zod-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function useOptInController() {
  const schema = z.object({
    company: z.string(zodStringParser('nome da empresa')),
    document: z
      .string(zodStringParser('CPF/CNPJ'))
      .min(11, 'O CPF deve ter 11 caracteres.')
      .max(14, 'O CNPJ deve ter 14 caracteres.'),
    responsible_name: z.string(zodStringParser('nome do responsável')),
    responsible_email: z
      .string(zodStringParser('e-mail do responsável'))
      .email('O e-mail do responsável informado é inválido.'),
    responsible_phone: z
      .string(zodStringParser('telefone do responsável'))
      .min(1, 'O telefone é obrigatório.'),
    responsible_document: z
      .string(zodStringParser('CPF do responsável'))
      .transform((cpf) => cpf.replace(/\D/g, '')),
    external_code: z.string(zodStringParser('código externo')).optional(),
    b3_protocol: z.string(zodStringParser('protocolo B3')).optional(),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // const handleSubmit = hookFormHandleSubmit(async (data: FormData) => {
  //   setLoading(true)
  //   window.scrollTo(0, 0)

  //   try {
  //     await citizensService.create(data)

  //     setOpen(false)

  //     successToast({
  //       title: 'Munícipe cadastrado com sucesso!',
  //       message: 'O munícipe foi cadastrado no sistema com sucesso.',
  //     })

  //     await loadCitizens()
  //   } catch (error) {
  //     errorToast({
  //       title: 'Erro ao cadastrar munícipe!',
  //       message:
  //         parseError(error).message ??
  //         'Não foi possível cadastrar o munícipe no sistema. Verifique sua conexão ou tente novamente mais tarde.',
  //       error,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // })

  // const handleSubmitEdit = hookFormHandleSubmit(async (data: FormData) => {
  //   setLoading(true)
  //   window.scrollTo(0, 0)

  //   try {
  //     await citizensService.save({ ...data, id: editItem.id })

  //     setOpenEdit(false)

  //     successToast({
  //       title: 'Munícipe editado com sucesso',
  //       message: 'Os dados do munícipe foram editados com sucesso no sistema.',
  //     })

  //     await loadCitizens()
  //   } catch (error) {
  //     errorToast({
  //       title: 'Erro ao editar munícipe!',
  //       message:
  //         parseError(error).message ??
  //         'Não foi possível editar os dados do munícipe. Verifique sua conexão ou tente novamente mais tarde.',
  //       error,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // })

  // async function handleSubmitDelete(id: string) {
  //   setLoading(true)
  //   window.scrollTo(0, 0)

  //   try {
  //     await citizensService.remove(id)

  //     setOpenDelete(false)

  //     successToast({
  //       title: 'Munícipe removido com sucesso!',
  //       message: 'O munícipe foi removido do sistema com sucesso.',
  //     })

  //     await loadCitizens()
  //   } catch (error) {
  //     errorToast({
  //       title: 'Erro ao remover munícipe!',
  //       message:
  //         parseError(error).message ??
  //         'Não foi possível remover o munícipe. Verifique sua conexão ou tente novamente mais tarde.',
  //       error,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // async function loadCitizens() {
  //   try {
  //     const data = await citizensService.list({
  //       page: currentPage,
  //       perPage: 10,
  //     })
  //     setCitizens(data.citizens)
  //     setTotalPages(data.totalPages)
  //   } catch (error) {
  //     errorToast({
  //       title: 'Erro ao carregar os munícipes!',
  //       message:
  //         parseError(error).message ??
  //         'Não foi possível carregar os munícipes. Por favor tente novamente mais tarde.',
  //       error,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const navigate = useNavigate()
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (user?.role.toString() === 'USER') {
  //     navigate('/enrollment')
  //   }
  //   loadCitizens()
  // }, [currentPage])

  return {
    register,
    errors,
    control,
  }
}
