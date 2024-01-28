import { ComponentProps } from 'react'

import { cn } from '@/app/utils/cn'

import { Spinner } from '@views/components/spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'danger' | 'ghost'
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'max-w-1/2 flex h-12 w-full items-center justify-center rounded bg-primary px-6 font-bold text-white shadow transition-all hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
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
