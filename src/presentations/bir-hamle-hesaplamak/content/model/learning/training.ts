import { geometryExamples } from '../../data/learning/positions'
import { kingContextExample } from '../../data/learning/context'

const predict = (inputs: readonly number[], weights: readonly number[]) =>
  inputs.reduce((sum, input, index) => sum + input * weights[index], 0)

export const lessonFeatures = [
  { kind: 'king', color: 'white', square: 'e3', initialWeight: 0 },
  { kind: 'pawn', color: 'white', square: 'd4', initialWeight: 1 },
  { kind: 'pawn', color: 'white', square: 'e4', initialWeight: 1 },
  { kind: 'king', color: 'black', square: 'e6', initialWeight: 0 },
  { kind: 'pawn', color: 'black', square: 'a4', initialWeight: -1 },
  { kind: 'pawn', color: 'black', square: 'a3', initialWeight: -1 },
  { kind: 'king', color: 'white', square: 'c3', initialWeight: 0 },
] as const

export const lessonInputs = {
  a4: [1, 1, 1, 1, 1, 0, 0],
  a3: [1, 1, 1, 1, 0, 1, 0],
  nearbyKing: [0, 1, 1, 1, 0, 1, 1],
} as const

export const lessonWeightIndex = 5
export const lessonTarget = geometryExamples[1].scoreCp / 100

const initialWeights = lessonFeatures.map((feature) => feature.initialWeight)
const prediction = predict(lessonInputs.a3, initialWeights)
const fixedContribution = lessonInputs.a3.reduce<number>(
  (sum, input, index) =>
    sum + (index === lessonWeightIndex ? 0 : input * initialWeights[index]),
  0,
)
const contribution = lessonTarget - fixedContribution
const weights = Object.freeze(
  initialWeights.map((weight, index) =>
    index === lessonWeightIndex ? contribution : weight,
  ),
)

// This explains one observed score algebraically; it is not an optimization step or Stockfish's decomposition.
export const lessonFit = {
  prediction,
  error: prediction - lessonTarget,
  fixedContribution,
  initialContribution: initialWeights[lessonWeightIndex],
  contribution,
  weights,
  nextPrediction: predict(lessonInputs.a3, weights),
} as const

export const lessonPredictions = {
  a4: predict(lessonInputs.a4, weights),
  a3Before: lessonFit.prediction,
  a3After: lessonFit.nextPrediction,
  nearbyAfter: predict(lessonInputs.nearbyKing, weights),
} as const

// This correction is hand-fitted to two teacher search results, not extracted from Stockfish's NNUE.
const jointCorrection = kingContextExample.scoreCp / 100 - lessonPredictions.nearbyAfter

export function lessonJointContribution(kingC3: 0 | 1, pawnA3: 0 | 1) {
  return Math.max(0, kingC3 + pawnA3 - 1) * jointCorrection
}

function jointPrediction(inputs: readonly (0 | 1)[], basePrediction: number) {
  const contribution = lessonJointContribution(inputs[6], inputs[lessonWeightIndex])
  return { basePrediction, contribution, prediction: basePrediction + contribution }
}

export const lessonJoint = {
  correction: jointCorrection,
  a4: jointPrediction(lessonInputs.a4, lessonPredictions.a4),
  a3: jointPrediction(lessonInputs.a3, lessonPredictions.a3After),
  nearbyKing: jointPrediction(lessonInputs.nearbyKing, lessonPredictions.nearbyAfter),
} as const

// Only these two contributions are trained; fitting two examples does not establish generalization.
export function learnLessonContributions(targets: readonly [number, number]) {
  let pawnContribution: number = initialWeights[lessonWeightIndex]
  let jointContribution = 0
  const learningRate = 0.2

  for (let step = 0; step < 1000; step++) {
    const farError = fixedContribution + pawnContribution - targets[0]
    const nearError =
      fixedContribution + pawnContribution + jointContribution - targets[1]
    // Batch gradient of mean half-squared error; both gradients use the same current weights.
    pawnContribution -= (learningRate * (farError + nearError)) / 2
    jointContribution -= (learningRate * nearError) / 2
  }

  return { fixedContribution, pawnContribution, jointContribution }
}

const learningPositions = [geometryExamples[1], kingContextExample] as const
const learned = learnLessonContributions([
  learningPositions[0].scoreCp / 100,
  learningPositions[1].scoreCp / 100,
])

export const lessonLearned = {
  ...learned,
  examples: learningPositions.map((position, index) => {
    const jointActive = index === 0 ? 0 : 1
    return {
      id: position.id,
      fen: position.fen,
      sideToMove: position.sideToMove,
      target: position.scoreCp / 100,
      prediction:
        learned.fixedContribution +
        learned.pawnContribution +
        jointActive * learned.jointContribution,
      jointActive,
    }
  }),
} as const
