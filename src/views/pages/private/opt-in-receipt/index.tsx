import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { cn } from '@app/utils/cn'

import { GoBack } from '@views/components/go-back'

import { OptInReceipt } from './components/opt-in'
import { OptOutReceipt } from './components/opt-out'

export function Receipt() {
  const location = useLocation()

  const [type, setType] = useState(location.state)

  return (
    <>
      <div className="flex w-full justify-between">
        <GoBack title="opt-in" />

        <div className="flex gap-3">
          <button
            type="button"
            className={cn(
              'rounded bg-dark-blue px-3 py-1.5 font-bold uppercase text-white shadow',
              type === 'opt-out' &&
                'border border-dark-blue bg-white text-dark-blue',
            )}
            onClick={() => setType('opt-in')}
          >
            Opt-in
          </button>

          <button
            type="button"
            className={cn(
              'rounded bg-dark-blue px-3 py-1.5 font-bold uppercase text-white shadow',
              type === 'opt-in' &&
                'border border-dark-blue bg-white text-dark-blue',
            )}
            onClick={() => setType('opt-out')}
          >
            Opt-out
          </button>
        </div>
      </div>

      {type === 'opt-in' ? <OptInReceipt /> : <OptOutReceipt />}
    </>
  )
}
