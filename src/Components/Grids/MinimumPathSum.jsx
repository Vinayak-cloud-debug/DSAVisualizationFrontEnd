

import { Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const MinimumPathSum = () => {
  const [matrix, setMatrix] = useState([]);
  const [dp, setDp] = useState([]);
  const [visited, setVisited] = useState([]);
  const [minSum, setMinSum] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [approach, setApproach] = useState("memoization");
    const isPaused = useRef(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const MAX_VALUE = 100;


  const generateRandomMatrix = (rows, cols) => {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * (MAX_VALUE + 1)))
    );
    const newDp = Array.from({ length: rows }, () => Array(cols).fill(-1));

    setMatrix(newMatrix);
    setDp(newDp);
    setVisited([]);
    setMinSum(0);
  };


  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};

  // Recursive (no memoization)
  const recursive = async (i, j, path, m, n) => {
    if (i >= m || j >= n) return Infinity;
    if (i === m - 1 && j === n - 1) return path[i][j];

    setVisited((prev) => [...prev, { i, j }]);
    await delay(900);

    await checkPaused();
    const right = await recursive(i, j + 1, path, m, n);
    await checkPaused();
    const down = await recursive(i + 1, j, path, m, n);


    await checkPaused();
    setVisited((prev) => prev.filter((v) => v.i !== i || v.j !== j));
    return path[i][j] + Math.min(right, down);
  };

  // Memoization
  const memoization = async (i, j, path, m, n, currentDp) => {
    if (i >= m || j >= n) return Infinity;
    if (currentDp[i][j] !== -1) return currentDp[i][j];

    if (i === m - 1 && j === n - 1) {

        await checkPaused();
      currentDp[i][j] = path[i][j];
      setDp([...currentDp]);
      return path[i][j];
    }

    setVisited((prev) => [...prev, { i, j }]);
    await delay(900);


    await checkPaused();

    const right = await memoization(i, j + 1, path, m, n, currentDp);

    await checkPaused();
    const down = await memoization(i + 1, j, path, m, n, currentDp);

    const res = path[i][j] + Math.min(right, down);
    currentDp[i][j] = res;

    await checkPaused();
    setDp([...currentDp]);

    setVisited((prev) => prev.filter((v) => v.i !== i || v.j !== j));
    await delay(900);
    return res;
  };

  // Tabulation
  const tabulation = async (path, m, n) => {



    const dpTable = Array.from({ length: m }, () => Array(n).fill(0));
    setDp(dpTable.map((r) => [...r])); // Initialize DP table in state
    dpTable[0][0] = path[0][0];
    setVisited([{ i: 0, j: 0 }]);
    setDp(dpTable.map((r) => [...r]));
    await delay(900);

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i === 0 && j === 0) continue;
        const top = i > 0 ? dpTable[i - 1][j] : Infinity;
        const left = j > 0 ? dpTable[i][j - 1] : Infinity;
        dpTable[i][j] = path[i][j] + Math.min(top, left);


        await checkPaused();
        setVisited([{ i, j }]);
        await checkPaused();
        setDp(dpTable.map((r) => [...r]));
        await delay(1100);
      }
    }

    setVisited([]);
    return dpTable[m - 1][n - 1];
  };

  const startFindingPaths = async () => {
    if (!matrix.length) return;

    setIsRunning(true);
    setVisited([]);
    const m = matrix.length;
    const n = matrix[0].length;
    let result = 0;

    if (approach === "recursive") {
      result = await recursive(0, 0, matrix, m, n);
    } else if (approach === "memoization") {
      const freshDp = Array.from({ length: m }, () => Array(n).fill(-1));
      setDp(freshDp);
      result = await memoization(0, 0, matrix, m, n, freshDp);
    } else if (approach === "tabulation") {
      result = await tabulation(matrix, m, n);
    }

    setMinSum(result);
    setIsRunning(false);
  };

  return (
    <div className=" left-0 top-0 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white w-screen min-h-screen justify-center overflow-hidden p-5 space-y-6 font-mono">
      <h2 className="text-2xl font-bold text-emerald-400">
        Find Minimum Path Sum
      </h2>

      <div className="flex space-x-2 items-center">
        <input
          type="number"
          min="1"
          max="12"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="px-2 py-1 rounded-md bg-gray-800 border border-gray-600 w-20 text-center"
        />
        <span>×</span>
        <input
          type="number"
          min="1"
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

           <button
            onClick={() => (isPaused.current = !isPaused.current)}
            disabled={!isRunning}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isPaused.current ? <PlayCircle size={18} /> : <Pause size={18} />}
            {isPaused.current ? "Resume" : "Pause"}
          </button>
      </div>

      <div className="flex space-x-4">
        {["recursive", "memoization", "tabulation"].map((opt) => (
          <label key={opt} className="flex items-center space-x-1">
            <input
              type="radio"
              value={opt}
              checked={approach === opt}
              onChange={() => setApproach(opt)}
              disabled={isRunning}
            />
            <span className="capitalize">{opt}</span>
          </label>
        ))}
      </div>

      {matrix.length > 0 && (
        <div
          className={`grid gap-1`}
          style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
        >
          {matrix.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isVisited = visited.some((v) => v.i === rowIndex && v.j === colIndex);
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 flex items-center justify-center text-sm font-bold border border-gray-700 rounded-md transition-all duration-300
                  ${isVisited ? "bg-green-400/70 text-black animate-pulse" : "bg-gray-800 text-emerald-300"}`}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
      )}

      {approach != "recursive" && dp.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400 mb-2">DP Table ({approach})</p>
          <div
            className={`grid gap-1`}
            style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
          >
            {dp.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-12 h-12 flex items-center justify-center text-sm font-bold border border-gray-700 bg-gray-700 text-gray-200 rounded-md"
                >
                  {cell === -1 ? "" : cell}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <button
        onClick={startFindingPaths}
        disabled={isRunning || !matrix.length}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition rounded-md"
      >
        {isRunning ? "Calculating..." : "Start Traversal"}
      </button>

      <h3 className="text-lg font-semibold text-emerald-300">
        MinPathSum: {minSum}
      </h3>
    </div>
  );
};

export default MinimumPathSum;
