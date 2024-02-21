import { useState } from 'react'
import * as RdxSelect from '@radix-ui/react-select'
import {
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@app/utils/cn'

interface Props {
  className?: string
  error?: string
  placeholder?: string
  options: {
    value: string
    label: string
  }[]
  value?: string
  onChange?(value: string): void
}

export function Select({
  className,
  placeholder,
  options,
  error,
  onChange,
  value,
}: Props) {
  const [selectedValue, setSelectedValue] = useState(value ?? '')

  function handleSelect(value: string) {
    setSelectedValue(value)
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 z-[99] -translate-y-1/2 text-gray-700',
            selectedValue &&
              'left-[13px] top-2 translate-y-0 text-xs transition-all',
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'relative h-[52px] w-full rounded border border-gray-500 bg-white px-3 pt-4 text-left text-gray-800 shadow outline-none transition-all focus:border-gray-800',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon className="h-6 text-gray-800" />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="rounded-lg p-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 data-[state=checked]:font-semibold"
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon className="h-6 text-gray-800" />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircleIcon className="h-6 text-gray-800" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
