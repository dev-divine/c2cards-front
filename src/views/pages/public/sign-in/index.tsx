import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { Button } from '@views/components/button'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useSignInController } from './use-sign-in-controller'

import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'
import { cn } from '@app/utils/cn'
import { EnvelopeIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Input } from '@views/components/input'
import { Format } from '@app/utils/format'

export function SignIn() {
  const { control, handleSubmit, isPending, errors } = useSignInController()

  const [isPasswordVisible, setIsPasswordVisible] = useState<
    'password' | 'text'
  >('password')


 
  return (
    <div className="max-w-2xl items-center">
      <h1 className="pb-4 pl-3 text-2xl">Bem-vindo(a) a</h1>
      {/* <img src={logoImage} alt="alt" />
      <p>desfrute da melhor tecnologia para o Fomento Comercial</p> */}

      <form id="login" onSubmit={handleSubmit} className="mt-4 space-y-8 px-3">
        <div className="relative flex items-end">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0 border-main-text bg-lighter-blue">
            <EnvelopeIcon className="h-5" />
          </div>
          <label
            htmlFor="email-login"
            className="absolute bottom-[52px] text-sm font-medium leading-6 text-main-text"
          >
            Endereço de e-mail:
          </label>
          <div className="flex flex-1 flex-col">
            <Controller
              control={control}
              name="document"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <Input
                 
                  value={Format.document(value)}
                  onChange={onChange}
                  type="text"
                  placeholder="Documento"
                  id="email-login"
                  className={cn(
                    'h-[52px] w-full rounded-r border border-main-text bg-white px-3 text-main-text shadow outline-none',
                    errors && '!border-red-600'
                  )} label={''}                />
              )}
            />

            {/* {errors && (
              <div className="mt-2 flex items-center gap-1.5 text-red-600">
                <XCircleIcon className="h-5" />
                <span className="text-xs">{error}</span>
              </div>
            )} */}
          </div>
        </div>

        <div className="relative flex items-end">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0 border-main-text bg-lighter-blue">
            <LockClosedIcon className="h-5" />
          </div>
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="password-login"
              className="absolute bottom-[52px] left-0 text-sm font-medium leading-6 text-main-text"
            >
              Senha:
            </label>

            <div className="relative">
              <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
              <input
                type={isPasswordVisible}
                value={value}
                id="password-login"
                placeholder="Senha"
                onChange={onChange}
                className={cn(
                  'h-[52px] w-full rounded-r border border-main-text bg-white px-3 text-main-text shadow outline-none',
                  // errors && '!border-red-600',
                )}
              />
            )}
            />
              <span
                className="absolute right-0 cursor-pointer"
                onClick={() => {
                  setIsPasswordVisible((prev) =>
                    prev === 'password' ? 'text' : 'password',
                  )
                }}
              >
                {isPasswordVisible === 'password' ? (
                  <EyeIcon className="mx-3 my-2.5 h-8 w-7 text-dark-blue" />
                ) : (
                  <EyeSlashIcon className="mx-3 my-2.5 h-7 w-7 text-dark-blue" />
                )}
              </span>
            </div>

            {/* {error && (
              <div className="mt-2 flex items-center gap-1.5 text-red-600">
                <XCircleIcon className="h-5" />
                <span className="text-xs">{error}</span>
              </div>
            )} */}
          </div>
        </div>
        <Link to="/reset-password">
          <p className="mt-1 text-left font-medium text-main-text">
            Esqueceu sua senha?
          </p>
        </Link>
        <Button
          form="login"
          type="submit"
          className="my-6 w-full bg-dark-blue px-3"
          isLoading={isPending}
        >
          Entrar
        </Button>
      </form>

      <div className="px-3">

        <p className="px-3 text-center text-main-text">
          Ainda não tem uma conta?
          <Link to="/sign-up" className="ml-1 font-semibold text-main-text">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
