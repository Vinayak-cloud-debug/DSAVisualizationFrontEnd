

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { RefreshCcw, Plus, Trash2, Share2 } from "lucide-react";

const GraphVisualization = () => {
  const [vertices, setVertices] = useState("");
  const [edges, setEdges] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [distanceArray, setDistanceArray] = useState([]);
  const [mstEdges, setMstEdges] = useState([]);
  const [topologicalOrder, setTopologicalOrder] = useState([]);
  const [weights, setWeights] = useState({});
  const [isDirected, setIsDirected] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500); // milliseconds

  // Get graph ID from session storage
  const graphId = sessionStorage.getItem("id") || "";

  // Calculate node positions in a circle
  const calculateNodePositions = (numNodes, radius = 150) => {
    const centerX = 300;
    const centerY = 250;
    return Array.from({ length: numNodes }, (_, i) => {
      const angle = (i * 2 * Math.PI) / numNodes;
      return {
        id: i,
        name: `${i}`,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  };

  const handleVerticesChange = (val) => {
    if (val === "") {
      setVertices("");
    } else {
      const value = parseInt(val, 10);
      if (value > 0) {
        setVertices(value);
        setEdges([]);
        setGraphData({ nodes: [], edges: [] });
        resetAlgorithmState();
      }
    }
  };

  const resetAlgorithmState = () => {
    setHighlightedNodes(new Set());
    setDistanceArray([]);
    setMstEdges([]);
    setTopologicalOrder([]);
    setWeights({});
    setIsDirected(false);
    setIsAnimating(false);
  };

  const handleEdgeChange = (e, index) => {
    const newEdges = [...edges];
    newEdges[index] = e.target.value;
    setEdges(newEdges);
  };

  const handleWeightChange = (edge, weight) => {
    setWeights({ ...weights, [edge]: parseInt(weight, 10) || 0 });
  };

  const addEdge = () => {
    if (vertices !== 0 && vertices !== "") {
      setEdges([...edges, ""]);
    } else {
      toast.error("Please enter the number of vertices");
    }
  };

  const removeEdge = (index) => {
    setEdges(edges.filter((_, i) => i !== index));
    const newWeights = { ...weights };
    delete newWeights[edges[index]];
    setWeights(newWeights);
  };

  const validateEdge = (source, target) => {
    return (
      !isNaN(source) &&
      !isNaN(target) &&
      source >= 0 &&
      source < vertices &&
      target >= 0 &&
      target < vertices &&
      source !== target
    );
  };

  const generateRandomGraph = () => {
    if (vertices <= 0 || vertices === "") {
      toast.error("Please enter a valid number of vertices");
      return;
    }

    // Reset current graph
    resetAlgorithmState();
    
    const numVertices = parseInt(vertices, 10);
    const maxEdges = Math.min(numVertices * (numVertices - 1) / 2, numVertices * 3); // Limit number of edges
    const numEdges = Math.floor(Math.random() * maxEdges) + numVertices; // At least numVertices edges to ensure connectivity
    
    const newEdges = [];
    const edgeSet = new Set(); // To track existing edges
    
    // Generate random edges
    for (let i = 0; i < numEdges; i++) {
      let source, target;
      let edgeString;
      
      // Keep trying until we get a new valid edge
      do {
        source = Math.floor(Math.random() * numVertices);
        target = Math.floor(Math.random() * numVertices);
        edgeString = `${source} ${target}`;
        
        // Make sure we don't have self-loops or duplicates
      } while (source === target || edgeSet.has(edgeString) || edgeSet.has(`${target} ${source}`));
      
      edgeSet.add(edgeString);
      newEdges.push(edgeString);
      
      // Generate random weight between 1 and 10
      const weight = Math.floor(Math.random() * 10) + 1;
      weights[edgeString] = weight;
    }
    
    setEdges(newEdges);
    setWeights({...weights});
    
    toast.success(`Generated a random graph with ${numVertices} vertices and ${newEdges.length} edges`);
    
    // Auto-generate the graph visualization
    handleSubmit();
  };

  const handleSubmit = () => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: "smooth",
    });

    if (vertices <= 0 || edges.length === 0) {
      toast.error("Please enter valid values for vertices and edges.");
      return;
    }

    const validEdges = [];
    for (const edge of edges) {
      const [source, target] = edge.split(" ").map((num) => parseInt(num.trim(), 10));

      if (!validateEdge(source, target)) {
        toast.error(`Invalid edge: ${edge}. Edges must be valid vertex pairs.`);
        return;
      }

      validEdges.push([source, target]);
    }

    const nodes = calculateNodePositions(parseInt(vertices, 10));
    const graphEdges = validEdges.map(([source, target]) => ({
      source,
      target,
      weight: weights[`${source} ${target}`] || 0,
    }));

    setGraphData({ nodes, edges: graphEdges });
    resetAlgorithmState();
  };

  const convertToAdjacencyList = (edges, directed = false) => {
    const adjList = {};
    for (let i = 0; i < vertices; i++) {
      adjList[i] = [];
    }

    edges.forEach((edge) => {
      adjList[edge.source].push({ node: edge.target, weight: edge.weight });
      if (!directed) {
        adjList[edge.target].push({ node: edge.source, weight: edge.weight });
      }
    });

    return adjList;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dfs = async (startNode, adjList) => {
    setIsAnimating(true);
    const visited = new Set();
    const stack = [startNode];
    const order = [];

    const highlighted = new Set();

    try {
      while (stack.length > 0) {
        const node = stack.pop();

        highlighted.add(node);

        if (!visited.has(node)) {
          visited.add(node);
          order.push(node);
          setHighlightedNodes(new Set(highlighted));
          setTopologicalOrder([...order]);
          await sleep(animationSpeed);

          // Process neighbors in reverse to match expected DFS behavior
          for (let i = adjList[node].length - 1; i >= 0; i--) {
            const neighbor = adjList[node][i];
            if (!visited.has(neighbor.node)) {
              stack.push(neighbor.node);
            }
          }
        }
      }
      return order;
    } finally {
      setIsAnimating(false);
    }
  };

  const bfs = async (startNode, adjList) => {
    setIsAnimating(true);
    const visited = new Set();
    const queue = [startNode];
    const order = [];
    visited.add(startNode);
    setHighlightedNodes(new Set(visited));

    try {
      while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);
        await sleep(animationSpeed);

        for (const neighbor of adjList[node]) {
          if (!visited.has(neighbor.node)) {
            visited.add(neighbor.node);
            setHighlightedNodes(new Set(visited));
            queue.push(neighbor.node);
            await sleep(animationSpeed);
          }
        }
      }
      return order;
    } finally {
      setIsAnimating(false);
    }
  };

  const dijkstra = async (startNode, adjList) => {
    setIsAnimating(true);
    const distances = {};
    const visited = new Set();
    const previous = {};

    for (let i = 0; i < vertices; i++) {
      distances[i] = i === startNode ? 0 : Infinity;
    }

    try {
      while (visited.size < vertices) {
        let minDist = Infinity;
        let minVertex = null;

        for (let vertex = 0; vertex < vertices; vertex++) {
          if (!visited.has(vertex) && distances[vertex] < minDist) {
            minDist = distances[vertex];
            minVertex = vertex;
          }
        }

        if (minVertex === null) break;

        visited.add(minVertex);
        setHighlightedNodes(new Set(visited));
        setDistanceArray([...Object.entries(distances)]);
        await sleep(animationSpeed);

        for (const neighbor of adjList[minVertex]) {
          const alt = distances[minVertex] + neighbor.weight;
          if (alt < distances[neighbor.node]) {
            distances[neighbor.node] = alt;
            previous[neighbor.node] = minVertex;
          }
        }
      }

      return { distances, previous };
    } finally {
      setIsAnimating(false);
    }
  };

  const findSet = (parent, i) => {
    if (parent[i] === i) return i;
    return findSet(parent, parent[i]);
  };

  const union = (parent, rank, x, y) => {
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

  const kruskal = async () => {
    setIsAnimating(true);
    const edges = graphData.edges
      .map((edge) => ({
        source: edge.source,
        target: edge.target,
        weight: edge.weight,
      }))
      .sort((a, b) => a.weight - b.weight);

    const parent = {};
    const rank = {};
    const mst = [];

    for (let i = 0; i < vertices; i++) {
      parent[i] = i;
      rank[i] = 0;
    }

    try {
      for (const edge of edges) {
        const rootSource = findSet(parent, edge.source);
        const rootTarget = findSet(parent, edge.target);

        if (rootSource !== rootTarget) {
          mst.push(edge);
          setMstEdges([...mst]);
          await sleep(animationSpeed);
          union(parent, rank, rootSource, rootTarget);
        }
      }

      return mst;
    } finally {
      setIsAnimating(false);
    }
  };

  const prims = async () => {
    setIsAnimating(true);
    const adjList = convertToAdjacencyList(graphData.edges);
    const visited = new Set();
    const mst = [];
    const minHeap = [];

    visited.add(0);
    for (const neighbor of adjList[0]) {
      minHeap.push({ from: 0, to: neighbor.node, weight: neighbor.weight });
    }

    const compare = (a, b) => a.weight - b.weight;

    try {
      while (visited.size < vertices && minHeap.length > 0) {
        minHeap.sort(compare); // Priority queue using sort
        const { from, to, weight } = minHeap.shift();

        if (visited.has(to)) continue;

        mst.push({ source: from, target: to, weight });
        visited.add(to);
        setMstEdges([...mst]);
        setHighlightedNodes(new Set(visited));
        await sleep(animationSpeed);

        for (const neighbor of adjList[to]) {
          if (!visited.has(neighbor.node)) {
            minHeap.push({
              from: to,
              to: neighbor.node,
              weight: neighbor.weight,
            });
          }
        }
      }

      return mst;
    } finally {
      setIsAnimating(false);
    }
  };

  const topologicalSortBFS = async () => {
    setIsAnimating(true);
    const adjList = convertToAdjacencyList(graphData.edges, true); // Directed graph
    const inDegree = Array(parseInt(vertices, 10)).fill(0);
    const order = [];

    // Step 1: Calculate in-degrees
    for (let u in adjList) {
      for (let neighbor of adjList[u]) {
        const v = typeof neighbor === "object" ? neighbor.node : neighbor;
        inDegree[v]++;
      }
    }

    // Step 2: Enqueue all nodes with in-degree 0
    const queue = [];
    for (let i = 0; i < vertices; i++) {
      if (inDegree[i] === 0) queue.push(i);
    }

    const highlighted = new Set();

    try {
      while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);
        highlighted.add(node);
        setHighlightedNodes(new Set(highlighted)); // visualize
        setTopologicalOrder([...order]);
        await sleep(animationSpeed);

        for (let neighbor of adjList[node] || []) {
          const v = typeof neighbor === "object" ? neighbor.node : neighbor;
          inDegree[v]--;

          if (inDegree[v] === 0) {
            queue.push(v);
          }
        }
      }

      // Check for cycle
      if (order.length !== parseInt(vertices, 10)) {
        toast.error("Cycle detected! Topological sort not possible.");
        setTopologicalOrder([]);
        return [];
      }

      return order;
    } finally {
      setIsAnimating(false);
    }
  };

  const handleDFS = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setHighlightedNodes(new Set());
    const adjList = convertToAdjacencyList(graphData.edges);
    const order = await dfs(0, adjList);
    setTopologicalOrder(order);
  };

  const handleBFS = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setHighlightedNodes(new Set());
    const adjList = convertToAdjacencyList(graphData.edges);
    const order = await bfs(0, adjList);
    setTopologicalOrder(order);
  };

  const handleDijkstra = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setHighlightedNodes(new Set());
    setDistanceArray([]);
    const adjList = convertToAdjacencyList(graphData.edges);
    await dijkstra(0, adjList);
  };

  const handleKruskal = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setMstEdges([]);
    await kruskal();
  };

  const handlePrims = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setMstEdges([]);
    await prims();
  };

  const handleTopologicalSort = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    if (isAnimating) {
      toast.error("An algorithm is already running!");
      return;
    }
    setIsDirected(true);
    setHighlightedNodes(new Set());
    setTopologicalOrder([]);
    await topologicalSortBFS();
  };

  // Calculate arrow points for directed edges
  const calculateArrowPoints = (x1, y1, x2, y2) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const arrowLength = 15;

    // Calculate the point where the arrow should start (slightly before the target node)
    const endX = x1 + (length - 20) * Math.cos(angle);
    const endY = y1 + (length - 20) * Math.sin(angle);

    // Calculate arrow head points
    const point1X = endX - arrowLength * Math.cos(angle - Math.PI / 6);
    const point1Y = endY - arrowLength * Math.sin(angle - Math.PI / 6);
    const point2X = endX - arrowLength * Math.cos(angle + Math.PI / 6);
    const point2Y = endY - arrowLength * Math.sin(angle + Math.PI / 6);

    return `M ${endX} ${endY} L ${point1X} ${point1Y} L ${point2X} ${point2Y} Z`;
  };

  const algorithmButtons = [
    { id: "7", handler: handleDFS, label: "Depth First Search" },
    { id: "8", handler: handleBFS, label: "Breadth First Search" },
    { id: "9", handler: handleDijkstra, label: "Dijkstra's Algorithm" },
    { id: "10", handler: handleKruskal, label: "Kruskal's Algorithm" },
    { id: "11", handler: handleTopologicalSort, label: "Topological Sort" },
    { id: "12", handler: handlePrims, label: "Prim's Algorithm" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 text-white">
      <div className="max-w-5xl mx-auto bg-[#1e293b] rounded-lg shadow-xl p-4 sm:p-6 border border-[#334155]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Graph Visualization
        </h1>

        {/* Main Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Vertices Input */}
          <div className="bg-[#1a2234] p-4 rounded-lg border border-[#2d3748] transition-all hover:border-[#4299e1]">
            <label className="block text-white text-sm font-medium mb-2">
              Number of Vertices:
              <div className="flex mt-1">
                <input
                  type="text"
                  value={vertices}
                  onChange={(e) => handleVerticesChange(e.target.value)}
                  className="shadow bg-[#0f172a] text-white placeholder-gray-400 border border-[#334155] rounded-md py-2 px-3 w-full focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of vertices"
                />
                <button
                  onClick={generateRandomGraph}
                  className="ml-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
                  title="Generate Random Graph"
                >
                  <RefreshCcw size={18} className="mr-1" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>
            </label>

            <div className="mt-4">
              <label className="block text-white text-sm font-medium mb-2">
                Animation Speed:
                <div className="flex items-center mt-1">
                  <span className="mr-2 text-xs">Fast</span>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#334155] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 text-xs">Slow</span>
                </div>
              </label>
            </div>
          </div>

          {/* Algorithm Buttons */}
          <div className="bg-[#1a2234] p-4 rounded-lg border border-[#2d3748]">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Algorithms</h2>
            <div className="grid grid-cols-2 gap-2">
              {algorithmButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={btn.handler}
                  disabled={isAnimating}
                  className={`${
                    graphId === btn.id
                      ? "bg-[#3b82f6] hover:bg-[#2563eb]"
                      : "bg-[#1e293b] hover:bg-[#2d3748]"
                  } text-white font-medium py-2 px-3 rounded-md transition-all duration-200 text-sm border border-[#334155] ${
                    isAnimating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Edges Section */}
        <div className="mb-6 bg-[#1a2234] p-4 rounded-lg border border-[#2d3748]">
          <label className="block text-white text-sm font-medium mb-3">
            Edges format: (source target) Example - "0 1"
          </label>
          <div className="max-h-40 overflow-y-auto mb-2 pr-2">
            {edges.map((edge, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center mb-3 gap-2 bg-[#0f172a] p-2 rounded-md border border-[#334155] hover:border-[#4299e1] transition-all"
              >
                <input
                  type="text"
                  value={edge}
                  onChange={(e) => handleEdgeChange(e, index)}
                  placeholder="source target (e.g., 0 1)"
                  className="shadow bg-[#1e293b] placeholder-gray-400 border border-[#334155] rounded-md py-2 px-3 text-white w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Weight"
                  value={weights[edge] || ""}
                  onChange={(e) => handleWeightChange(edge, e.target.value)}
                  className="w-full sm:w-24 shadow bg-[#1e293b] placeholder-gray-400 border border-[#334155] rounded-md py-2 px-3 text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => removeEdge(index)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium py-1 px-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={addEdge}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add Edge
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
            >
              <Share2 size={18} className="mr-2" />
              Generate Graph
            </button>
          </div>
        </div>

        {/* Algorithm Output */}
        {(distanceArray.length > 0 || topologicalOrder.length > 0) && (
          <div className="mb-6 bg-[#1a2234] p-4 rounded-lg border border-[#2d3748] overflow-hidden">
            <h2 className="text-xl text-white font-bold mb-4">Algorithm Output:</h2>

            {distanceArray.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-blue-300 mb-2">Dijkstra's Distances:</h3>
                <div className="flex flex-wrap gap-2">
                  {distanceArray.map(([node, distance]) => (
                    <div
                      key={node}
                      className="bg-[#0f172a] p-2 rounded-md border border-[#334155]"
                    >
                      Node {node}: {distance === Infinity ? "∞" : distance}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {topologicalOrder.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-blue-300 mb-2">Traversal Order:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {topologicalOrder.map((node, index) => (
                    <div
                      key={index}
                      className="bg-[#0f172a] font-semibold p-2 w-10 h-10 flex items-center justify-center rounded-md border border-[#334155]"
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Graph Container */}
        <div className="relative w-full max-w-full sm:max-w-[700px] md:max-w-[800px] aspect-[4/3] mx-auto border border-[#334155] rounded-lg overflow-hidden bg-[#0f172a]">
          <svg className="absolute w-full h-full">
            {graphData.edges.map((edge, index) => {
              const sourceNode = graphData.nodes[edge.source];
              const targetNode = graphData.nodes[edge.target];
              const isMST = mstEdges.some(
                (e) =>
                  (e.source === edge.source && e.target === edge.target) ||
                  (e.source === edge.target && e.target === edge.source)
              );
              return (
                <g key={index}>
                  <line
                    x1={sourceNode?.x || 0}
                    y1={sourceNode?.y || 0}
                    x2={targetNode?.x || 0}
                    y2={targetNode?.y || 0}
                    stroke={isMST ? "#E11D48" : "#94A3B8"}
                    strokeWidth={isMST ? "4" : "2"}
                    className="transition-all duration-300"
                  />
                  {isDirected && (
                    <path
                      d={calculateArrowPoints(
                        sourceNode?.x || 0,
                        sourceNode?.y || 0,
                        targetNode?.x || 0,
                        targetNode?.y || 0
                      )}
                      fill="#94A3B8"
                      className="transition-all duration-300"
                    />
                  )}
                  <text
                    x={(sourceNode?.x + targetNode?.x) / 2 || 0}
                    y={(sourceNode?.y + targetNode?.y) / 2 - 8 || 0}
                    className="text-sm font-medium"
                    fill="#ffffff"
                  >
                    {edge.weight || ""}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {graphData.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                highlightedNodes.has(node.id)
                  ? "bg-red-500 animate-pulse"
                  : "bg-blue-500"
              }`}
              style={{
                top: `${node.y}px`,
                left: `${node.x}px`,
              }}
            >
              {node.name}
            </div>
          ))}
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
    </div>
  );
};

export default GraphVisualization;


