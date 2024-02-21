import { PhotoIcon } from '@heroicons/react/24/solid'

import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { InputDocument } from '@views/components/input-document'
import { InputPhone } from '@views/components/input-phone'

import { useProfileController } from '@views/pages/private/profile/use-profile-controller'

export function Profile() {
  const { control } = useProfileController()
  return (
    <div className="flex h-full flex-col justify-between p-12 pt-10">
      <h1 className="text-4xl font-bold text-dark-blue">Configurações</h1>

      <div className="mt-10 max-w-4xl rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Informações da Empresa:</h3>

        <Input
          label="Razão Social:"
          placeholder="Digite o nome"
          name="name"
          className="mb-3"
        />
        <InputDocument
          name="document"
          label=" CPF/CNPJ"
          placeholder="Digite o CPF/CNPJ"
          control={control}
          className="mb-3"
        />

        <Input
          label="Endereço:"
          placeholder="Digite o endereço"
          name="address"
          className="mb-3"
        />

        <InputPhone
          id={'phone-id'}
          type="tel"
          label="Telefone:"
          placeholder="+55 (99) 99999-9999"
          name="phone"
          className="mb-3"
          // error={errors.phone?.message}
          // {...register('phone')}
        />

        <label
          htmlFor="file-upload"
          className="block text-sm font-medium leading-6 text-zinc-900"
        >
          Logo da sua empresa:
        </label>
        <label
          className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/50 px-6 py-10 shadow"
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
        <Button
          form="login"
          type="submit"
          className="my-6 w-full bg-dark-blue px-3"
          // isLoading={isPending}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
