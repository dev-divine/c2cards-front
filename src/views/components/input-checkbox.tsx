import { useController } from 'react-hook-form'

interface Option {
  label: string
  value: string
}

interface Props {
  name: string
  control: any
  label: string
  options: Option[]
}

export const InputCheckbox = ({ name, control, label, options }: Props) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <fieldset>
      <legend className="text-sm font-semibold uppercase leading-6 text-zinc-900">
        {label}
      </legend>
      <div className="flex space-x-8">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-x-3">
            <input
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
              checked={value === option.value}
              id={`${name}-${option.value}`}
              type="radio"
              className="focus:ring-darktext-dark-blue h-4 w-4 border-zinc-300 text-dark-blue"
              value={option.value}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="block text-sm font-medium leading-6 text-zinc-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p>{error.message}</p>}
    </fieldset>
  )
}
