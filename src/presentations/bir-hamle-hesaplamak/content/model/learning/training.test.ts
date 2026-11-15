import assert from 'node:assert/strict'
import test from 'node:test'
import { geometryExamples } from '../../data/learning/positions'
import { kingContextExample } from '../../data/learning/context'
import { piecesFromFen } from '../chess/position'
import {
  lessonFeatures,
  lessonFit,
  lessonInputs,
  lessonJoint,
  lessonJointContribution,
  lessonLearned,
  lessonPredictions,
  lessonTarget,
  lessonWeightIndex,
  learnLessonContributions,
} from './training'

const near = (actual: number, expected: number) =>
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} ≠ ${expected}`)

const initialWeights = [0, 1, 1, 0, -1, -1, 0]

test('the lesson inputs encode every piece in the three compared boards', () => {
  const boards = [geometryExamples[0], geometryExamples[1], kingContextExample]
  const inputs = [lessonInputs.a4, lessonInputs.a3, lessonInputs.nearbyKing]
  for (const [index, position] of boards.entries()) {
    const pieces = piecesFromFen(position.fen)
    const encoded = lessonFeatures.map((feature) =>
      Number(
        pieces.some(
          (piece) =>
            piece.kind === feature.kind &&
            piece.color === feature.color &&
            piece.square === feature.square,
        ),
      ),
    )
    assert.deepEqual(encoded, [...inputs[index]])
    assert.equal(
      encoded.reduce<number>((sum, bit) => sum + bit, 0),
      pieces.length,
    )
  }
})

test('fitting the one Pa3 contribution exactly explains the measured A3 target', () => {
  near(lessonTarget, -5.89)
  near(lessonFit.prediction, 1)
  near(lessonFit.error, 6.89)
  near(lessonFit.fixedContribution, 2)
  near(lessonFit.initialContribution, -1)
  near(lessonFit.contribution, -7.89)
  near(lessonFit.nextPrediction, -5.89)
  near(lessonFit.nextPrediction, geometryExamples[1].scoreCp / 100)
})

test('the exact fit changes only the selected Pa3 entry', () => {
  assert.equal(lessonWeightIndex, 5)
  assert.equal(lessonFit.weights.length, initialWeights.length)
  for (let index = 0; index < initialWeights.length; index++) {
    near(lessonFit.weights[index], index === 5 ? -7.89 : initialWeights[index])
  }
})

test('fitting Pa3 leaves the independent A4 record unchanged', () => {
  near(lessonPredictions.a4, 1)
  near(lessonPredictions.a3Before, 1)
  near(lessonPredictions.a3After, -5.89)
  assert.equal(lessonInputs.a4[lessonWeightIndex], 0)
})

test('the fitted Pa3 entry still misjudges the nearby-king counterexample', () => {
  near(lessonPredictions.nearbyAfter, -5.89)
  near(lessonPredictions.nearbyAfter, lessonPredictions.a3After)
  assert.ok(kingContextExample.scoreCp > 0)
  assert.ok(lessonPredictions.nearbyAfter < 0)
})

test('the fit preserves the initial material values and exposes immutable fitted weights', () => {
  assert.deepEqual(
    lessonFeatures.map((feature) => feature.initialWeight),
    initialWeights,
  )
  assert.deepEqual([...lessonInputs.a3], [1, 1, 1, 1, 0, 1, 0])
  assert.throws(() => {
    ;(lessonFit.weights as number[])[5] = 0
  }, TypeError)
  near(lessonFit.weights[5], -7.89)
})

test('the joint correction fits both measured king contexts without changing the original student', () => {
  near(lessonJoint.correction, 11.93)
  near(lessonJoint.a3.basePrediction, -5.89)
  near(lessonJoint.a3.contribution, 0)
  near(lessonJoint.a3.prediction, geometryExamples[1].scoreCp / 100)
  near(lessonJoint.nearbyKing.basePrediction, -5.89)
  near(lessonJoint.nearbyKing.contribution, 11.93)
  near(lessonJoint.nearbyKing.prediction, kingContextExample.scoreCp / 100)
  near(lessonJoint.a4.contribution, 0)
  near(lessonJoint.a4.prediction, 1)
  near(lessonPredictions.a3After, -5.89)
  near(lessonPredictions.nearbyAfter, -5.89)
  near(lessonFit.contribution, -7.89)
})

test('neither the king-square feature nor the pawn-square feature alone enables the joint contribution', () => {
  near(lessonJointContribution(1, 0), 0)
  near(lessonJointContribution(0, 1), 0)
  near(lessonJointContribution(0, 0), 0)
  near(lessonJointContribution(1, 1), 11.93)
})

test('the two learned contributions reproduce both full-board teacher examples', () => {
  const targets = [geometryExamples[1], kingContextExample]
  near(lessonLearned.fixedContribution, 2)
  near(lessonLearned.pawnContribution, -7.89)
  near(lessonLearned.jointContribution, 11.93)
  assert.equal(lessonLearned.examples.length, 2)
  for (const [index, example] of lessonLearned.examples.entries()) {
    assert.equal(example.id, targets[index].id)
    assert.equal(example.fen, targets[index].fen)
    assert.equal(example.sideToMove, 'white')
    assert.equal(example.jointActive, index)
    near(example.target, targets[index].scoreCp / 100)
    near(example.prediction, example.target)
    near(
      example.prediction,
      2 + lessonLearned.pawnContribution + index * lessonLearned.jointContribution,
    )
  }
})

test('learning reduces the two-example error while preserving the earlier hand-fitted lesson', () => {
  const beforeLoss = lessonLearned.examples.reduce(
    (sum, example) => sum + (1 - example.target) ** 2 / 4,
    0,
  )
  const afterLoss = lessonLearned.examples.reduce(
    (sum, example) => sum + (example.prediction - example.target) ** 2 / 4,
    0,
  )
  assert.ok(beforeLoss > 0)
  assert.ok(afterLoss < 1e-20)
  assert.ok(afterLoss < beforeLoss)
  assert.deepEqual(
    lessonFeatures.map((feature) => feature.initialWeight),
    initialWeights,
  )
  near(lessonPredictions.a4, 1)
  near(lessonPredictions.nearbyAfter, -5.89)
  near(lessonJoint.nearbyKing.prediction, 6.04)
  near(lessonJoint.correction, 11.93)
  near(lessonFit.contribution, -7.89)
})

test('learning follows changed teacher targets rather than copying the hand-fitted coefficients', () => {
  for (const targets of [
    [-3, 9],
    [9, -3],
  ] as const) {
    const { fixedContribution, pawnContribution, jointContribution } =
      learnLessonContributions(targets)
    near(fixedContribution, 2)
    near(fixedContribution + pawnContribution, targets[0])
    near(fixedContribution + pawnContribution + jointContribution, targets[1])
  }
})
