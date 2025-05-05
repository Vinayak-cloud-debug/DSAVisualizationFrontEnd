// import React, { useState } from "react";
// import toast, { Toaster } from 'react-hot-toast';

// const Graph = () => {
//   const [vertices, setVertices] = useState('');
//   const [edges, setEdges] = useState([]);
//   const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
//   const [highlightedNodes, setHighlightedNodes] = useState(new Set());
//   const [distanceArray, setDistanceArray] = useState([]);
//   const [mstEdges, setMstEdges] = useState([]);
//   const [topologicalOrder, setTopologicalOrder] = useState([]);
//   const [weights, setWeights] = useState({});
//   const [isDirected, setIsDirected] = useState(false);

//   const calculateNodePositions = (numNodes, radius = 150) => {
//     const centerX = 300;
//     const centerY = 300;
//     return Array.from({ length: numNodes }, (_, i) => {
//       const angle = (i * 2 * Math.PI) / numNodes;
//       return {
//         id: i,
//         name: `${i}`,
//         x: centerX + radius * Math.cos(angle),
//         y: centerY + radius * Math.sin(angle),
//       };
//     });
//   };

//   const handleVerticesChange = (val) => {

//     if(val === "")
//         setVertices("")
//     else{
//     const value = parseInt(val, 10);
//     if (value > 0) {
//       setVertices(value);
//       setEdges([]);
//       setGraphData({ nodes: [], edges: [] });
//       setHighlightedNodes(new Set());
//       setDistanceArray([]);
//       setMstEdges([]);
//       setTopologicalOrder([]);
//       setWeights({});
//     }
//     }
//   };

//   const handleEdgeChange = (e, index) => {
//     const newEdges = [...edges];
//     newEdges[index] = e.target.value;
//     setEdges(newEdges);
//   };

//   const handleWeightChange = (edge, weight) => {
//     setWeights({ ...weights, [edge]: parseInt(weight, 10) });
//   };

//   const addEdge = () => {
//     if(vertices !== 0)
//       setEdges([...edges, ""]);
//     else
//       toast.error("Please enter the number of vertices ");
//   };

//   const removeEdge = (index) => {
//     setEdges(edges.filter((_, i) => i !== index));
//     const newWeights = { ...weights };
//     delete newWeights[edges[index]];
//     setWeights(newWeights);
//   };

//   const validateEdge = (source, target) => {
//     return (
//       !isNaN(source) &&
//       !isNaN(target) &&
//       source >= 0 &&
//       source < vertices &&
//       target >= 0 &&
//       target < vertices &&
//       source !== target
//     );
//   };


//   const handleSubmit = () => {
//     window.scrollTo({ 
//       top: 600, 
//       left: 0, 
//       behavior: 'smooth' 
//     });
    
//         if (vertices <= 0 || edges.length === 0) {
//       toast.error("Please enter valid values for vertices and edges.");
//       return;
//     }

//     const validEdges = [];
//     for (const edge of edges) {
//       const [source, target] = edge.split(' ').map(num => parseInt(num.trim(), 10));
      
//       if (!validateEdge(source, target)) {
//         toast.error(`Invalid edge: ${edge}. Edges must be valid vertex pairs.`);
//         return;
//       }
      
//       validEdges.push([source, target]);
//     }

//     const nodes = calculateNodePositions(vertices);
//     const graphEdges = validEdges.map(([source, target]) => ({
//       source,
//       target,
//       weight: weights[`${source} ${target}`] || 0
//     }));

//     setGraphData({ nodes, edges: graphEdges });
//     setHighlightedNodes(new Set());
//     setDistanceArray([]);
//     setMstEdges([]);
//     setTopologicalOrder([]);
//   };

//   const convertToAdjacencyList = (edges, directed = false) => {
//     const adjList = {};
//     for (let i = 0; i < vertices; i++) {
//       adjList[i] = [];
//     }
  
//     edges.forEach(edge => {
//       adjList[edge.source].push({ node: edge.target, weight: edge.weight });
//       if (!directed) {
//         adjList[edge.target].push({ node: edge.source, weight: edge.weight });
//       }
//     });
  
  
//     return adjList;
//   };
  

//   const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   const dfs = async (startNode, adjList) => {
//     const visited = new Set();
//     const stack = [startNode];
//     const order = [];

//     const highlighted = new Set();
    
//     while (stack.length > 0) {
//       const node = stack.pop();

//       highlighted.add(node);
      
//       if (!visited.has(node)) {
//         visited.add(node);
//         order.push(node);
//         setHighlightedNodes(new Set(highlighted));
//         setTopologicalOrder([...order]);
//         await sleep(500);
        
//         for (let i = adjList[node].length - 1; i >= 0; i--) {
//           const neighbor = adjList[node][i];
//           if (!visited.has(neighbor.node)) {
//             stack.push(neighbor.node);
//           }
//         }
//       }
//     }
//     return order;
//   };

//   const bfs = async (startNode, adjList) => {
//     const visited = new Set();
//     const queue = [startNode];
//     const order = [];
//     visited.add(startNode);
//     setHighlightedNodes(new Set(visited));
    
//     while (queue.length > 0) {
//       const node = queue.shift();
//       order.push(node);
//       await sleep(500);
      
//       for (const neighbor of adjList[node]) {
//         if (!visited.has(neighbor.node)) {
//           visited.add(neighbor.node);
//           setHighlightedNodes(new Set(visited));
//           queue.push(neighbor.node);
//           await sleep(500);
//         }
//       }
//     }
//     return order;
//   };

//   const dijkstra = async (startNode, adjList) => {
//     const distances = {};
//     const visited = new Set();
//     const previous = {};
    
//     for (let i = 0; i < vertices; i++) {
//       distances[i] = i === startNode ? 0 : Infinity;
//     }

//     while (visited.size < vertices) {
//       let minDist = Infinity;
//       let minVertex = null;
      
//       for (let vertex = 0; vertex < vertices; vertex++) {
//         if (!visited.has(vertex) && distances[vertex] < minDist) {
//           minDist = distances[vertex];
//           minVertex = vertex;
//         }
//       }
      
//       if (minVertex === null) break;
      
//       visited.add(minVertex);
//       setHighlightedNodes(new Set(visited));
//       setDistanceArray([...Object.entries(distances)]);
//       await sleep(500);
      
//       for (const neighbor of adjList[minVertex]) {
//         const alt = distances[minVertex] + neighbor.weight;
//         if (alt < distances[neighbor.node]) {
//           distances[neighbor.node] = alt;
//           previous[neighbor.node] = minVertex;
//         }
//       }
//     }
    
//     return { distances, previous };
//   };

//   const findSet = (parent, i) => {
//     if (parent[i] === i) return i;
//     return findSet(parent, parent[i]);
//   };

//   const union = (parent, rank, x, y) => {
//     const rootX = findSet(parent, x);
//     const rootY = findSet(parent, y);
    
//     if (rank[rootX] < rank[rootY]) {
//       parent[rootX] = rootY;
//     } else if (rank[rootX] > rank[rootY]) {
//       parent[rootY] = rootX;
//     } else {
//       parent[rootY] = rootX;
//       rank[rootX]++;
//     }
//   };

//   const kruskal = async () => {
//     const edges = graphData.edges.map(edge => ({
//       source: edge.source,
//       target: edge.target,
//       weight: edge.weight
//     })).sort((a, b) => a.weight - b.weight);

//     const parent = {};
//     const rank = {};
//     const mst = [];

//     for (let i = 0; i < vertices; i++) {
//       parent[i] = i;
//       rank[i] = 0;
//     }

//     for (const edge of edges) {
//       const rootSource = findSet(parent, edge.source);
//       const rootTarget = findSet(parent, edge.target);

//       if (rootSource !== rootTarget) {
//         mst.push(edge);
//         setMstEdges([...mst]);
//         await sleep(500);
//         union(parent, rank, rootSource, rootTarget);
//       }
//     }

//     return mst;
//   };

//   const prims = async () => {
//     const adjList = convertToAdjacencyList(graphData.edges);
//     const visited = new Set();
//     const mst = [];
//     const minHeap = [];
  
//     visited.add(0);
//     for (const neighbor of adjList[0]) {
//       minHeap.push({ from: 0, to: neighbor.node, weight: neighbor.weight });
//     }
  
//     const compare = (a, b) => a.weight - b.weight;
  
//     while (visited.size < vertices && minHeap.length > 0) {
//       minHeap.sort(compare); // Priority queue using sort
//       const { from, to, weight } = minHeap.shift();
  
//       if (visited.has(to)) continue;
  
//       mst.push({ source: from, target: to, weight });
//       visited.add(to);
//       setMstEdges([...mst]);
//       setHighlightedNodes(new Set(visited));
//       await sleep(500);
  
//       for (const neighbor of adjList[to]) {
//         if (!visited.has(neighbor.node)) {
//           minHeap.push({ from: to, to: neighbor.node, weight: neighbor.weight });
//         }
//       }
//     }
  
//     return mst;
//   };


//   const handlePrims = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }
//     setMstEdges([]);
//     await prims();
//   };
  
  
  

//   const topologicalSortBFS = async () => {
//     const adjList = convertToAdjacencyList(graphData.edges, true); // Directed graph
//     const inDegree = Array(vertices).fill(0);
//     const order = [];
  
//     // Step 1: Calculate in-degrees
//     for (let u in adjList) {
//       for (let neighbor of adjList[u]) {
//         const v = typeof neighbor === 'object' ? neighbor.node : neighbor;
//         inDegree[v]++;
//       }
//     }


//     // Step 2: Enqueue all nodes with in-degree 0
//     const queue = [];
//     for (let i = 0; i < vertices; i++) {
//       if (inDegree[i] === 0) queue.push(i);
//     }

//     const highlighted = new Set();
  
//     while (queue.length > 0) {
//       const node = queue.shift();
//       order.push(node);
//       highlighted.add(node);
//       setHighlightedNodes(new Set(highlighted)); // visualize
//       setTopologicalOrder([...order]);
//       await sleep(1000);
  
//       for (let neighbor of adjList[node] || []) {
//         const v = typeof neighbor === 'object' ? neighbor.node : neighbor;
//         inDegree[v]--;
  
//         if (inDegree[v] === 0) {
//           queue.push(v);
//         }
//       }
//     }
  
//     // Check for cycle
//     if (order.length !== vertices) {
//       console.error("Cycle detected! Topological sort not possible.");
//       setTopologicalOrder([]);
//       return [];
//     }
  
//     return order;
//   };
  
  
//   const handleDFS = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }

//     setHighlightedNodes(new Set());
//     const adjList = convertToAdjacencyList(graphData.edges);
//     const order = await dfs(0, adjList);
    
//     setTopologicalOrder(order);
//   };

//   const handleBFS = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }
//     setHighlightedNodes(new Set());
//     const adjList = convertToAdjacencyList(graphData.edges);
//     const order = await bfs(0, adjList);
//     setTopologicalOrder(order);
//   };

//   const handleDijkstra = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }
//     setHighlightedNodes(new Set());
//     setDistanceArray([]);
//     const adjList = convertToAdjacencyList(graphData.edges);
//     await dijkstra(0, adjList);
//   };

//   const handleKruskal = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }
//     setMstEdges([]);
//     await kruskal();
//   };

//   const handleTopologicalSort = async () => {
//     if (graphData.nodes.length === 0) {
//       toast.error("Please generate the graph first!");
//       return;
//     }
//     setIsDirected(true);
//     setHighlightedNodes(new Set());
//     setTopologicalOrder([]);
//     await topologicalSortBFS();
//   };

//   // Calculate arrow points for directed edges
//   const calculateArrowPoints = (x1, y1, x2, y2) => {
//     const angle = Math.atan2(y2 - y1, x2 - x1);
//     const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//     const arrowLength = 15;
//     const arrowWidth = 8;
    
//     // Calculate the point where the arrow should start (slightly before the target node)
//     const endX = x1 + (length - 20) * Math.cos(angle);
//     const endY = y1 + (length - 20) * Math.sin(angle);
    
//     // Calculate arrow head points
//     const point1X = endX - arrowLength * Math.cos(angle - Math.PI / 6);
//     const point1Y = endY - arrowLength * Math.sin(angle - Math.PI / 6);
//     const point2X = endX - arrowLength * Math.cos(angle + Math.PI / 6);
//     const point2Y = endY - arrowLength * Math.sin(angle + Math.PI / 6);
    
//     return `M ${endX} ${endY} L ${point1X} ${point1Y} L ${point2X} ${point2Y} Z`;
//   };


 

//     const graphId = sessionStorage.getItem("id");

 

//   return (


//     <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
//   <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
//     <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
//       Graph Visualization
//     </h1>

//     {/* Vertices Input */}
//     <div className="mb-6">
//       <label className="block text-white text-sm font-bold mb-2">
//         Number of Vertices:
//         <input
//           type="text"
//           value={vertices}
//           onChange={(e) => handleVerticesChange(e.target.value)}
//           className="ml-3 shadow bg-gray-800 text-white placeholder-white border rounded py-2 px-3 mt-2 sm:mt-0 w-full sm:w-auto"
//         />
//       </label>
//     </div>

//     {/* Edges Section */}
//     <div className="mb-6">
//       <label className="block text-white text-sm font-bold mb-2">
//         Edges format: (source target) Example - "0 1":
//       </label>
//       {edges.map((edge, index) => (
//         <div key={index} className="flex flex-col sm:flex-row items-center mb-3 gap-2">
//           <input
//             type="text"
//             value={edge}
//             onChange={(e) => handleEdgeChange(e, index)}
//             placeholder="Enter the edge"
//             className="shadow bg-gray-800 placeholder-white border-2 rounded py-2 px-3 text-white w-full sm:w-auto"
//           />
//           <input
//             type="number"
//             placeholder="Weight"
//             onChange={(e) => handleWeightChange(edge, e.target.value)}
//             className="w-full sm:w-20 shadow bg-gray-800 placeholder-white border-2 rounded py-2 px-3 text-white"
//           />
//           <button
//             onClick={() => removeEdge(index)}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       <button
//         onClick={addEdge}
//         className="mt-4 bg-[#151313] hover:border-2 hover:border-[#5f3636] text-white font-bold py-2 px-4 rounded-xl"
//       >
//         Add Edge
//       </button>
//     </div>

//     {/* Action Buttons */}
//     <div className="flex flex-wrap gap-4 mb-8">
//       <button
//         onClick={handleSubmit}
//         className="bg-[#0c103c] hover:border-2 hover:border-[#544141] text-white font-bold py-2 px-4 rounded-xl"
//       >
//         Generate Graph
//       </button>

//       {graphId === '7' && (
//         <button
//           onClick={handleDFS}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Depth First Search
//         </button>
//       )}

//       {graphId === '8' && (
//         <button
//           onClick={handleBFS}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Breadth First Search
//         </button>
//       )}

//       {graphId === '9' && (
//         <button
//           onClick={handleDijkstra}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Dijkstra's Algorithm
//         </button>
//       )}

//       {graphId === '10' && (
//         <button
//           onClick={handleKruskal}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Kruskal's Algorithm
//         </button>
//       )}

//       {graphId === '11' && (
//         <button
//           onClick={handleTopologicalSort}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Topological Sort
//         </button>
//       )}

//       {graphId === '12' && (
//         <button
//           onClick={handlePrims}
//           className="bg-[#1e1717] border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 rounded-xl"
//         >
//           Prim's Algorithm
//         </button>
//       )}
//     </div>

//     {/* Algorithm Output */}
//     <div className="mb-6">
//       <h2 className="text-xl text-white font-bold mb-2">Algorithm Output:</h2>

//       {distanceArray.length > 0 && (
//         <div className="mb-4">
//           <h3 className="font-bold text-white mb-2">Dijkstra's Distances:</h3>
//           <div className="flex flex-wrap gap-2">
//             {distanceArray.map(([node, distance]) => (
//               <div key={node} className="bg-gray-100 p-2 rounded">
//                 Node {node}: {distance === Infinity ? '∞' : distance}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {topologicalOrder.length > 0 && (
//         <div className="mb-4">
//           <h3 className="font-bold text-white mb-2">Traversal Order:</h3>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {topologicalOrder.map((node, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-100 font-semibold p-2 w-10 h-10 text-center rounded"
//               >
//                 {node}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Graph Container */}

//     {/* Graph Container */}
// <div className="relative w-full max-w-full sm:max-w-[700px] md:max-w-[800px] aspect-[4/3] mx-auto border border-gray-200 rounded-lg overflow-hidden">
//   <svg className="absolute w-full h-full">
//     {graphData.edges.map((edge, index) => {
//       const sourceNode = graphData.nodes[edge.source];
//       const targetNode = graphData.nodes[edge.target];
//       const isMST = mstEdges.some(
//         (e) =>
//           (e.source === edge.source && e.target === edge.target) ||
//           (e.source === edge.target && e.target === edge.source)
//       );
//       return (
//         <g key={index}>
//           <line
//             x1={sourceNode.x}
//             y1={sourceNode.y}
//             x2={targetNode.x}
//             y2={targetNode.y}
//             stroke={isMST ? '#E11D48' : '#4B5563'}
//             strokeWidth={isMST ? '4' : '2'}
//           />
//           {isDirected && (
//             <path
//               d={calculateArrowPoints(
//                 sourceNode.x,
//                 sourceNode.y,
//                 targetNode.x,
//                 targetNode.y
//               )}
//               fill="#4B5563"
//             />
//           )}
//           <text
//             x={(sourceNode.x + targetNode.x) / 2}
//             y={(sourceNode.y + targetNode.y) / 2}
//             className="text-sm"
//             fill="#ffffff"
//           >
//             {edge.weight || ''}
//           </text>
//         </g>
//       );
//     })}
//   </svg>

//   {/* Nodes */}
//   {graphData.nodes.map((node) => (
//     <div
//       key={node.id}
//       className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
//         highlightedNodes.has(node.id) ? 'bg-red-500' : 'bg-blue-500'
//       }`}
//       style={{
//         top: `${node.y}px`,
//         left: `${node.x}px`,
//       }}
//     >
//       {node.name}
//     </div>
//   ))}
// </div>

//     {/* <div className="relative w-full max-w-[100%] sm:max-w-[700px] md:max-w-[800px] aspect-[4/3] mx-auto border border-gray-200 rounded-lg overflow-hidden">
//       <svg className="absolute w-full h-full">
//         {graphData.edges.map((edge, index) => {
//           const sourceNode = graphData.nodes[edge.source];
//           const targetNode = graphData.nodes[edge.target];
//           const isMST = mstEdges.some(
//             (e) =>
//               (e.source === edge.source && e.target === edge.target) ||
//               (e.source === edge.target && e.target === edge.source)
//           );
//           return (
//             <g key={index}>
//               <line
//                 x1={sourceNode.x}
//                 y1={sourceNode.y}
//                 x2={targetNode.x}
//                 y2={targetNode.y}
//                 stroke={isMST ? '#E11D48' : '#4B5563'}
//                 strokeWidth={isMST ? '4' : '2'}
//               />
//               {isDirected && (
//                 <path
//                   d={calculateArrowPoints(
//                     sourceNode.x,
//                     sourceNode.y,
//                     targetNode.x,
//                     targetNode.y
//                   )}
//                   fill="#4B5563"
//                 />
//               )}
//               <text
//                 x={(sourceNode.x + targetNode.x) / 2}
//                 y={(sourceNode.y + targetNode.y) / 2}
//                 className="text-sm"
//                 fill="#ffffff"
//               >
//                 {edge.weight || ''}
//               </text>
//             </g>
//           );
//         })}
//       </svg>

//       {graphData.nodes.map((node) => (
//         <div
//           key={node.id}
//           className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
//             highlightedNodes.has(node.id) ? 'bg-red-500' : 'bg-blue-500'
//           }`}
//           style={{
//             top: `${node.y}px`,
//             left: `${node.x}px`,
//           }}
//         >
//           {node.name}
//         </div>
//       ))}
//     </div> */}
//   </div>

//   <Toaster
//     position="top-center"
//     toastOptions={{
//       duration: 1500,
//     }}
//   />
// </div>


//     // <div className="min-h-screen bg-gray-900 p-8">
//     //   <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
//     //     <h1 className="text-3xl font-bold text-center mb-8 text-white">Graph Visualization</h1>

//     //     <div className="mb-6">
//     //       <label className="block text-white text-sm font-bold mb-2">
//     //         Number of Vertices:
//     //         <input
//     //           type="text"
//     //           value={vertices}
//     //           onChange={(e)=>handleVerticesChange(e.target.value)}
              
//     //           className="ml-3 shadow bg-gray-800 placeholder:text-white appearance-none border rounded py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
//     //         />
//     //       </label>
//     //     </div>

//     //     <div className="mb-6">
//     //       <label className="block text-white mb-5 text-sm font-bold">
//     //         Edges format: (source  target) Example:- "0 1":
//     //       </label>
//     //       {edges.map((edge, index) => (
//     //         <div key={index} className="flex items-center mb-2">
//     //           <input
//     //             type="text"
//     //             value={edge}
//     //             onChange={(e) => handleEdgeChange(e, index)}
//     //             placeholder="Enter the edge"
//     //             className="shadow appearance-none border-2 bg-gray-800 placeholder:text-white  rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mr-2"
//     //           />

//     //           <input
//     //             type="number"
//     //             placeholder="Weight"
//     //             onChange={(e) => handleWeightChange(edge, e.target.value)}
//     //             className="w-20 shadow appearance-none bg-gray-800 placeholder:text-white  border-2 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mr-2"
//     //           />
              
//     //           <button
//     //             onClick={() => removeEdge(index)}
//     //             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//     //           >
//     //             Remove
//     //           </button>
//     //         </div>
//     //       ))}
//     //       <button
//     //         onClick={addEdge}
//     //         className="bg-[#151313] mt-5 rounded-xl hover:border-2 hover:border-[#5f3636]  text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //       >
//     //         Add Edge
//     //       </button>
//     //     </div>

//     //     <div className="flex flex-wrap gap-4 mb-8">
//     //       <button
//     //         onClick={handleSubmit}
//     //         className="bg-[#0c103c] hover:border-2 hover:border-[#544141] rounded-xl  text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //       >
//     //         Generate Graph
//     //       </button>

//     //         {graphId === '7' ?
//     //           <button
//     //             onClick={handleDFS}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4 outline-none focus:shadow-outline"
//     //           >
//     //             Depth First Search
//     //           </button>
//     //           :null}


//     //         {graphId === '8' ?

//     //           <button
//     //             onClick={handleBFS}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //           >
//     //             Breadth First Search
//     //           </button>
//     //           :null}

//     //         {graphId === '9' ?

//     //           <button
//     //             onClick={handleDijkstra}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //           >
//     //             Dijkstra's Algorithm
//     //           </button>
//     //           :null}


//     //         {graphId === '10' ?  
//     //           <button
//     //             onClick={handleKruskal}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //           >
//     //             Kruskal's Algorithm
//     //           </button>
//     //         :null}

//     //         {graphId === '11' ?
//     //           <button
//     //             onClick={handleTopologicalSort}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //           >
//     //             Topological Sort
//     //           </button>
//     //         :null}

//     //         {graphId === '12' ?  
//     //           <button
//     //             onClick={handlePrims}
//     //             className="bg-[#1e1717] rounded-xl border-2 border-black hover:border-[#e33535] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//     //           >
//     //             Prim's Algorithm
//     //           </button>
//     //         : null}

//     //     </div>

//     //     <div className="mb-6">
//     //       <h2 className="text-xl text-white font-bold mb-2">Algorithm Output:</h2>
          
//     //       {distanceArray.length > 0 && (
//     //         <div className="mb-4">
//     //           <h3 className="font-bold text-white">Dijkstra's Distances:</h3>
//     //           <div className="flex flex-wrap gap-2">
//     //             {distanceArray.map(([node, distance]) => (
//     //               <div key={node} className="bg-gray-100 p-2 rounded">
//     //                 Node {node}: {distance === Infinity ? '∞' : distance}
//     //               </div>
//     //             ))}
//     //           </div>
//     //         </div>
//     //       )}

//     //       {topologicalOrder.length > 0 && (
//     //         <div className="mb-4">
//     //           <h3 className="font-bold text-white">Traversal Order:</h3>
//     //           <div className="flex flex-wrap mt-5 gap-2">
//     //             {topologicalOrder.map((node, index) => (
//     //               <div key={index} className="bg-gray-100 font-semibold p-2 w-[40px] h-[40px] text-center rounded">
//     //                 {node}
//     //               </div>
//     //             ))}
//     //           </div>
//     //         </div>
//     //       )}
//     //     </div>

//     //     <div className="relative w-[800px] h-[600px] mx-auto border  border-gray-200 rounded-lg">
//     //       <svg className="absolute  w-full h-full">
//     //         {graphData.edges.map((edge, index) => {
//     //           const sourceNode = graphData.nodes[edge.source];
//     //           const targetNode = graphData.nodes[edge.target];
//     //           const isMST = mstEdges.some(
//     //             e => (e.source === edge.source && e.target === edge.target) ||
//     //                 (e.source === edge.target && e.target === edge.source)
//     //           );
//     //           return (
//     //             <g key={index}>
//     //               <line
//     //                 x1={sourceNode.x}
//     //                 y1={sourceNode.y}
//     //                 x2={targetNode.x}
//     //                 y2={targetNode.y}
//     //                 stroke={isMST ? "#E11D48" : "#4B5563"}
//     //                 strokeWidth={isMST ? "4" : "2"}
//     //               />
//     //               {isDirected && (
//     //                 <path
//     //                   d={calculateArrowPoints(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y)}
//     //                   fill="#4B5563"
//     //                 />
//     //               )}

//     //               <text
//     //                 x={(sourceNode.x + targetNode.x) / 2}
//     //                 y={(sourceNode.y + targetNode.y) / 2}
//     //                 className="text-sm "
//     //                 fill="#ffffff"
//     //               >
//     //                 {edge.weight ? edge.weight : ''}
//     //               </text>
//     //             </g>
//     //           );
//     //         })}
//     //       </svg>

//     //       {graphData.nodes.map((node) => (
//     //         <div
//     //           key={node.id}
//     //           className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
//     //             highlightedNodes.has(node.id) ? 'bg-red-500' : 'bg-blue-500'
//     //           }`}
//     //           style={{
//     //             top: `${node.y}px`,
//     //             left: `${node.x}px`,
//     //           }}
//     //         >
//     //           {node.name}
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     //   <Toaster position="top-center"
//     //   toastOptions={{
//     //     duration: 1500, // time in milliseconds (e.g., 3 seconds)
//     //   }} />
//     // </div>
//   );
// };

// export default Graph;


import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import GraphControls from './GraphContols'
import GraphVisualizer from './GraphVisualizer';
import GraphOutput from './GraphOutput';
import { useGraphAlgorithms } from './hooks/useGraphAlgorithms';
import { useRandomGraph } from './hooks/useRandomGraph';
import { GraphData, Edge } from './types/graphTypes';

const Graph = () => {
  const [vertices, setVertices] = useState<string>('');
  const [edges, setEdges] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set());
  const [distanceArray, setDistanceArray] = useState<[string, number][]>([]);
  const [mstEdges, setMstEdges] = useState<Edge[]>([]);
  const [topologicalOrder, setTopologicalOrder] = useState<number[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
  
  // Custom hooks for algorithms and random graph generation
  const { 
    handleDFS, 
    handleBFS, 
    handleDijkstra, 
    handleKruskal, 
    handleTopologicalSort,
    handlePrims
  } = useGraphAlgorithms(
    graphData, 
    vertices, 
    setHighlightedNodes,
    setDistanceArray,
    setMstEdges,
    setTopologicalOrder,
    setIsDirected
  );
  
  const { generateRandomGraph } = useRandomGraph(
    vertices, 
    setEdges, 
    setWeights
  );

  const handleVerticesChange = (val: string) => {
    if(val === "") {
      setVertices("");
    } else {
      const value = parseInt(val, 10);
      if (value > 0) {
        setVertices(value.toString());
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

  const handleEdgeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newEdges = [...edges];
    newEdges[index] = e.target.value;
    setEdges(newEdges);
  };

  const handleWeightChange = (edge: string, weight: string) => {
    setWeights({ ...weights, [edge]: parseInt(weight, 10) });
  };

  const addEdge = () => {
    if(vertices !== "" && parseInt(vertices, 10) !== 0) {
      setEdges([...edges, ""]);
    } else {
      toast.error("Please enter the number of vertices");
    }
  };

  const removeEdge = (index: number) => {
    setEdges(edges.filter((_, i) => i !== index));
    const newWeights = { ...weights };
    delete newWeights[edges[index]];
    setWeights(newWeights);
  };

  const handleSubmit = () => {
    window.scrollTo({ 
      top: 600, 
      left: 0, 
      behavior: 'smooth' 
    });
    
    if (vertices === "" || parseInt(vertices, 10) <= 0 || edges.length === 0) {
      toast.error("Please enter valid values for vertices and edges.");
      return;
    }

    const validEdges: [number, number][] = [];
    for (const edge of edges) {
      if (!edge.trim()) continue;
      
      const [source, target] = edge.split(' ').map(num => parseInt(num.trim(), 10));
      
      if (isNaN(source) || isNaN(target) || 
          source < 0 || source >= parseInt(vertices, 10) || 
          target < 0 || target >= parseInt(vertices, 10) || 
          source === target) {
        toast.error(`Invalid edge: ${edge}. Edges must be valid vertex pairs.`);
        return;
      }
      
      validEdges.push([source, target]);
    }

    const nodes = calculateNodePositions(parseInt(vertices, 10));
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
    
    toast.success("Graph generated successfully!");
  };

  const calculateNodePositions = (numNodes: number, radius = 150) => {
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

  const handleAlgorithmRun = () => {
    switch(selectedAlgorithm) {
      case 'dfs':
        handleDFS();
        break;
      case 'bfs':
        handleBFS();
        break;
      case 'dijkstra':
        handleDijkstra();
        break;
      case 'kruskal':
        handleKruskal();
        break;
      case 'topological':
        handleTopologicalSort();
        break;
      case 'prims':
        handlePrims();
        break;
      default:
        toast.error('Please select an algorithm first');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Graph Visualization Studio
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Number of Vertices
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vertices}
                    onChange={(e) => handleVerticesChange(e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number"
                  />
                  <button
                    onClick={generateRandomGraph}
                    disabled={!vertices || parseInt(vertices, 10) <= 0}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Generate Random Graph"
                  >
                    Random
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Select Algorithm
                </label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose an algorithm</option>
                  <option value="dfs">Depth First Search (DFS)</option>
                  <option value="bfs">Breadth First Search (BFS)</option>
                  <option value="dijkstra">Dijkstra's Algorithm</option>
                  <option value="kruskal">Kruskal's Algorithm</option>
                  <option value="prims">Prim's Algorithm</option>
                  <option value="topological">Topological Sort</option>
                </select>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Edges <span className="text-xs text-gray-400">(format: "source target")</span>
                  </label>
                  <button
                    onClick={addEdge}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 flex items-center"
                  >
                    Add Edge
                  </button>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {edges.map((edge, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={edge}
                        onChange={(e) => handleEdgeChange(e, index)}
                        placeholder="e.g. 0 1"
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={weights[edge] || ''}
                        onChange={(e) => handleWeightChange(edge, e.target.value)}
                        placeholder="Weight"
                        className="w-24 bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeEdge(index)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center"
                >
                  Generate Graph
                </button>
                
                <button 
                  onClick={handleAlgorithmRun}
                  disabled={!selectedAlgorithm || graphData.nodes.length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run Algorithm
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GraphVisualizer 
              graphData={graphData} 
              highlightedNodes={highlightedNodes}
              mstEdges={mstEdges}
              isDirected={isDirected}
            />
            
            <GraphOutput 
              distanceArray={distanceArray}
              topologicalOrder={topologicalOrder}
            />
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#2D3748',
            color: '#fff',
            padding: '16px',
          },
          success: {
            style: {
              background: '#065F46',
            },
          },
          error: {
            style: {
              background: '#9B1C1C',
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;