import React from 'react';
import { ArrowRightSquare, Plus, Trash2, PlayCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface GraphControlsProps {
  vertices: string;
  edges: string[];
  weights: Record<string, number>;
  handleVerticesChange: (val: string) => void;
  handleEdgeChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleWeightChange: (edge: string, weight: string) => void;
  addEdge: () => void;
  removeEdge: (index: number) => void;
  handleSubmit: () => void;
  generateRandomGraph: () => void;
  graphId: string | null;
  handleDFS: () => void;
  handleBFS: () => void;
  handleDijkstra: () => void;
  handleKruskal: () => void;
  handleTopologicalSort: () => void;
  handlePrims: () => void;
}

const GraphControls: React.FC<GraphControlsProps> = ({
  vertices,
  edges,
  weights,
  handleVerticesChange,
  handleEdgeChange,
  handleWeightChange,
  addEdge,
  removeEdge,
  handleSubmit,
  generateRandomGraph,
  graphId,
  handleDFS,
  handleBFS,
  handleDijkstra,
  handleKruskal,
  handleTopologicalSort,
  handlePrims
}) => {
  const runAlgorithm = () => {
    if (!vertices || edges.length === 0) {
      toast.error("Please generate a graph first!");
      return;
    }
    
    switch(graphId) {
      case '7': 
        handleDFS();
        break;
      case '8': 
        handleBFS();
        break;
      case '9': 
        handleDijkstra();
        break;
      case '10': 
        handleKruskal();
        break;
      case '11': 
        handleTopologicalSort();
        break;
      case '12': 
        handlePrims();
        break;
      default:
        toast.error("Please select an algorithm to run");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-gray-200">Graph Configuration</h2>
      
      {/* Vertices Input */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Number of Vertices
        </label>
        <div className="flex">
          <input
            type="text"
            value={vertices}
            onChange={(e) => handleVerticesChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            placeholder="Enter number"
          />
          <button
            onClick={generateRandomGraph}
            disabled={!vertices || parseInt(vertices, 10) <= 0}
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Generate Random Graph"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
      
      {/* Edges Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-300 text-sm font-medium">
            Edges <span className="text-xs text-gray-400">(format: "source target")</span>
          </label>
          <button
            onClick={addEdge}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 flex items-center transition-all duration-200"
          >
            <Plus size={16} className="mr-1" /> Add Edge
          </button>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {edges.map((edge, index) => (
            <div key={index} className="flex gap-2 items-center animate-fadeIn">
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
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors duration-200"
                title="Remove Edge"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {edges.length === 0 && (
            <div className="text-gray-400 text-sm py-3 text-center italic">
              No edges added yet. Click "Add Edge" to start.
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg"
        >
          <ArrowRightSquare size={18} className="mr-2" /> Generate Graph
        </button>
        
        {graphId && (
          <button 
            onClick={runAlgorithm}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg"
          >
            <PlayCircle size={18} className="mr-2" /> 
            {graphId === '7' && 'Run DFS Algorithm'}
            {graphId === '8' && 'Run BFS Algorithm'}
            {graphId === '9' && 'Run Dijkstra Algorithm'}
            {graphId === '10' && 'Run Kruskal Algorithm'}
            {graphId === '11' && 'Run Topological Sort'}
            {graphId === '12' && 'Run Prim Algorithm'}
          </button>
        )}
      </div>
    </div>
  );
};

export default GraphControls;