import React, { useState } from "react";

const NumberOfPaths = () => {
  const [matrix, setMatrix] = useState([]);
  const [visited, setVisited] = useState([]);
  const [numPaths, setNumPaths] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomMatrix = (rows, cols, obstacleProbability = 0.25) => {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        Math.random() < obstacleProbability ? "*" : ""
      )
    );
    newMatrix[0][0] = ""; // Ensure start is not an obstacle
    newMatrix[rows - 1][cols - 1] = ""; // Ensure end is not an obstacle
    setMatrix(newMatrix);
    setNumPaths(0);
    setVisited([]);
  };

  const findPaths = async (i, j, path, m, n) => {
    if (i >= m || j >= n || path[i][j] === "*") return 0;
    if (i === m - 1 && j === n - 1) {
      setNumPaths((prev) => prev + 1);
      setVisited((prev) => [...prev, { i, j }]);
      await delay(800);
      setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
      return 1;
    }

    setVisited((prev) => [...prev, { i, j }]);
    await delay(800);

    let right = await findPaths(i, j + 1, path, m, n);
    let down = await findPaths(i + 1, j, path, m, n);

    setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
    await delay(800);

    return right + down;
  };

  const startFindingPaths = async () => {
    if (!matrix.length) return;
    setIsRunning(true);
    setNumPaths(0);
    setVisited([]);

    const m = matrix.length;
    const n = matrix[0].length;

    await findPaths(0, 0, matrix, m, n);

    setIsRunning(false);
  };

  return (
    <div className="fixed left-0 top-0 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white w-screen min-h-screen justify-center overflow-hidden p-5 space-y-6 font-mono">
      <h2 className="text-2xl font-bold text-emerald-400">
        Matrix Pathfinding Visualization
      </h2>

      <div className="flex space-x-2 items-center">
        <input
          type="number"
          min="2"
          max="12"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="px-2 py-1 rounded-md bg-gray-800 border border-gray-600 w-20 text-center"
        />
        <span>×</span>
        <input
          type="number"
          min="2"
          max="12"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="px-2 py-1 rounded-md bg-gray-800 border border-gray-600 w-20 text-center"
        />
        <button
          onClick={() => generateRandomMatrix(rows, cols)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 transition rounded-md shadow-md"
        >
          Generate Grid
        </button>
      </div>

      {matrix.length > 0 && (
        <div
          className={`grid gap-1`}
          style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
        >
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isVisited = visited.some(
                (v) => v.i === rowIndex && v.j === colIndex
              );
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 flex items-center justify-center text-sm font-bold border border-gray-700 transition-all duration-300 rounded-md
                    ${cell === "*"
                      ? "bg-gray-700 text-gray-500"
                      : isVisited
                      ? "bg-green-400/70 text-black animate-pulse"
                      : "bg-gray-800 text-emerald-300"}
                  `}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={startFindingPaths}
          disabled={isRunning || !matrix.length}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition rounded-md"
        >
          {isRunning ? "Finding Paths..." : "Start Traversal"}
        </button>
      </div>

      <h3 className="text-lg font-semibold text-emerald-300">
        Total Paths: {numPaths}
      </h3>
    </div>
  );
};

export default NumberOfPaths;
