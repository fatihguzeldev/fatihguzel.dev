import { createTheme } from '../common/theme/theme'

export const chessColors = {
  ink: '#202522',
  ivory: '#f4efe3',
  green: '#75c98a',
  muted: '#b8c3ba',
  berry: '#8b3155',
  coral: '#f2a27e',
  squareLight: '#bac8b5',
  squareDark: '#49654f',
} as const

const greenSurface = {
  muted: '#3e4540',
  accent: '#024a20',
  negative: '#751c43',
  line: '#555c57',
} as const

export const talkTheme = {
  ...createTheme({
    background: chessColors.ink,
    foreground: chessColors.ivory,
    muted: chessColors.muted,
    accent: chessColors.green,
    fontSans: "'Bricolage Grotesque', sans-serif",
    fontMono: "'Bricolage Grotesque', sans-serif",
    spacing: 32,
    radius: 8,
  }),
  '--chess-ink': chessColors.ink,
  '--chess-ivory': chessColors.ivory,
  '--chess-green': chessColors.green,
  '--chess-surface': chessColors.ink,
  '--chess-text': chessColors.ivory,
  '--chess-muted': chessColors.muted,
  '--chess-accent': chessColors.green,
  '--chess-positive': chessColors.green,
  '--chess-negative': chessColors.coral,
  '--chess-line': '#68776b',
  '--chess-on-green-muted': greenSurface.muted,
  '--chess-on-green-accent': greenSurface.accent,
  '--chess-on-green-negative': greenSurface.negative,
  '--chess-on-green-line': greenSurface.line,
  '--chess-on-dark-muted': chessColors.muted,
  '--chess-on-dark-line': '#68776b',
  '--chess-berry': chessColors.berry,
  '--chess-coral': chessColors.coral,
  '--chess-square-light': chessColors.squareLight,
  '--chess-square-dark': chessColors.squareDark,
}
