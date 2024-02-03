import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { Button } from '@views/components/button'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useSignInController } from './use-sign-in-controller'

import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'
import { cn } from '@app/utils/cn'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export function SignIn() {
  const { register, errors, control, handleSubmit, isPending } =
    useSignInController()

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
          <div className="bg-lighter-blue border-main-text flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0">
            <EnvelopeIcon className="h-5" />
          </div>
          <label
            htmlFor="email-login"
            className="text-main-text absolute bottom-[52px] text-sm font-medium leading-6"
          >
            Endereço de e-mail:
          </label>
          <div className="flex flex-1 flex-col">
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <CpfCnpj
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="exemplo@gmail.com"
                  id="email-login"
                  className={cn(
                    'border-main-text text-main-text h-[52px] w-full rounded-r border bg-white px-3 shadow outline-none',
                    // errors && '!border-red-600',
                  )}
                />
              )}
            />

            {/* {error && (
              <div className="mt-2 flex items-center gap-1.5 text-red-600">
                <XCircleIcon className="h-5" />
                <span className="text-xs">{error}</span>
              </div>
            )} */}
          </div>
        </div>

        <div className="relative flex items-end">
          <div className="bg-lighter-blue border-main-text flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0">
            <LockClosedIcon className="h-5" />
          </div>
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="password-login"
              className="text-main-text absolute bottom-[52px] left-0 text-sm font-medium leading-6"
            >
              Senha:
            </label>

            <div className="relative">
              <input
                type={isPasswordVisible}
                name="password"
                id="password-login"
                placeholder="Senha"
                className={cn(
                  'border-main-text text-main-text h-[52px] w-full rounded-r border bg-white px-3 shadow outline-none',
                  // errors && '!border-red-600',
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
                  <EyeIcon className="text-dark-blue mx-3 my-2.5 h-8 w-7" />
                ) : (
                  <EyeSlashIcon className="text-dark-blue mx-3 my-2.5 h-7 w-7" />
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
          <p className="text-main-text mt-1 text-left font-medium">
            Esqueceu sua senha?
          </p>
        </Link>
      </form>

      <div className="px-3">
        <Button
          form="login"
          type="submit"
          className="bg-dark-blue my-6 w-full px-3"
          isLoading={isPending}
        >
          Entrar
        </Button>

        <p className="text-main-text px-3 text-center">
          Ainda não tem uma conta?
          <Link to="/sign-up" className="text-main-text ml-1 font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
