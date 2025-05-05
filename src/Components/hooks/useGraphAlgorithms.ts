import { useState } from 'react';
import toast from 'react-hot-toast';
import { GraphData, Edge, AdjacencyList, AdjacencyNode } from '../types/graphTypes';

export const useGraphAlgorithms = (
  graphData: GraphData,
  vertices: string,
  setHighlightedNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
  setDistanceArray: React.Dispatch<React.SetStateAction<[string, number][]>>,
  setMstEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  setTopologicalOrder: React.Dispatch<React.SetStateAction<number[]>>,
  setIsDirected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const convertToAdjacencyList = (edges: Edge[], isDirected = false): AdjacencyList => {
    const verticesCount = parseInt(vertices, 10);
    const adjList: AdjacencyList = {};
    
    for (let i = 0; i < verticesCount; i++) {
      adjList[i] = [];
    }
  
    edges.forEach(edge => {
      adjList[edge.source].push({ node: edge.target, weight: edge.weight });
      if (!isDirected) {
        adjList[edge.target].push({ node: edge.source, weight: edge.weight });
      }
    });
  
    return adjList;
  };

  const dfs = async (startNode: number, adjList: AdjacencyList): Promise<number[]> => {
    const visited = new Set<number>();
    const stack: number[] = [startNode];
    const order: number[] = [];
    const highlighted = new Set<number>();
    
    while (stack.length > 0) {
      const node = stack.pop()!;
      highlighted.add(node);
      
      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);
        setHighlightedNodes(new Set(highlighted));
        setTopologicalOrder([...order]);
        await sleep(500);
        
        // Get neighbors in reverse to match expected DFS behavior
        const neighbors = [...adjList[node]].reverse();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor.node)) {
            stack.push(neighbor.node);
          }
        }
      }
    }
    return order;
  };

  const bfs = async (startNode: number, adjList: AdjacencyList): Promise<number[]> => {
    const visited = new Set<number>([startNode]);
    const queue: number[] = [startNode];
    const order: number[] = [];
    
    setHighlightedNodes(new Set(visited));
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      order.push(node);
      await sleep(500);
      
      for (const neighbor of adjList[node]) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          setHighlightedNodes(new Set(visited));
          queue.push(neighbor.node);
          await sleep(500);
        }
      }
    }
    return order;
  };

  const dijkstra = async (startNode: number, adjList: AdjacencyList) => {
    const verticesCount = parseInt(vertices, 10);
    const distances: Record<number, number> = {};
    const visited = new Set<number>();
    const previous: Record<number, number | null> = {};
    
    for (let i = 0; i < verticesCount; i++) {
      distances[i] = i === startNode ? 0 : Infinity;
      previous[i] = null;
    }

    while (visited.size < verticesCount) {
      let minDist = Infinity;
      let minVertex: number | null = null;
      
      for (let vertex = 0; vertex < verticesCount; vertex++) {
        if (!visited.has(vertex) && distances[vertex] < minDist) {
          minDist = distances[vertex];
          minVertex = vertex;
        }
      }
      
      if (minVertex === null || minDist === Infinity) break;
      
      visited.add(minVertex);
      setHighlightedNodes(new Set(visited));
      setDistanceArray(Object.entries(distances).map(([node, dist]) => [node, dist]));
      await sleep(500);
      
      for (const neighbor of adjList[minVertex]) {
        const alt = distances[minVertex] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = minVertex;
        }
      }
    }
    
    return { distances, previous };
  };

  const findSet = (parent: Record<number, number>, i: number): number => {
    if (parent[i] === i) return i;
    return findSet(parent, parent[i]);
  };

  const union = (parent: Record<number, number>, rank: Record<number, number>, x: number, y: number): void => {
    const rootX = findSet(parent, x);
    const rootY = findSet(parent, y);
    
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  };

  const kruskal = async (): Promise<Edge[]> => {
    const verticesCount = parseInt(vertices, 10);
    const edges = graphData.edges
      .map(edge => ({
        source: edge.source,
        target: edge.target,
        weight: edge.weight
      }))
      .sort((a, b) => a.weight - b.weight);

    const parent: Record<number, number> = {};
    const rank: Record<number, number> = {};
    const mst: Edge[] = [];

    for (let i = 0; i < verticesCount; i++) {
      parent[i] = i;
      rank[i] = 0;
    }

    const visitedNodes = new Set<number>();

    for (const edge of edges) {
      const rootSource = findSet(parent, edge.source);
      const rootTarget = findSet(parent, edge.target);

      if (rootSource !== rootTarget) {
        mst.push(edge);
        visitedNodes.add(edge.source);
        visitedNodes.add(edge.target);
        setMstEdges([...mst]);
        setHighlightedNodes(new Set(visitedNodes));
        await sleep(500);
        union(parent, rank, rootSource, rootTarget);
      }
    }

    return mst;
  };

  const prims = async (): Promise<Edge[]> => {
    const verticesCount = parseInt(vertices, 10);
    const adjList = convertToAdjacencyList(graphData.edges);
    const visited = new Set<number>();
    const mst: Edge[] = [];
    const minHeap: {from: number; to: number; weight: number}[] = [];
  
    visited.add(0);
    for (const neighbor of adjList[0]) {
      minHeap.push({ from: 0, to: neighbor.node, weight: neighbor.weight });
    }
  
    const compare = (a: {weight: number}, b: {weight: number}) => a.weight - b.weight;
  
    while (visited.size < verticesCount && minHeap.length > 0) {
      minHeap.sort(compare);
      const { from, to, weight } = minHeap.shift()!;
  
      if (visited.has(to)) continue;
  
      mst.push({ source: from, target: to, weight });
      visited.add(to);
      setMstEdges([...mst]);
      setHighlightedNodes(new Set(visited));
      await sleep(500);
  
      for (const neighbor of adjList[to]) {
        if (!visited.has(neighbor.node)) {
          minHeap.push({ from: to, to: neighbor.node, weight: neighbor.weight });
        }
      }
    }
  
    return mst;
  };

  const topologicalSortBFS = async (): Promise<number[]> => {
    const verticesCount = parseInt(vertices, 10);
    const adjList = convertToAdjacencyList(graphData.edges, true);
    const inDegree = Array(verticesCount).fill(0);
    const order: number[] = [];
  
    // Calculate in-degrees
    for (let u in adjList) {
      for (let neighbor of adjList[u]) {
        inDegree[neighbor.node]++;
      }
    }

    // Enqueue all nodes with in-degree 0
    const queue: number[] = [];
    for (let i = 0; i < verticesCount; i++) {
      if (inDegree[i] === 0) queue.push(i);
    }

    const highlighted = new Set<number>();
  
    while (queue.length > 0) {
      const node = queue.shift()!;
      order.push(node);
      highlighted.add(node);
      setHighlightedNodes(new Set(highlighted));
      setTopologicalOrder([...order]);
      await sleep(1000);
  
      for (let neighbor of adjList[node] || []) {
        inDegree[neighbor.node]--;
  
        if (inDegree[neighbor.node] === 0) {
          queue.push(neighbor.node);
        }
      }
    }
  
    // Check for cycle
    if (order.length !== verticesCount) {
      toast.error("Cycle detected! Topological sort not possible.");
      setTopologicalOrder([]);
      return [];
    }
  
    return order;
  };

  // Algorithm handler functions
  const handleDFS = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }

    toast.success("Running Depth-First Search...");
    setHighlightedNodes(new Set());
    setTopologicalOrder([]);
    const adjList = convertToAdjacencyList(graphData.edges);
    const order = await dfs(0, adjList);
    
    setTopologicalOrder(order);
    toast.success("DFS completed!");
  };

  const handleBFS = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    
    toast.success("Running Breadth-First Search...");
    setHighlightedNodes(new Set());
    setTopologicalOrder([]);
    const adjList = convertToAdjacencyList(graphData.edges);
    const order = await bfs(0, adjList);
    
    setTopologicalOrder(order);
    toast.success("BFS completed!");
  };

  const handleDijkstra = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    
    toast.success("Running Dijkstra's Algorithm...");
    setHighlightedNodes(new Set());
    setDistanceArray([]);
    const adjList = convertToAdjacencyList(graphData.edges);
    await dijkstra(0, adjList);
    
    toast.success("Dijkstra's Algorithm completed!");
  };

  const handleKruskal = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    
    toast.success("Running Kruskal's Algorithm...");
    setHighlightedNodes(new Set());
    setMstEdges([]);
    await kruskal();
    
    toast.success("Kruskal's Algorithm completed!");
  };

  const handlePrims = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    
    toast.success("Running Prim's Algorithm...");
    setHighlightedNodes(new Set());
    setMstEdges([]);
    await prims();
    
    toast.success("Prim's Algorithm completed!");
  };

  const handleTopologicalSort = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    
    toast.success("Running Topological Sort...");
    setIsDirected(true);
    setHighlightedNodes(new Set());
    setTopologicalOrder([]);
    await topologicalSortBFS();
    
    toast.success("Topological Sort completed!");
  };

  return {
    handleDFS,
    handleBFS,
    handleDijkstra,
    handleKruskal,
    handleTopologicalSort,
    handlePrims
  };
};