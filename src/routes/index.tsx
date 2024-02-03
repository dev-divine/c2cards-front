import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import { AuthGuard } from '@/routes/auth-guard'

// Public Routes
import { ForgotPassword } from '@views/pages/public/forgot-password'
import { ResetPassword } from '@views/pages/public/reset-password'
import { SignIn } from '@views/pages/public/sign-in'
import { SignUp } from '@views/pages/public/sign-up'

import { AuthLayout } from '@views/layouts/public/auth-layout'
import { NotFound } from '@views/pages/public/not-found'

import { Dashboard } from '@views/pages/private/dashboard'
import { PrivateLayout } from '@views/layouts/private'
import { ECClients } from '@views/pages/private/ec-clients'
import { Profile } from '@views/pages/private/profile'
import { OptIn } from '@views/pages/private/opt-in'
import { Agenda } from '@views/pages/private/agenda'
import { Urs } from '@views/pages/private/urs'
import { Users } from '@views/pages/private/user'
import { LogOut } from '@views/pages/private/log-out'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ec-clients" element={<ECClients />} />
          <Route path="/opt-in" element={<OptIn />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/urs" element={<Urs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
