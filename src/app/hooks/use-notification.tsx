import { useContext } from 'react'

import { NotificationContext } from '@app/contexts/notification'

export function useNotification() {
  return useContext(NotificationContext)
}
