export type NodeId = 'a' | 'b' | 'c'
export type TopologyNode = {
  id: NodeId
  role?: string
  entries?: string[]
  status?: string
  unreachable?: boolean
  active?: boolean
}
