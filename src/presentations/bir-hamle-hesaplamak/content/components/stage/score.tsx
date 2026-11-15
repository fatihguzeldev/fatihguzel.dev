export function Score({ value }: { value: string }) {
  return (
    <p
      className={`chess-score ${value.startsWith('-') ? 'chess-score--negative' : 'chess-score--positive'}`}
    >
      {value.replace('-', '−')}
    </p>
  )
}
