export const minimaxReveals = [
  { branch: null, reply: null },
  { branch: 1, reply: null },
  { branch: 1, reply: 1 },
  { branch: 1, reply: 0 },
  { branch: 0, reply: null },
  { branch: 0, reply: 1 },
  { branch: 0, reply: 0 },
  { branch: null, reply: null },
] as const

export const pruningReveals = [
  { branch: null, reply: null },
  { branch: 1, reply: 0 },
  { branch: null, reply: null },
] as const
