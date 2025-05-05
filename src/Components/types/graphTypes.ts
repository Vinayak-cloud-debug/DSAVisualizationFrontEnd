export interface Node {
    id: number;
    name: string;
    x: number;
    y: number;
  }
  
  export interface Edge {
    source: number;
    target: number;
    weight: number;
  }
  
  export interface GraphData {
    nodes: Node[];
    edges: Edge[];
  }
  
  export interface AdjacencyNode {
    node: number;
    weight: number;
  }
  
  export type AdjacencyList = Record<number, AdjacencyNode[]>;