import {
  type ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

interface PaginationContextValue {
  itemsLength: number
  setItemsLength: Dispatch<SetStateAction<number>>
  totalPages: number
  setTotalPages: Dispatch<SetStateAction<number>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const PaginationContext = createContext({} as PaginationContextValue)

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [itemsLength, setItemsLength] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <PaginationContext.Provider
      value={{
        itemsLength,
        setItemsLength,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
