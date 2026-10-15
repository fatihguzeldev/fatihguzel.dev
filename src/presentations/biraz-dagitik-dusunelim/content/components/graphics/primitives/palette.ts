export const colors = {
  paper: '#f7f8fa',
  ink: '#1e2329',
  muted: '#636b75',
  line: '#c7cdd4',
  accent: '#ff5c35',
  accentInk: '#b9361c',
  tint: '#ffe5dd',
  white: '#ffffff',
} as const

export const diagramType = {
  node: 42,
  metadata: 28,
  record: 30,
  label: 32,
} as const

// Keep connector endpoints clear of frame strokes and arrowhead caps.
export const connectorGap = 12
