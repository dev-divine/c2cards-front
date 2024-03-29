import { PhotoIcon } from '@heroicons/react/24/solid'

import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'

import { useProfileController } from '@views/pages/private/profile/use-profile-controller'

export function Profile() {
  const { control, errors, handleSubmit, register, isPending } =
    useProfileController()

  return (
    <div className="flex h-full flex-col justify-between p-12 pt-10">
      <h1 className="text-4xl font-bold text-dark-blue">Configurações</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-4xl rounded bg-white px-5 py-8 shadow space-y-1.5"
      >
        <h3 className="mb-1.5 text-xl font-semibold">
          Informações da Empresa:
        </h3>

        <Input
          id="input-name"
          label="Nome"
          placeholder="Digite o nome"
          error={errors.name?.message}
          {...register('name')}
        />
        <InputDocument
          label="CPF"
          name="document"
          id="input-document"
          placeholder="Digite o CPF"
          control={control}
          error={errors.document?.message}
        />
        <Input
          id="input-email"
          label="E-mail"
          placeholder="Digite o e-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputPhone
          label="Telefone"
          placeholder="Digite o telefone"
          mask="+55 (99) 9999-9999"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <InputPhone
          label="WhatsApp"
          placeholder="Digite o telefone"
          mask="+55 (99) 99999-9999"
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />

        <label
          htmlFor="file-upload"
          className="block text-sm font-medium leading-6 text-zinc-900 pointer-events-none select-none"
        >
          Logo da sua empresa:
        </label>

        <label
          className="mt-2 b-6 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/50 px-6 py-10 shadow pointer-events-none select-none"
          htmlFor="file-upload"
        >
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-dark-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-dark-blue focus-within:ring-offset-2 hover:text-blue-800"
              >
                <span>Carregue um arquivo</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">ou arraste e jogue</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF até 10MB
            </p>
          </div>
        </label>

        <div className="py-2" />

        <Button
          type="submit"
          className=" w-full bg-dark-blue px-3"
          isLoading={isPending}
        >
          Salvar
        </Button>
      </form>
    </div>
  )
}
