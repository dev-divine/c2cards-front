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
import logoImage from '@/assets/logo-dark.png'
import { XCircleIcon } from '@heroicons/react/24/outline'

export function SignIn() {
  const { control, handleSubmit, isPending, errors } = useSignInController()

  console.log(errors)

  const [isPasswordVisible, setIsPasswordVisible] = useState<
    'password' | 'text'
  >('password')

  return (
    <div className="max-w-2xl items-center">
      <h1 className="pb-4 px-3 text-2xl">Bem-vindo(a) a</h1>
      <img src={logoImage} alt="alt" className="h-24 pl-3 mb-4 mx-auto" />
      <p className="px-3 text-main-green font-semibold mb-8">
        Desfrute da melhor tecnologia para o Fomento Comercial.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-8 px-3">
        <div className="flex flex-col justify-start">
          <div className="relative flex items-end">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0 border-main-text bg-lighter-blue">
              <EnvelopeIcon className="h-5" />
            </div>
            <label
              htmlFor="email-login"
              className="absolute bottom-[52px] text-sm font-medium leading-6 text-main-text"
            >
              CPF:
            </label>
            <div className="flex flex-1 flex-col">
              <Controller
                control={control}
                name="document"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <CpfCnpj
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="CPF"
                    id="document"
                    className={cn(
                      'h-[52px] w-full rounded-r border border-main-text bg-white px-3 text-main-text shadow focus:outline-none focus:ring-0 focus:border-green-hover',
                      errors.password && '!border-red-600',
                    )}
                  />
                )}
              />
            </div>
          </div>
          {errors.document && (
            <div className="mt-2 flex items-center gap-1.5 text-red-600">
              <XCircleIcon className="h-5" />
              <span className="text-xs">{errors.document?.message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start">
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
                        'h-[52px] w-full rounded-r border border-main-text bg-white px-3 text-main-text shadow focus:outline-none focus:ring-0 focus:border-green-hover',
                        errors.password && '!border-red-600',
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
            </div>
          </div>
          {errors.password && (
            <div className="mt-2 flex items-center gap-1.5 text-red-600">
              <XCircleIcon className="h-5" />
              <span className="text-xs">{errors.password?.message}</span>
            </div>
          )}
        </div>

        <Link to="/reset-password">
          <p className="mt-2 mb-0 text-left font-medium text-main-text">
            Esqueceu sua senha?
          </p>
        </Link>

        <Button
          type="submit"
          className="mb-6 w-full bg-dark-blue px-3 mt-0 max-w-4xl"
          isLoading={isPending}
        >
          Entrar
        </Button>
      </form>

      <div className="px-3">
        <p className="px-3 text-center text-main-text mt-3">
          Ainda não tem uma conta?
          <Link to="/sign-up" className="ml-1 font-semibold text-main-text">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
