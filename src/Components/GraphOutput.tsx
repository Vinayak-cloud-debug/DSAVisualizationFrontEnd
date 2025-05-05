import React from 'react';

interface GraphOutputProps {
  distanceArray: [string, number][];
  topologicalOrder: number[];
}

const GraphOutput: React.FC<GraphOutputProps> = ({
  distanceArray,
  topologicalOrder
}) => {
  if (distanceArray.length === 0 && topologicalOrder.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-gray-200">Algorithm Output</h2>
      
      {distanceArray.length > 0 && (
        <div className="mb-6 animate-fadeIn">
          <h3 className="font-semibold text-gray-300 mb-3">Dijkstra's Distances:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {distanceArray.map(([node, distance], index) => (
              <div 
                key={node} 
                className="bg-gray-700 border border-gray-600 rounded-lg p-3 shadow"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="text-indigo-400 font-medium">Node {node}:</span>{' '}
                <span className="text-white font-bold">{distance === Infinity ? '∞' : distance}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {topologicalOrder.length > 0 && (
        <div className="animate-fadeIn">
          <h3 className="font-semibold text-gray-300 mb-3">Traversal Order:</h3>
          <div className="flex flex-wrap gap-3">
            {topologicalOrder.map((node, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold p-3 w-12 h-12 flex items-center justify-center rounded-lg shadow-md"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {node}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphOutput;