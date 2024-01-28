interface Props {
  className?: string
}

export function TrashIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.17 8.92v9.25c0 1.7-1.38 3.08-3.08 3.08H8.92c-1.7 0-3.08-1.38-3.08-3.08V8.92M3.78 5.83h16.44M8.92 5.83c0-1.7 1.38-3.08 3.08-3.08 1.7 0 3.08 1.38 3.08 3.08M9.94 12l4.12 4.11M14.06 12l-4.12 4.11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
