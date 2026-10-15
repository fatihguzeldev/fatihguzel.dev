type MenuIconProps = {
  className?: string
}

export function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path data-line="top" d="M4 6h16" />
      <path data-line="middle" d="M4 12h16" />
      <path data-line="bottom" d="M4 18h16" />
    </svg>
  )
}
