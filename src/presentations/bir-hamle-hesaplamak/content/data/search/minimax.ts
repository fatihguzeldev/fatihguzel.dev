// Real positions and measured White-POV leaf scores; only two moves and two replies are displayed.
const branches = [
  {
    id: 'safe',
    white: {
      san: 'Kb3',
      uci: 'c3b3',
      fen: '8/8/4k3/8/3PP3/pK6/8/8 b - - 1 1',
      sideToMove: 'black',
      legalMoves: 6,
    },
    replies: [
      {
        san: 'Kf6',
        uci: 'e6f6',
        fen: '8/8/5k2/8/3PP3/pK6/8/8 w - - 2 2',
        sideToMove: 'white',
        legalMoves: 9,
        score: 5.83,
        analysisId: 'kb3-kf6',
      },
      {
        san: 'a2',
        uci: 'a3a2',
        fen: '8/8/4k3/8/3PP3/1K6/p7/8 w - - 0 2',
        sideToMove: 'white',
        legalMoves: 10,
        score: 5.98,
        analysisId: 'kb3-a2',
      },
    ],
  },
  {
    id: 'tempting',
    white: {
      san: 'Kc4',
      uci: 'c3c4',
      fen: '8/8/4k3/8/2KPP3/p7/8/8 b - - 1 1',
      sideToMove: 'black',
      legalMoves: 6,
    },
    replies: [
      {
        san: 'a2',
        uci: 'a3a2',
        fen: '8/8/4k3/8/2KPP3/8/p7/8 w - - 0 2',
        sideToMove: 'white',
        legalMoves: 8,
        score: -5.82,
        analysisId: 'kc4-a2',
      },
      {
        san: 'Kf6',
        uci: 'e6f6',
        fen: '8/8/5k2/8/2KPP3/p7/8/8 w - - 2 2',
        sideToMove: 'white',
        legalMoves: 9,
        score: 6,
        analysisId: 'kc4-kf6',
      },
    ],
  },
] as const

const evaluatedBranches = branches.map((branch) => ({
  ...branch,
  treeValue: Math.min(...branch.replies.map((reply) => reply.score)),
}))

export const minimaxPosition = {
  rootFen: '8/8/4k3/8/3PP3/p1K5/8/8 w - - 0 1',
  sideToMove: 'white',
  legalMoves: 8,
  branches: evaluatedBranches,
  treeValue: Math.max(...evaluatedBranches.map((branch) => branch.treeValue)),
  // Separate searches have different horizons; these are not the displayed tree's backed-up values.
  verification: {
    unrestrictedRoot: { score: 6.04, bestMoveSan: 'Kb3', analysisId: 'root' },
    restrictedRoot: [
      { moveSan: 'Kb3', moveUci: 'c3b3', score: 5.79, analysisId: 'root-kb3' },
      { moveSan: 'Kc4', moveUci: 'c3c4', score: -5.82, analysisId: 'root-kc4' },
    ],
    unrestrictedBlackReplies: [
      { afterSan: 'Kb3', bestReplySan: 'Kf6', score: 5.89, analysisId: 'after-kb3' },
      { afterSan: 'Kc4', bestReplySan: 'a2', score: -6.51, analysisId: 'after-kc4' },
    ],
  },
  provenance: {
    engine: 'Stockfish 19',
    release: 'sf_19',
    network: 'nn-1a298aa575a0.nnue',
    measuredOn: '2026-11-15',
    threads: 1,
    hashMiB: 64,
    multiPV: 1,
    depth: 16,
    tablebases: false,
    freshProcessPerAnalysis: true,
    record: 'docs/measurements/sf19-minimax-2026-11-15.json',
    rawTranscript: 'docs/measurements/sf19-minimax-2026-11-15.uci.txt',
  },
} as const
