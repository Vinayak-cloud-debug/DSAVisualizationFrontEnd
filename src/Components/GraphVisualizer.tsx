

import React, { useEffect, useState, useRef, useMemo } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [viewBox, setViewBox] = useState("0 0 100 75");

  // Calculate optimal graph boundaries for positioning
  const graphBoundaries = useMemo(() => {
    if (graphData.nodes.length === 0) return { minX: 0, maxX: 100, minY: 0, maxY: 75 };
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    // Find the boundaries of the graph
    graphData.nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
    });
    
    // Add padding
    const paddingX = (maxX - minX) * 0.15;
    const paddingY = (maxY - minY) * 0.15;
    
    return {
      minX: minX - paddingX,
      maxX: maxX + paddingX,
      minY: minY - paddingY,
      maxY: maxY + paddingY
    };
  }, [graphData.nodes]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Use graph boundaries to set viewBox
        if (graphData.nodes.length > 0) {
          const { minX, maxX, minY, maxY } = graphBoundaries;
          const aspectRatio = width / height;
          
          // Adjust viewBox based on container's aspect ratio
          const viewBoxWidth = maxX - minX;
          const viewBoxHeight = viewBoxWidth / aspectRatio;
          
          setViewBox(`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`);
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [graphData.nodes, graphBoundaries]);

  // Calculate arrow points for directed edges
  const calculateArrowPoints = (
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number, 
    isPercentage: boolean = false
  ) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
    // Scale arrow size based on whether we're using percentages or pixels
    // and adjust for mobile screens
    const scaleFactor = Math.min(dimensions.width / 400, 1); // Scale down on smaller screens
    const arrowLength = isPercentage ? 3 * scaleFactor : 15 * scaleFactor;
    const nodeRadius = isPercentage ? 2 * scaleFactor : 20 * scaleFactor;
    
    // Calculate the point where the arrow should start (slightly before the target node)
    const endX = x1 + (length - nodeRadius) * Math.cos(angle);
    const endY = y1 + (length - nodeRadius) * Math.sin(angle);
    
    // Calculate arrow head points
    const point1X = endX - arrowLength * Math.cos(angle - Math.PI / 6);
    const point1Y = endY - arrowLength * Math.sin(angle - Math.PI / 6);
    const point2X = endX - arrowLength * Math.cos(angle + Math.PI / 6);
    const point2Y = endY - arrowLength * Math.sin(angle + Math.PI / 6);
    
    return `M ${endX} ${endY} L ${point1X} ${point1Y} L ${point2X} ${point2Y} Z`;
  };

  // No conversion needed - we're using original coordinates with a dynamic viewBox
  const getCoordinate = (value: number) => value;

  // Calculate optimal node size based on device width
  const getNodeSize = () => {
    // For very small screens, make nodes smaller
    if (dimensions.width < 320) return 'w-6 h-6';
    if (dimensions.width < 480) return 'w-7 h-7 sm:w-8 sm:h-8';
    return 'w-8 h-8 sm:w-10 sm:h-10';
  };

  // Calculate stroke width based on screen size
  const getStrokeWidth = (isMST: boolean) => {
    if (dimensions.width < 480) {
      return isMST ? 2 : 1;
    }
    return isMST ? 3 : 1.5;
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-3 sm:p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-3 sm:mb-6 text-gray-200">Graph Visualization</h2>
      
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] mx-auto bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-inner"
      >
        {graphData.nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Generate a graph to visualize it here.
          </div>
        ) : (
          <div className="absolute inset-0">
            <svg 
              className="absolute w-full h-full" 
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
            >
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
              
              {/* Edges */}
              {dimensions.width > 0 && graphData.edges.map((edge, index) => {
                const sourceNode = graphData.nodes[edge.source];
                const targetNode = graphData.nodes[edge.target];
                const isMST = mstEdges.some(
                  (e) =>
                    (e.source === edge.source && e.target === edge.target) ||
                    (e.source === edge.target && e.target === edge.source)
                );
                
                // Use original coordinates with the dynamic viewBox
                const sourceX = getCoordinate(sourceNode.x);
                const sourceY = getCoordinate(sourceNode.y);
                const targetX = getCoordinate(targetNode.x);
                const targetY = getCoordinate(targetNode.y);
                
                return (
                  <g key={index}>
                    <line
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke={isMST ? 'url(#mstGradient)' : (highlightedNodes.has(edge.source) && highlightedNodes.has(edge.target)) ? 'url(#highlightGradient)' : '#4B5563'}
                      strokeWidth={getStrokeWidth(isMST)}
                      className="transition-all duration-300"
                    />
                    {isDirected && (
                      <path
                        d={calculateArrowPoints(
                          sourceX,
                          sourceY,
                          targetX,
                          targetY,
                          false // Using original coordinates
                        )}
                        fill={highlightedNodes.has(edge.source) && highlightedNodes.has(edge.target) ? '#9333EA' : '#4B5563'}
                        className="transition-all duration-300"
                      />
                    )}
                    <text
                      x={(sourceX + targetX) / 2}
                      y={(sourceY + targetY) / 2 - 5}
                      fill="#d1d5db"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={dimensions.width < 480 ? 8 : 10}
                    >
                      {edge.weight || ''}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Nodes - positioned absolutely over SVG */}
            <div className="absolute inset-0 pointer-events-none">
              {dimensions.width > 0 && graphData.nodes.map((node) => {
                // Calculate positions based on the viewBox
                const { minX, maxX, minY, maxY } = graphBoundaries;
                const viewBoxWidth = maxX - minX;
                const viewBoxHeight = maxY - minY;
                
                // Calculate position as percentage of viewport
                const nodeXPercent = ((node.x - minX) / viewBoxWidth) * 100;
                const nodeYPercent = ((node.y - minY) / viewBoxHeight) * 100;
                
                // Size adjustments based on screen width
                const nodeSize = getNodeSize();
                
                return (
                  <div
                    key={node.id}
                    className={`absolute ${nodeSize} rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 shadow-lg ${
                      highlightedNodes.has(node.id) 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring ring-purple-400 ring-opacity-50 scale-110' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                    }`}
                    style={{
                      top: `${nodeYPercent}%`,
                      left: `${nodeXPercent}%`,
                      filter: highlightedNodes.has(node.id) ? 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))' : 'none',
                      fontSize: dimensions.width < 380 ? '0.7rem' : 'clamp(0.75rem, 1.5vw, 1rem)'
                    }}
                  >
                    {node.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
