/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { cn } from '@app/utils/cn'

export interface SelectProps {
  id: number | string
  name: string
  hidden: string
}

interface Props {
  selected: SelectProps
  options: SelectProps[]
  onChange: (select: SelectProps) => void
  onSearch?: string
}

export function SelectFilters({
  selected,
  options,
  onChange,
  onSearch,
}: Props) {
  const [search, setSearch] = useState('')
  const [searchOptions, setSearchOptions] = useState<typeof options>(options)

  useEffect(() => {
    setSearchOptions(
      search.length >= 2
        ? searchOptions.filter((option) => option.hidden.includes(search))
        : options,
    )
  }, [search])

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className="mb-5 max-w-sm cursor-pointer rounded border border-main-gray bg-transparent  shadow-sm ring-0">
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded py-2 pl-3 pr-10 text-left focus:outline-none">
              <span className="block truncate">{selected.name}</span>
            </Listbox.Button>

            <ChevronDownIcon
              className="absolute right-3 top-3 z-30 h-5 w-5 text-gray-700"
              strokeWidth={3}
            />

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {onSearch && (
                  <input
                    name="b"
                    placeholder={onSearch}
                    value={search}
                    autoFocus
                    onChange={(input) => setSearch(input.target.value)}
                    className="text-tx-primary block w-full border-0 bg-transparent p-0 px-3 py-3 focus:ring-0"
                  />
                )}

                {searchOptions.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      cn(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active
                          ? 'mx-3 my-1.5 cursor-pointer rounded bg-dark-blue text-white shadow'
                          : 'text-gray-900',
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={cn({
                          'font-semibold': selected,
                          'ml-5 font-normal': !selected,
                          'flex w-full truncate': true,
                        })}
                      >
                        {selected && (
                          <CheckIcon
                            className="mb-px mr-1 w-4"
                            strokeWidth={2}
                          />
                        )}
                        {option.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
