export function PresentationMark() {
  return (
    <svg viewBox="0 0 64 56" fill="none" aria-hidden="true">
      <path d="M7 16H48V45H7z" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
      <path
        d="M15 8H57V37H15z"
        fill="var(--bg)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M23 18H40M23 25H49" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  )
}

export function PresentationArrow({ external = false }: { external?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {external ? (
        <path d="M6 18L18 6M7 6H18V17" />
      ) : (
        <path d="M4 12H20M13 5L20 12L13 19" />
      )}
    </svg>
  )
}
