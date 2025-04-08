export type NodeType = "category" | "algorithm" | "problem";

export interface NodeData {
  id: string;
  type: NodeType;
}

export interface LinkData {
  source: string;
  target: string;
}
