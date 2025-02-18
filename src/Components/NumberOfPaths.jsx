import React, { useState } from "react";

const NumberOfPaths = () => {
  const initialMatrix = [
    ["", "", "", ""],
    ["", "*", "", ""],
    ["", "", "", "*"],
    ["*", "", "", ""]
  ];

  const [matrix, setMatrix] = useState(initialMatrix);
  const [visited, setVisited] = useState([]);
  const [numPaths, setNumPaths] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const findPaths = async (i, j, path, m, n) => {
    if (i >= m || j >= n || path[i][j] === "*") return 0;
    if (i === m - 1 && j === n - 1) {
      setNumPaths((prev) => prev + 1); // ✅ Update dynamically when a path is found
      setVisited((prev) => [...prev, { i, j }]);
      await delay(500);
      setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
      return 1;
    }

    // Mark cell as visited (for animation)
    setVisited((prev) => [...prev, { i, j }]);
    await delay(500);

    let right = await findPaths(i, j + 1, path, m, n);
    let down = await findPaths(i + 1, j, path, m, n);

    // Remove cell from visited (Backtracking effect)
    setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
    await delay(500);

    return right + down;
  };

  const startFindingPaths = async () => {
    setIsRunning(true);
    setNumPaths(0); // Reset count before starting
    setVisited([]);

    const m = matrix.length;
    const n = matrix[0].length;

    await findPaths(0, 0, matrix, m, n);

    setIsRunning(false);
  };

  return (
    <div className="fixed left-0 top-0 flex flex-col items-center bg-gray-900 w-screen min-h-screen justify-center overflow-hidden  p-5 space-y-5">
      <h2 className="text-xl font-bold text-white">Matrix Pathfinding Visualization</h2>
      <div className="grid grid-cols-4 gap-2">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 flex items-center justify-center border text-lg font-bold
                ${cell === "*" ? "bg-gray-500 text-white" : "bg-blue-200"}
                ${
                  visited.some((v) => v.i === rowIndex && v.j === colIndex)
                    ? "bg-yellow-400 animate-pulse"
                    : ""
                }
              `}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button
        onClick={startFindingPaths}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={isRunning}
      >
        {isRunning ? "Finding Paths..." : "Start Traversal"}
      </button>
      <h3 className="text-lg font-semibold text-white">Total Paths: {numPaths}</h3>
    </div>
  );
};

export default NumberOfPaths;
