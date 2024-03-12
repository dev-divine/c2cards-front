import { ComponentProps, forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'
import { XCircleIcon } from '@heroicons/react/24/outline'

import { cn } from '@app/utils/cn'

interface Props extends ComponentProps<'input'> {
  name: string
  label: string
  error?: string
  mask?: string
  defaultValue?: string
}

export const InputPhone = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      label,
      name,
      mask,
      id,
      error,
      className,
      defaultValue,
      ...props
    },
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

        <ReactInputMask
          mask={mask ?? '+55 (99) 99999-9999'}
          maskChar={'_'}
          {...props}
          placeholder={placeholder}
          ref={ref as any}
          name={name}
          defaultValue={defaultValue}
          id={inputId}
          className={cn(
            'block w-full max-w-sm rounded border border-zinc-400 py-1.5 text-xs text-zinc-900 shadow placeholder:text-zinc-400 focus:border-green-hover focus:ring-0 sm:text-sm sm:leading-6',
            error && '!border-red-600',
            className,
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

InputPhone.displayName = 'InputPhone'
