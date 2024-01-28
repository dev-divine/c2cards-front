import { ComponentProps, forwardRef } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Controller } from 'react-hook-form'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'

import { cn } from '@app/utils/cn'

interface Props extends ComponentProps<'input'> {
  name: string
  label: string
  placeholder?: string
  error?: string
  control?: any
}

export const InputDocument = forwardRef<HTMLInputElement, Props>(
  (
    { placeholder, label, control, name, id, error, className, ...props },
    ref,
  ) => {
    const inputId = id ?? name

    return (
      <div className="flex flex-col">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-zinc-900"
        >
          {label}:
        </label>

        <Controller
          control={control}
          name="document"
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <CpfCnpj
              {...props}
              value={value}
              onChange={onChange}
              type="text"
              placeholder={placeholder}
              id={inputId}
              ref={ref}
              className={cn(
                'h-[52px] w-full rounded border border-zinc-900 bg-white px-3 text-gray-800 shadow outline-none',
                error && '!border-red-600',
                className,
              )}
            />
          )}
        />

        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-red-600">
            <XCircleIcon className="h-5" />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)
InputDocument.displayName = 'InputDocument'
