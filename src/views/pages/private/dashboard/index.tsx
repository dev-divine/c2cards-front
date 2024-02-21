import { useEffect, useState } from 'react'
import { endOfMonth, startOfMonth, subHours } from 'date-fns'

import { DashboardBanner } from '@views/pages/private/dashboard/components/dashboard-banner'
import { DashboardCard } from '@views/pages/private/dashboard/components/dashboard-card'
import { Datepicker } from '@views/components/date-picker'
// import { useDashboardController } from './use-dashboard-controller'

// import 'react-datepicker/dist/react-datepicker.css'

export function Dashboard() {
  // const {} = useDashboardController()

  const user = 'Ana'
  const qntdEC = 0

  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [startDate, endDate])

  return (
    <div className="flex h-full flex-col justify-between p-12 pt-10">
      <h1 className="text-4xl font-bold text-dark-blue">Dashboard agente</h1>

      <DashboardBanner client={user} />

      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">
          Selecione um período para filtrar:
        </h3>

        <Datepicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>

      <div className="flex gap-3 py-12">
        <DashboardCard
          title="Qntd. - E.C."
          amount={qntdEC}
          link="/ec_clients"
        />

        <DashboardCard title="Qntd. - OPT-In" amount={qntdEC} link="/opt_in" />

        <DashboardCard title="Valor agendas" amount={qntdEC} link="/agenda" />

        <DashboardCard title="URs" amount={qntdEC} link="/urs" />
      </div>
    </div>
  )
}
