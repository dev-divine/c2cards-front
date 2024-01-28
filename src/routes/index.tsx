import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthGuard } from '@/routes/auth-guard'

// Public Routes
import { CourtReserve } from '@views/pages/public/court-reserve'
import { Enrollment } from '@views/pages/public/enrollment'
import { ForgotPassword } from '@views/pages/public/forgot-password'
import { Home } from '@views/pages/public/home'
import { ResetPassword } from '@views/pages/public/reset-password'
import { SignIn } from '@views/pages/public/sign-in'
import { SignUp } from '@views/pages/public/sign-up'

// Private Routes
import { PrivateLayout } from '@views/layouts/private'
import { AthletesDashboard } from '@views/pages/private/athletes-dashboard'
import { Citizen } from '@views/pages/private/citizen'
import { ClassesDashboard } from '@views/pages/private/classes-dashboard'
import { CoachesDashboard } from '@views/pages/private/coaches-dashboard'
import { GamesDashboard } from '@views/pages/private/games-dashboard'
import { GeneralObservationsDashboard } from '@views/pages/private/general-observations-dashboard'
import { SportsFacilitiesDashboard } from '@views/pages/private/sports-facilities-dashboard'

// Not found
import { AuthLayout } from '@views/layouts/public/auth-layout'
import { NotFound } from '@views/pages/public/not-found'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/court-reserve" element={<CourtReserve />} />

          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<GeneralObservationsDashboard />} />
            <Route path="/athletes-dashboard" element={<AthletesDashboard />} />
            <Route path="/citizen" element={<Citizen />} />
            <Route path="/classes-dashboard" element={<ClassesDashboard />} />
            <Route path="/coaches-dashboard" element={<CoachesDashboard />} />
            <Route path="/games-dashboard" element={<GamesDashboard />} />
            <Route
              path="/sports-facilities-dashboard"
              element={<SportsFacilitiesDashboard />}
            />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
