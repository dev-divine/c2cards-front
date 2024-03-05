import { XCircleIcon } from '@heroicons/react/24/outline'
import { ComponentProps, forwardRef } from 'react'
import { cn } from '@app/utils/cn'

interface Props extends ComponentProps<'input'> {
  name?: string
  label: string
  error?: string
  hidden?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, label, name, id, error, className, hidden, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className={`flex w-full flex-col ${hidden ? 'hidden': ''}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-zinc-900"
        >
          {label}:
        </label>

        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder={placeholder}
          className={cn(
            'block w-full max-w-sm rounded border border-zinc-400 py-1.5 text-xs text-zinc-900 shadow placeholder:text-zinc-400 focus:border-green-hover focus:ring-0 disabled:pointer-events-none sm:text-sm sm:leading-6',
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
Input.displayName = 'Input'
