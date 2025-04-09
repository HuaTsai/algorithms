export type NodeType = "category" | "algorithm" | "problem";

export interface NodeData {
  id: string;
  type: NodeType;
  title: string;
  source?: string;
  isGeneral?: boolean;
}

export interface LinkData {
  source: string;
  target: string;
}
