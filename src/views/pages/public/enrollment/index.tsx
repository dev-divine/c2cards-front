import {
  InformationCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { GoBack } from '@views/components/go-back'
import { Input } from '@views/components/input'
import { Select } from '@views/components/select'
import { useEnrollmentController } from './use-enrollment-controller'
import { Controller } from 'react-hook-form'
import {
  genreOptions,
  gradeLevelOptions,
  periodOptions,
  schoolsOptions,
  shirtsAndShortsOptions,
  sportsOptions,
} from '../data/enrollment'

export function Enrollment() {
  const { register, errors, control, watch } = useEnrollmentController()

  const isModalityDefined = watch('desiredModality')
  const isSchoolDefined = watch('school')
  console.log(isSchoolDefined)

  return (
    <div className="flex flex-col items-center justify-center px-3 pb-20 sm:px-8 sm:pb-32">
      <div className="mt-4 w-full max-w-2xl sm:mt-8">
        <GoBack title="Página inicial" />
        <div className="my-12 flex flex-col justify-center">
          <h1 className="text-center text-xl font-medium text-primary drop-shadow-sm sm:text-2xl sm:font-semibold">
            Ficha de inscrição esportiva para lista de espera
          </h1>
          <p className="mx-auto mt-3 flex items-start gap-1.5 text-sm text-zinc-700">
            <InformationCircleIcon className="mt-0.5 h-4" />
            <span>Início dos treinamentos, dia 12 de fevereito de 2024.</span>
          </p>
        </div>
        <div className="mt-12">
          <h2 className="text-base font-semibold leading-7 text-zinc-900 sm:text-xl">
            Dados pessoais do atleta:
          </h2>
          <p className="mb-4 mt-1 text-sm leading-6 text-zinc-600 sm:text-base">
            Por favor, informe seus dados para um melhor conhecimento.
          </p>
        </div>

        <div className="w-full rounded bg-white shadow ring-1 ring-zinc-900/5 md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="w-full gap-x-6 space-y-4">
              <Input
                type="text"
                label="Nome:"
                placeholder="Digite o seu nome..."
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                type="email"
                label="E-mail:"
                placeholder="Digite o seu e-mail..."
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="flex items-end gap-3">
                <div className="max-w-[45%] flex-1">
                  <Input
                    type="date"
                    label="Aniversário:"
                    error={errors.birthdate?.message}
                    {...register('birthdate')}
                  />
                </div>

                <div className="flex-1">
                  <Input
                    type="tel"
                    label="Telefone:"
                    placeholder="Ex: (00) 90000-0000"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-[55%] flex-1">
                  <Input
                    type="text"
                    label="CPF:"
                    placeholder="Ex: 123.456.789-00"
                    error={errors.cpf?.message}
                    {...register('cpf')}
                  />
                </div>

                <div className="w-[40%]">
                  <Input
                    type="text"
                    label="RG:"
                    placeholder="Digite o seu RG"
                    error={errors.rg?.message}
                    {...register('rg')}
                  />
                </div>
              </div>

              <Input
                type="text"
                label="Bairro:"
                placeholder="Digite o seu bairro..."
                error={errors.neighborhood?.message}
                {...register('neighborhood')}
              />

              <Input
                type="text"
                label="Rua:"
                placeholder="Digite a sua rua..."
                error={errors.street?.message}
                {...register('street')}
              />

              <div className="flex gap-3">
                <div className="w-[30%]">
                  <Input
                    type="text"
                    label="Número:"
                    placeholder="Ex: 1234"
                    error={errors.number?.message}
                    {...register('number')}
                  />
                </div>

                <div className="flex-1">
                  <Input
                    type="text"
                    label="Complemento:"
                    placeholder="Complemento (opcional)"
                    error={errors.complement?.message}
                    {...register('complement')}
                  />
                </div>
              </div>

              <div className="flex gap-3 pb-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    label="Idade:"
                    placeholder="Ex: 18"
                    error={errors.age?.message}
                    {...register('age')}
                  />
                </div>

                <div className="flex-1">
                  <Input
                    type="text"
                    label="Peso:"
                    placeholder="Ex: 70.8 kg"
                    error={errors.weight?.message}
                    {...register('weight')}
                  />
                </div>

                <div className="flex-1">
                  <Input
                    type="number"
                    label="Altura:"
                    placeholder="Ex: 1.80 m"
                    error={errors.height?.message}
                    {...register('height')}
                  />
                </div>
              </div>

              <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

              <fieldset>
                <legend className="text-sm font-semibold uppercase leading-6 text-zinc-900">
                  Vacinado contra a COVID-19:
                </legend>

                <div className="mt-2 flex space-x-8">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="vaccinated-yes"
                      type="radio"
                      className="h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('vaccinated')}
                    />
                    <label
                      htmlFor="vaccinated-yes"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Sim
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="vaccinated-no"
                      type="radio"
                      className="h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('vaccinated')}
                    />
                    <label
                      htmlFor="vaccinated-no"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Não
                    </label>
                  </div>
                  {errors.vaccinated && <p>{errors.vaccinated.message}</p>}
                </div>
              </fieldset>

              <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

              <fieldset>
                <legend className="text-sm font-semibold uppercase leading-6 text-zinc-900">
                  Está em boas condições de saúde?
                </legend>

                <div className="mt-2 flex space-x-8">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="healthConditions-yes"
                      type="radio"
                      className="focus:ring-pritext-primary h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('healthConditions')}
                    />
                    <label
                      htmlFor="healthConditions-yes"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Sim
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="healthConditions-no"
                      type="radio"
                      className="h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('healthConditions')}
                    />
                    <label
                      htmlFor="healthConditions-no"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Não
                    </label>
                  </div>
                  {errors.healthConditions && (
                    <p>{errors.healthConditions.message}</p>
                  )}
                </div>
              </fieldset>

              <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

              {/* <fieldset>
                <legend className="text-sm font-semibold uppercase leading-6 text-zinc-900">
                  Sexo:
                </legend>

                <div className="mt-2 flex space-x-8">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="male"
                      type="radio"
                      className="focus:ring-pritext-primary h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('genre')}
                    />
                    <label
                      htmlFor="male"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Masculino
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="female"
                      type="radio"
                      className="h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('genre')}
                    />
                    <label
                      htmlFor="female"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Feminino
                    </label>
                  </div>
                  {errors.genre && <p>{errors.genre.message}</p>}
                </div>
              </fieldset> */}

              <Controller
                control={control}
                name="desiredModality"
                defaultValue="CHECKING"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Categoria:"
                    className=""
                    error={errors.desiredModality?.message}
                    onChange={onChange}
                    value={value}
                    options={sportsOptions}
                  />
                )}
              />

              <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

              {isModalityDefined && (
                <>
                  <Controller
                    control={control}
                    name="shirtSize"
                    defaultValue="CHECKING"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        error={errors.shirtSize?.message}
                        onChange={onChange}
                        placeholder="Tamanho da camisa:"
                        value={value}
                        options={shirtsAndShortsOptions}
                      />
                    )}
                  />

                  <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

                  <Controller
                    control={control}
                    name="shortSize"
                    defaultValue="CHECKING"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        error={errors.shortSize?.message}
                        onChange={onChange}
                        value={value}
                        placeholder="Tamanho do short:"
                        options={shirtsAndShortsOptions}
                      />
                    )}
                  />

                  <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />
                </>
              )}

              <Controller
                control={control}
                name="school"
                defaultValue="CHECKING"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Escola:"
                    className=""
                    error={errors.school?.message}
                    onChange={onChange}
                    value={value}
                    options={schoolsOptions}
                  />
                )}
              />

              {isSchoolDefined &&
                isSchoolDefined !== 'NAO_SOU_ALUNO' &&
                isSchoolDefined !== 'CHECKING' && (
                  <>
                    <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

                    <Controller
                      control={control}
                      name="gradeLevel"
                      defaultValue="CHECKING"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Série:"
                          error={errors.gradeLevel?.message}
                          onChange={onChange}
                          value={value}
                          options={gradeLevelOptions}
                        />
                      )}
                    />

                    <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

                    <Controller
                      control={control}
                      name="period"
                      defaultValue="CHECKING"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Período:"
                          error={errors.period?.message}
                          onChange={onChange}
                          value={value}
                          options={periodOptions}
                        />
                      )}
                    />
                  </>
                )}

              <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

              <Controller
                control={control}
                name="genre"
                defaultValue="CHECKING"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Sexo:"
                    error={errors.genre?.message}
                    onChange={onChange}
                    value={value}
                    options={genreOptions}
                  />
                )}
              />

              {/* <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-semibold leading-6 text-zinc-900"
                >
                  Foto de perfil (opcional):
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-zinc-300"
                    aria-hidden="true"
                  />

                  <label
                    htmlFor="file-upload"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                  >
                    <span>Carregar um arquivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>

                <p className="mt-2 flex gap-2 text-xs text-zinc-500">
                  <InformationCircleIcon className="h-4" />
                  <span>
                    Formatos aceitos:
                    <span className="mx-1 font-semibold text-zinc-700">
                      .png
                    </span>
                    e
                    <span className="mx-1 font-semibold text-zinc-700">
                      .jpg
                    </span>
                    até <span className="font-semibold text-zinc-700">2MB</span>
                  </span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 h-px w-full bg-zinc-900/10 sm:mt-24" />

      <div className="w-full max-w-2xl pt-8 sm:pt-20">
        <div>
          <h2 className="text-base font-semibold leading-7 text-zinc-900 sm:text-xl">
            Dados do responsável pelo aluno:
          </h2>
          <p className="mb-4 mt-1 text-sm leading-6 text-zinc-600 sm:text-base">
            Por favor, informe os dados do responsável pelo aluno para melhor
            comunicação e suporte.
          </p>
        </div>

        <div className="w-full rounded bg-white shadow ring-1 ring-zinc-900/5 md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="w-full gap-x-6 space-y-4">
              <Input
                type="text"
                label="Nome:"
                placeholder="Digite o seu nome..."
                error={errors.responsibleName?.message}
                {...register('responsibleName')}
              />

              <Input
                type="email"
                label="E-mail:"
                placeholder="Digite o seu e-mail..."
                error={errors.responsibleEmail?.message}
                {...register('responsibleEmail')}
              />

              <Input
                type="tel"
                label="Telefone:"
                placeholder="Ex: (00) 90000-0000"
                error={errors.responsiblePhone?.message}
                {...register('responsiblePhone')}
              />

              <div className="flex gap-3">
                <div className="w-[55%] flex-1">
                  <Input
                    type="text"
                    label="CPF:"
                    placeholder="Ex: 123.456.789-00"
                    error={errors.responsibleCpf?.message}
                    {...register('responsibleCpf')}
                  />
                </div>

                <div className="w-[40%]">
                  <Input
                    type="text"
                    label="RG:"
                    placeholder="Digite o seu RG"
                    error={errors.responsibleRg?.message}
                    {...register('responsibleRg')}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold uppercase leading-6 text-zinc-900">
                  Autoriza uso da imagem do atleta:
                </legend>

                <div className="mt-2 flex space-x-8">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="imageRelease-yes"
                      type="radio"
                      className="focus:ring-pritext-primary h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('imageRelease')}
                    />
                    <label
                      htmlFor="imageRelease-yes"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Sim
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <input
                      id="imageRelease-no"
                      type="radio"
                      className="h-4 w-4 border-zinc-300 text-primary focus:ring-primary"
                      {...register('imageRelease')}
                    />
                    <label
                      htmlFor="imageRelease-no"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Não
                    </label>
                  </div>
                  {errors.imageRelease && <p>{errors.imageRelease.message}</p>}
                </div>
              </fieldset>
            </div>

            <div className="mt-4 h-px w-full bg-zinc-900/10" />

            <div className="mb-1 mt-6 flex justify-end gap-4 sm:mt-8">
              <button
                type="button"
                className="w-full rounded border border-zinc-300 bg-transparent px-3 py-1.5 font-medium text-zinc-500 shadow transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 sm:w-40"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1 rounded bg-green-500 px-3 py-1.5 font-semibold text-white shadow transition-colors hover:bg-green-600 sm:w-40"
              >
                <PlusCircleIcon className="mt-0.5 h-5 text-white" />
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
