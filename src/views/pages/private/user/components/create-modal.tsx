import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'
import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'

import { Button } from '@views/components/button'
import { cn } from '@app/utils/cn'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  hookForm: {
    errors: any
    control: any
    loading: boolean
    register: any
    setValue: any
    handleCreate: (event: React.FormEvent<HTMLFormElement>) => void
  }
}

export function CreateModal({ open, setOpen, hookForm }: Props) {
  const { errors, control, loading, register, handleCreate, setValue } =
    hookForm

  const [isPasswordVisible, setIsPasswordVisible] = useState<
    'password' | 'text'
  >('password')

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setValue('companyName', '')
    setValue('companyDocument', '')
    setValue('companyPhone', '')
    setValue('companyWhatsApp', '')
    setValue('companyEmail', '')
    setValue('companyZipCode', '')
    setValue('companyState', '')
    setValue('companyCity', '')
    setValue('companyNeighborhood', '')
    setValue('companyStreet', '')
    setValue('companyNumber', '')
    setValue('companyComplement', '')
    setValue('responsibleName', '')
    setValue('responsibleEmail', '')
    setValue('responsiblePhone', '')
    setValue('responsibleWhatsapp', '')
    setValue('responsibleDocument', '')
    setValue('responsibleZipCode', '')
    setValue('responsibleState', '')
    setValue('responsibleCity', '')
    setValue('responsibleNeighborhood', '')
    setValue('responsibleStreet', '')
    setValue('responsibleNumber', '')
    setValue('responsibleComplement', '')
  }, [setValue])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto lg:ml-36">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-1.5">
                  <div className="flex items-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-px sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-zinc-900"
                      >
                        Cadastrar agente financeiro - (A.F)
                      </Dialog.Title>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-gray-50 p-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon
                      className="h-7 w-7 text-red-500"
                      aria-hidden="true"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="px-8 py-3">
                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Nome"
                      placeholder="Digite o nome"
                      error={errors.name?.message}
                      {...register('name')}
                    />

                    <InputDocument
                      id="user_document"
                      label="CPF"
                      placeholder="Digite o CPF"
                      maxLength={14}
                      control={control}
                      error={errors.document?.message}
                      {...register('document')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="E-mail"
                      placeholder="Digite o e-mail"
                      error={errors.email?.message}
                      {...register('email')}
                    />

                    <Input
                      label="Nivel de acesso"
                      placeholder="Digite o nível de acesso"
                      defaultValue={'Agente Financeiro'}
                      error={errors.accessLevel?.message}
                      {...register('accessLevel')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <InputPhone
                      label="Telefone"
                      placeholder="Digite o telefone"
                      mask="+55 (99) 9999-9999"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />

                    <InputPhone
                      label="WhatsApp"
                      placeholder="Digite o whatsapp"
                      mask="+55 (99) 99999-9999"
                      error={errors.whatsapp?.message}
                      {...register('whatsapp')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <Input
                      label="Função"
                      placeholder="Digite sua função"
                      error={errors.job?.message}
                      {...register('job')}
                    />

                    <Input
                      label="Permissões"
                      placeholder="Digite as permissões"
                      error={errors.role?.message}
                      {...register('role')}
                    />
                  </div>

                  <div className="mb-1 flex flex-1 gap-3">
                    <div className="flex flex-col pb-6 w-full">
                      <label
                        htmlFor="input-password"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                      >
                        Digite sua senha:
                      </label>

                      <div className="relative">
                        <input
                          type={isPasswordVisible}
                          id="input-password"
                          {...register('password')}
                          placeholder="Digite sua senha"
                          className={cn(
                            'peer py-1.5 w-full rounded border border-zinc-400 placeholder:text-zinc-400 focus:border-green-hover focus:ring-0 disabled:pointer-events-none bg-white px-3 text-gray-800 shadow outline-none',
                            errors.password && '!border-red-600',
                          )}
                        />
                        <span
                          className="absolute right-0 top-[-7px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordVisible((prev) =>
                              prev === 'password' ? 'text' : 'password',
                            )
                          }}
                        >
                          {isPasswordVisible === 'password' ? (
                            <EyeIcon className="text-zinc-700 mx-3 my-2.5 h-8 w-8" />
                          ) : (
                            <EyeSlashIcon className="text-zinc-700 mx-3 my-2.5 h-8 w-8" />
                          )}
                        </span>
                      </div>

                      {errors.password && (
                        <div className="mt-2 flex items-center gap-1.5 text-red-600">
                          <XCircleIcon className="h-5" />
                          <span className="text-xs">
                            {errors.password?.message}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col pb-6 w-full">
                      <label
                        htmlFor="input-password"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                      >
                        Confirme sua senha:
                      </label>

                      <div className="relative">
                        <input
                          type={isPasswordVisible}
                          id="confirm-password"
                          {...register('confirmPassword')}
                          placeholder="Digite sua senha novamente"
                          className={cn(
                            'peer py-1.5 w-full rounded border border-zinc-400 placeholder:text-zinc-400 focus:border-green-hover focus:ring-0 disabled:pointer-events-none bg-white px-3 text-gray-800 shadow outline-none',
                            errors.password && '!border-red-600',
                          )}
                        />
                        <span
                          className="absolute right-0 top-[-7px] cursor-pointer"
                          onClick={() => {
                            setIsPasswordVisible((prev) =>
                              prev === 'password' ? 'text' : 'password',
                            )
                          }}
                        >
                          {isPasswordVisible === 'password' ? (
                            <EyeIcon className="text-zinc-700 mx-3 my-2.5 h-8 w-8" />
                          ) : (
                            <EyeSlashIcon className="text-zinc-700 mx-3 my-2.5 h-8 w-8" />
                          )}
                        </span>
                      </div>

                      {errors.confirmPassword && (
                        <div className="mt-2 flex items-center gap-1.5 text-red-600">
                          <XCircleIcon className="h-5" />
                          <span className="text-xs">
                            {errors.confirmPassword?.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="-mx-8 mt-4 bg-gray-50 px-4 py-1.5 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                      isLoading={loading}
                    >
                      Cadastrar
                    </Button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
