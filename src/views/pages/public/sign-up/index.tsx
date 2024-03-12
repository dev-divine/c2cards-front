import { Link } from 'react-router-dom'

import logoImage from '@/assets/logo-dark.png'
import { useSignUpController } from '@views/pages/public/sign-up/use-sign-up-controller'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'
import { useState } from 'react'
import { cn } from '@app/utils/cn'
import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@views/components/button'

export function SignUp() {
  const { control, errors, handleSubmit, register, isPending } =
    useSignUpController()

  const [isPasswordVisible, setIsPasswordVisible] = useState<
    'password' | 'text'
  >('password')

  return (
    <div className="max-w-2xl items-center">
      <h1 className="pb-4 px-3 text-2xl">Bem-vindo(a) a</h1>
      <img src={logoImage} alt="alt" className="h-24 pl-3 mb-4 mx-auto" />
      <p className="px-3 text-main-green font-semibold mb-3">
        Desfrute da melhor tecnologia para o Fomento Comercial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2 px-3">
        <Input
          id="input-name"
          label="Nome"
          placeholder="Digite o nome"
          className="w-full max-w-2xl"
          error={errors.name?.message}
          {...register('name')}
        />
        <InputDocument
          label="CPF"
          placeholder="Digite o CPF"
          className="w-full max-w-2xl"
          maxLength={14}
          control={control}
          error={errors.document?.message}
          {...register('document')}
        />
        <Input
          id="input-email"
          label="E-mail"
          placeholder="Digite o e-mail"
          className="w-full max-w-2xl"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputPhone
          label="Telefone"
          placeholder="Digite o telefone"
          mask="+55 (99) 9999-9999"
          className="w-full max-w-2xl"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <InputPhone
          label="WhatsApp"
          placeholder="Digite o telefone"
          className="w-full max-w-2xl"
          mask="+55 (99) 99999-9999"
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />

        <div className="flex flex-col pb-6">
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
              <span className="text-xs">{errors.password?.message}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="mb-6 w-full bg-dark-blue px-3 mt-0 max-w-4xl"
          isLoading={isPending}
        >
          Cadastrar
        </Button>
      </form>

      <div className="px-3">
        <p className="px-3 text-center text-main-text mt-3">
          Já tem conta? Realize o login!
          <Link to="/sign-in" className="ml-1 font-semibold text-main-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
