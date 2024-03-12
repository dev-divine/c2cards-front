import React from 'react'

export function ModalContentFooter() {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="button"
        className={cn(
          'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto',
          {
            'bg-red-600': type === 'danger',
            'bg-green-600': type === 'success',
            'bg-dark-blue hover:bg-blue-900': type === 'info' || 'title',
          },
        )}
        onClick={() => setOpen(false)}
      >
        {confirmText ?? 'Confirmar'}
      </button>

      {showCloseButton && (
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
          ref={cancelButtonRef}
        >
          {cancelText ?? 'Cancelar'}
        </button>
      )}
    </div>
  )
}
