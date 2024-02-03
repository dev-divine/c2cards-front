interface Props {
  className?: string
}

export function DoubleProfileIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84 10.84a3.02 3.02 0 100-6.04 3.02 3.02 0 000 6.04zM2.75 19.2v-1.72c0-2 1.62-3.62 3.62-3.62h5.42c2 0 3.62 1.62 3.62 3.62v1.72M16.38 11.7a2.24 2.24 0 100-4.48 2.24 2.24 0 000 4.48zM17.02 13.94h1.54c1.48 0 2.68 1.2 2.68 2.68v1.28"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
