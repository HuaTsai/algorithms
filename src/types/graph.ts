export type NodeType = 'category' | 'algorithm' | 'problem';

export interface Node {
  id: string;
  name: string;
  group: string;
  type: NodeType;
  description: string;
  markdown: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface Graph {
  nodes: Node[];
  links: Link[];
}

