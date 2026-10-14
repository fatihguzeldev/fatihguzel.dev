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
