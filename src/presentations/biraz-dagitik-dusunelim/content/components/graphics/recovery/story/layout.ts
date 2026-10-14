export const storyLayout = {
  nodeTop: 270,
  messageGap: 32,
  tailHeight: 12,
  requestLevel: 154,
  replyLevel: 204,
} as const

export function messageHeight(lineCount: number) {
  return lineCount > 1 ? 132 : 108
}

export function messageTop(lineCount: number) {
  return (
    storyLayout.nodeTop -
    storyLayout.messageGap -
    storyLayout.tailHeight -
    messageHeight(lineCount)
  )
}
