import logoImage from '@/assets/logo.png'

import { GoBack } from '@views/components/go-back'
import { Link } from 'react-router-dom'
import { useSignInController } from './use-sign-in-controller'
import { InputDocument } from '@views/components/input-document'
import { Button } from '@views/components/button'
import { InputPassword } from '@views/components/input-password'

export function SignIn() {
  const { register, errors, control, handleSubmit, isPending } =
    useSignInController()

  return (
    <div className="max-w-2xl items-center">
      <GoBack title="a Página Inicial" />
      <h1 className="mb-2 mt-12 pl-3 text-2xl">Bem-vindo(a) a</h1>
      <img
        src={logoImage}
        alt="Logo da Secretária de Esportes"
        className="mx-auto w-64 pl-3 shadow-white"
      />

      <form id="login" onSubmit={handleSubmit} className="mt-4 space-y-3 px-3">
        <InputDocument
          label="CPF"
          placeholder="Ex: 123.456.789-00"
          control={control}
          maxLength={14}
          error={errors.document?.message}
          {...register('document')}
        />

        <InputPassword
          label="Senha"
          placeholder="********"
          error={errors.password?.message}
          {...register('password')}
        />
      </form>

      <div className="px-3">
        <Button
          form="login"
          type="submit"
          className="mt-6 w-full px-3"
          isLoading={isPending}
        >
          Entrar
        </Button>

        <Link to="/reset-password">
          <p className="mt-6 text-center font-semibold text-zinc-900">
            Recuperar minha senha
          </p>
        </Link>

        <div className="mx-6 my-5 h-px bg-primary" />

        <p className="px-3 text-center">
          Ainda não tem uma conta?
          <Link to="/sign-up" className="ml-1 font-semibold text-zinc-900">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
