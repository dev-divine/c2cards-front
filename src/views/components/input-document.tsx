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
      <div className="flex w-full flex-col">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-zinc-900"
        >
          {label}:
        </label>

        <Controller
          control={control}
          name={inputId}
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
                'block w-full max-w-sm rounded border border-zinc-400 py-1.5 text-xs text-zinc-900 shadow placeholder:text-zinc-400 focus:border-green-hover focus:ring-0 sm:text-sm sm:leading-6',
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
