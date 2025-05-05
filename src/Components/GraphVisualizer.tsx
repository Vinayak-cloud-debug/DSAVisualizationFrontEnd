import React from 'react';
import { GraphData, Edge } from './types/graphTypes';

interface GraphVisualizerProps {
  graphData: GraphData;
  highlightedNodes: Set<number>;
  mstEdges: Edge[];
  isDirected: boolean;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  graphData,
  highlightedNodes,
  mstEdges,
  isDirected
}) => {
  // Calculate arrow points for directed edges
  const calculateArrowPoints = (x1: number, y1: number, x2: number, y2: number) => {
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

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-gray-200">Graph Visualization</h2>
      
      <div className="relative w-full max-w-full aspect-[4/3] mx-auto bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-inner">
        {graphData.nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Generate a graph to visualize it here.
          </div>
        ) : (
          <>
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
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isMST ? 'url(#mstGradient)' : (highlightedNodes.has(edge.source) && highlightedNodes.has(edge.target)) ? 'url(#highlightGradient)' : '#4B5563'}
                      strokeWidth={isMST ? '4' : '2'}
                      className="transition-all duration-300"
                    />
                    {isDirected && (
                      <path
                        d={calculateArrowPoints(
                          sourceNode.x,
                          sourceNode.y,
                          targetNode.x,
                          targetNode.y
                        )}
                        fill={highlightedNodes.has(edge.source) && highlightedNodes.has(edge.target) ? '#9333EA' : '#4B5563'}
                        className="transition-all duration-300"
                      />
                    )}
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 5}
                      className="text-sm font-medium"
                      fill="#d1d5db"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {edge.weight || ''}
                    </text>
                  </g>
                );
              })}
              
              {/* Define gradients for edges */}
              <defs>
                <linearGradient id="mstGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Nodes */}
            {graphData.nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 shadow-lg ${
                  highlightedNodes.has(node.id) 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring ring-purple-400 ring-opacity-50 scale-110' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                }`}
                style={{
                  top: `${node.y}px`,
                  left: `${node.x}px`,
                  filter: highlightedNodes.has(node.id) ? 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))' : 'none',
                }}
              >
                {node.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;