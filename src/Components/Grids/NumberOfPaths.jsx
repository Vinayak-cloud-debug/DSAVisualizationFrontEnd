

import { Pause } from "lucide-react";
import React, { useRef, useState } from "react";

const NumberOfPaths = () => {
  const [matrix, setMatrix] = useState([]);
  const [visited, setVisited] = useState([]);
  const [numPaths, setNumPaths] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [dpTable, setDpTable] = useState([]);
  const [strategy, setStrategy] = useState("recursion");
  const isPaused = useRef(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomMatrix = (rows, cols, obstacleProbability = 0.25) => {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        Math.random() < obstacleProbability ? "*" : ""
      )
    );
    newMatrix[0][0] = "";
    newMatrix[rows - 1][cols - 1] = "";
    setMatrix(newMatrix);
    setNumPaths(0);
    setVisited([]);
    setDpTable([]);
  };


  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};


  const findPathsRecursion = async (i, j, path, m, n) => {
    if (i >= m || j >= n || path[i][j] === "*") return 0;
    if (i === m - 1 && j === n - 1) {

      await checkPaused();
      setNumPaths((prev) => prev + 1);
      setVisited((prev) => [...prev, { i, j }]);
      await delay(900);
      setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
      return 1;
    }

    setVisited((prev) => [...prev, { i, j }]);
    await delay(900);

    await checkPaused();
    const right = await findPathsRecursion(i, j + 1, path, m, n);

    await checkPaused();
    const down = await findPathsRecursion(i + 1, j, path, m, n);
    setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
    return right + down;
  };

  const findPathsMemoization = async () => {
    const m = matrix.length;
    const n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(-1));

    const dfs = async (i, j) => {

      if (i >= m || j >= n || matrix[i][j] === "*") return 0;
      if (i === m - 1 && j === n - 1) return 1;
      if (memo[i][j] !== -1) return memo[i][j];

      setVisited((prev) => [...prev, { i, j }]);
      await delay(1000);


      await checkPaused();
      const right = await dfs(i, j + 1);

      await checkPaused();
      const down = await dfs(i + 1, j);
      memo[i][j] = right + down;


      await checkPaused();
      setDpTable([...memo.map((row) => [...row])]);
      setVisited((prev) => prev.filter((cell) => cell.i !== i || cell.j !== j));
      return memo[i][j];
    };

    const result = await dfs(0, 0);
    setNumPaths(result);
  };

  const findPathsTabulation = async () => {
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === "*") {
          dp[i][j] = 0;
        } else if (i === 0 && j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] =
            (i > 0 ? dp[i - 1][j] : 0) + (j > 0 ? dp[i][j - 1] : 0);
        }


        await checkPaused();
        setVisited([{ i, j }]);
        setDpTable([...dp.map((row) => [...row])]);
        await delay(1150);
      }
    }

    await checkPaused();
    setVisited([]);
    setNumPaths(dp[m - 1][n - 1]);
  };

  const startFindingPaths = async () => {
    if (!matrix.length) return;
    setIsRunning(true);
    setNumPaths(0);
    setVisited([]);
    setDpTable([]);

    if (strategy === "recursion") {
      await findPathsRecursion(0, 0, matrix, matrix.length, matrix[0].length);
    } else if (strategy === "memoization") {
      await findPathsMemoization();
    } else {
      await findPathsTabulation();
    }

    setIsRunning(false);
  };

  return (
    <div className=" left-0 top-0 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white w-screen min-h-screen justify-center overflow-hidden p-5 space-y-6 font-mono">
      <h2 className="text-2xl ml-5 font-bold text-emerald-400">
        Count all the paths from top-left to bottom-right
      </h2>

      <div className="flex flex-wrap ml-5 gap-5 grid-cols-3 space-x-2 items-center">
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
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="px-2 py-1 bg-gray-800 border border-gray-600 rounded-md"
        >
          <option value="recursion">Recursion</option>
          <option value="memoization">Memoization</option>
          <option value="tabulation">Tabulation</option>
        </select>
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
                      : "bg-gray-800 text-emerald-300"}`}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
      )}

      

      {dpTable.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-bold text-white mb-2">DP Table</h4>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
          >
            {dpTable.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`dp-${rowIndex}-${colIndex}`}
                  className="w-12 h-12 flex items-center justify-center bg-gray-700 border border-gray-600 text-amber-400 font-bold rounded-md"
                >
                  {cell >= 0 ? cell : ""}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberOfPaths;
