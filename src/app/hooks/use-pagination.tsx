import { useContext } from 'react'

import { PaginationContext } from '@app/contexts/pagination-context'

export function usePagination() {
  return useContext(PaginationContext)
}
