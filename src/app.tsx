import { AppRoutes } from '@/routes'

import { NotificationProvider } from '@app/contexts/notification'
import { AuthProvider } from '@app/contexts/auth-context'
import { PaginationProvider } from '@app/contexts/pagination-context'

import './styles/index.css'

export function App() {
  return (
    
      <AuthProvider>
        <NotificationProvider>
          <PaginationProvider>
            <AppRoutes />
          </PaginationProvider>
        </NotificationProvider>
      </AuthProvider>
  )
}
