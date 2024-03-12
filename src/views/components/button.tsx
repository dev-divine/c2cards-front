import { ComponentProps } from 'react'

import { cn } from '@/app/utils/cn'

import { Spinner } from '@views/components/spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  type?: 'submit' | 'button' | 'reset'
  variant?: 'danger' | 'ghost'
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  type = 'button',
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'flex w-full max-w-sm items-center justify-center rounded bg-dark-blue px-6 py-2 font-bold text-white shadow transition-all hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' &&
          'border border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800/5',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="h-6 w-6" />}
    </button>
  )
}
