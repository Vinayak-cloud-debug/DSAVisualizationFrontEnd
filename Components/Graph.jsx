import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Graph = () => {
  const [vertices, setVertices] = useState('');
  const [edges, setEdges] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [distanceArray, setDistanceArray] = useState([]);
  const [mstEdges, setMstEdges] = useState([]);
  const [topologicalOrder, setTopologicalOrder] = useState([]);
  const [weights, setWeights] = useState({});
  const [isDirected, setIsDirected] = useState(false);

  const calculateNodePositions = (numNodes, radius = 150) => {
    const centerX = 300;
    const centerY = 300;
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

    if(val === "")
        setVertices("")
    else{
    const value = parseInt(val, 10);
    if (value > 0) {
      setVertices(value);
      setEdges([]);
      setGraphData({ nodes: [], edges: [] });
      setHighlightedNodes(new Set());
      setDistanceArray([]);
      setMstEdges([]);
      setTopologicalOrder([]);
      setWeights({});
    }
    }
  };

  const handleEdgeChange = (e, index) => {
    const newEdges = [...edges];
    newEdges[index] = e.target.value;
    setEdges(newEdges);
  };

  const handleWeightChange = (edge, weight) => {
    setWeights({ ...weights, [edge]: parseInt(weight, 10) });
  };

  const addEdge = () => {
    if(vertices !== 0)
      setEdges([...edges, ""]);
    else
      toast.error("Please enter the number of vertices ");
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


  const handleSubmit = () => {
    window.scrollTo({ 
      top: 600, 
      left: 0, 
      behavior: 'smooth' 
    });
    
        if (vertices <= 0 || edges.length === 0) {
      toast.error("Please enter valid values for vertices and edges.");
      return;
    }

    const validEdges = [];
    for (const edge of edges) {
      const [source, target] = edge.split(' ').map(num => parseInt(num.trim(), 10));
      
      if (!validateEdge(source, target)) {
        toast.error(`Invalid edge: ${edge}. Edges must be valid vertex pairs.`);
        return;
      }
      
      validEdges.push([source, target]);
    }

    const nodes = calculateNodePositions(vertices);
    const graphEdges = validEdges.map(([source, target]) => ({
      source,
      target,
      weight: weights[`${source} ${target}`] || 0
    }));

    setGraphData({ nodes, edges: graphEdges });
    setHighlightedNodes(new Set());
    setDistanceArray([]);
    setMstEdges([]);
    setTopologicalOrder([]);
  };

  const convertToAdjacencyList = (edges, directed = false) => {
    const adjList = {};
    for (let i = 0; i < vertices; i++) {
      adjList[i] = [];
    }
  
    edges.forEach(edge => {
      adjList[edge.source].push({ node: edge.target, weight: edge.weight });
      if (!directed) {
        adjList[edge.target].push({ node: edge.source, weight: edge.weight });
      }
    });
  
  
    return adjList;
  };
  

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const dfs = async (startNode, adjList) => {
    const visited = new Set();
    const stack = [startNode];
    const order = [];

    const highlighted = new Set();
    
    while (stack.length > 0) {
      const node = stack.pop();

      highlighted.add(node);
      
      if (!visited.has(node)) {
        visited.add(node);
        order.push(node);
        setHighlightedNodes(new Set(highlighted));
        setTopologicalOrder([...order]);
        await sleep(500);
        
        for (let i = adjList[node].length - 1; i >= 0; i--) {
          const neighbor = adjList[node][i];
          if (!visited.has(neighbor.node)) {
            stack.push(neighbor.node);
          }
        }
      }
    }
    return order;
  };

  const bfs = async (startNode, adjList) => {
    const visited = new Set();
    const queue = [startNode];
    const order = [];
    visited.add(startNode);
    setHighlightedNodes(new Set(visited));
    
    while (queue.length > 0) {
      const node = queue.shift();
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

  const dijkstra = async (startNode, adjList) => {
    const distances = {};
    const visited = new Set();
    const previous = {};
    
    for (let i = 0; i < vertices; i++) {
      distances[i] = i === startNode ? 0 : Infinity;
    }

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
    const edges = graphData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      weight: edge.weight
    })).sort((a, b) => a.weight - b.weight);

    const parent = {};
    const rank = {};
    const mst = [];

    for (let i = 0; i < vertices; i++) {
      parent[i] = i;
      rank[i] = 0;
    }

    for (const edge of edges) {
      const rootSource = findSet(parent, edge.source);
      const rootTarget = findSet(parent, edge.target);

      if (rootSource !== rootTarget) {
        mst.push(edge);
        setMstEdges([...mst]);
        await sleep(500);
        union(parent, rank, rootSource, rootTarget);
      }
    }

    return mst;
  };

  const prims = async () => {
    const adjList = convertToAdjacencyList(graphData.edges);
    const visited = new Set();
    const mst = [];
    const minHeap = [];
  
    visited.add(0);
    for (const neighbor of adjList[0]) {
      minHeap.push({ from: 0, to: neighbor.node, weight: neighbor.weight });
    }
  
    const compare = (a, b) => a.weight - b.weight;
  
    while (visited.size < vertices && minHeap.length > 0) {
      minHeap.sort(compare); // Priority queue using sort
      const { from, to, weight } = minHeap.shift();
  
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


  const handlePrims = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
      return;
    }
    setMstEdges([]);
    await prims();
  };
  
  
  

  const topologicalSortBFS = async () => {
    const adjList = convertToAdjacencyList(graphData.edges, true); // Directed graph
    const inDegree = Array(vertices).fill(0);
    const order = [];
  
    // Step 1: Calculate in-degrees
    for (let u in adjList) {
      for (let neighbor of adjList[u]) {
        const v = typeof neighbor === 'object' ? neighbor.node : neighbor;
        inDegree[v]++;
      }
    }


    // Step 2: Enqueue all nodes with in-degree 0
    const queue = [];
    for (let i = 0; i < vertices; i++) {
      if (inDegree[i] === 0) queue.push(i);
    }

    const highlighted = new Set();
  
    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);
      highlighted.add(node);
      setHighlightedNodes(new Set(highlighted)); // visualize
      setTopologicalOrder([...order]);
      await sleep(1000);
  
      for (let neighbor of adjList[node] || []) {
        const v = typeof neighbor === 'object' ? neighbor.node : neighbor;
        inDegree[v]--;
  
        if (inDegree[v] === 0) {
          queue.push(v);
        }
      }
    }
  
    // Check for cycle
    if (order.length !== vertices) {
      console.error("Cycle detected! Topological sort not possible.");
      setTopologicalOrder([]);
      return [];
    }
  
    return order;
  };
  
  
  const handleDFS = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
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
    setMstEdges([]);
    await kruskal();
  };

  const handleTopologicalSort = async () => {
    if (graphData.nodes.length === 0) {
      toast.error("Please generate the graph first!");
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
    const arrowWidth = 8;
    
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


 

    const graphId = sessionStorage.getItem("id");

 

  return (

    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Graph Visualization</h1>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            Number of Vertices:
            <input
              type="text"
              value={vertices}
              onChange={(e)=>handleVerticesChange(e.target.value)}
              
              className="ml-3 shadow bg-gray-800 placeholder:text-white appearance-none border rounded py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-5 text-sm font-bold">
            Edges format: (source  target) Example:- "0 1":
          </label>
          {edges.map((edge, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={edge}
                onChange={(e) => handleEdgeChange(e, index)}
                placeholder="Enter the edge"
                className="shadow appearance-none border-2 bg-gray-800 placeholder:text-white  rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mr-2"
              />

              <input
                type="number"
                placeholder="Weight"
                onChange={(e) => handleWeightChange(edge, e.target.value)}
                className="w-20 shadow appearance-none bg-gray-800 placeholder:text-white  border-2 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              
              <button
                onClick={() => removeEdge(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addEdge}
            className="bg-[#151313] mt-5 rounded-xl hover:border-2 hover:border-[#5f3636]  text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
          >
            Add Edge
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleSubmit}
            className="bg-[#0c103c] hover:border-2 hover:border-[#544141] rounded-xl  text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
          >
            Generate Graph
          </button>

            {graphId === '7' ?
              <button
                onClick={handleDFS}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 outline-none focus:shadow-outline"
              >
                Depth First Search
              </button>
              :null}


            {graphId === '8' ?

              <button
                onClick={handleBFS}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              >
                Breadth First Search
              </button>
              :null}

            {graphId === '9' ?

              <button
                onClick={handleDijkstra}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              >
                Dijkstra's Algorithm
              </button>
              :null}


            {graphId === '10' ?  
              <button
                onClick={handleKruskal}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              >
                Kruskal's Algorithm
              </button>
            :null}

            {graphId === '11' ?
              <button
                onClick={handleTopologicalSort}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              >
                Topological Sort
              </button>
            :null}

            {graphId === '12' ?  
              <button
                onClick={handlePrims}
                className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              >
                Prim's Algorithm
              </button>
            : null}

        </div>

        <div className="mb-6">
          <h2 className="text-xl text-white font-bold mb-2">Algorithm Output:</h2>
          
          {distanceArray.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-white">Dijkstra's Distances:</h3>
              <div className="flex flex-wrap gap-2">
                {distanceArray.map(([node, distance]) => (
                  <div key={node} className="bg-gray-100 p-2 rounded">
                    Node {node}: {distance === Infinity ? '∞' : distance}
                  </div>
                ))}
              </div>
            </div>
          )}

          {topologicalOrder.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-white">Traversal Order:</h3>
              <div className="flex flex-wrap mt-5 gap-2">
                {topologicalOrder.map((node, index) => (
                  <div key={index} className="bg-gray-100 font-semibold p-2 w-[40px] h-[40px] text-center rounded">
                    {node}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-[800px] h-[600px] mx-auto border  border-gray-200 rounded-lg">
          <svg className="absolute  w-full h-full">
            {graphData.edges.map((edge, index) => {
              const sourceNode = graphData.nodes[edge.source];
              const targetNode = graphData.nodes[edge.target];
              const isMST = mstEdges.some(
                e => (e.source === edge.source && e.target === edge.target) ||
                    (e.source === edge.target && e.target === edge.source)
              );
              return (
                <g key={index}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isMST ? "#E11D48" : "#4B5563"}
                    strokeWidth={isMST ? "4" : "2"}
                  />
                  {isDirected && (
                    <path
                      d={calculateArrowPoints(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y)}
                      fill="#4B5563"
                    />
                  )}

                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2}
                    className="text-sm "
                    fill="#ffffff"
                  >
                    {edge.weight ? edge.weight : ''}
                  </text>
                </g>
              );
            })}
          </svg>

          {graphData.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                highlightedNodes.has(node.id) ? 'bg-red-500' : 'bg-blue-500'
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
      <Toaster position="top-center"
      toastOptions={{
        duration: 1500, // time in milliseconds (e.g., 3 seconds)
      }} />
    </div>
  );
};

export default Graph;