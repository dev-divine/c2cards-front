import { XCircleIcon } from '@heroicons/react/24/outline'
import { ComponentProps, forwardRef, useState } from 'react'
import { cn } from '@app/utils/cn'
import { EyeIcon } from '@/assets/icons/eye-icon'
import { EyeSlashIcon } from '@/assets/icons/eye-slash-icon'

interface Props extends ComponentProps<'input'> {
  name: string
  label: string
  error?: string
}

export const InputPassword = forwardRef<HTMLInputElement, Props>(
  ({ label, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name

    const [isPasswordVisible, setIsPasswordVisible] = useState<
      'password' | 'text'
    >('password')

    return (
      <div className="flex flex-col">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-zinc-900"
        >
          {label}:
        </label>

        <div className="relative">
          <input
            {...props}
            ref={ref}
            type={isPasswordVisible}
            name={name}
            id={inputId}
            className={cn(
              'peer h-[52px] w-full rounded border border-zinc-900 bg-white px-3 text-gray-800 shadow outline-none',
              error && '!border-red-600',
              className,
            )}
          />
          <span
            className="absolute right-0 cursor-pointer"
            onClick={() => {
              setIsPasswordVisible((prev) =>
                prev === 'password' ? 'text' : 'password',
              )
            }}
          >
            {isPasswordVisible === 'password' ? (
              <EyeIcon className="mx-3 my-2.5 h-8 w-8 text-primary" />
            ) : (
              <EyeSlashIcon className="mx-3 my-2.5 h-8 w-8 text-primary" />
            )}
          </span>
        </div>

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
InputPassword.displayName = 'InputPassword'
