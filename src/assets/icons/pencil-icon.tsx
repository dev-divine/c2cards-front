interface Props {
  className?: string
}

export function PencilIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.46 21.24L21.25 6.45l-3.7-3.7L2.76 17.54l-.01 3.71 3.71-.01zM15.35 6.13l2.52 2.52"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
