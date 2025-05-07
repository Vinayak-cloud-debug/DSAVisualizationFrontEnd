import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, RefreshCw, Play, Loader2 } from 'lucide-react';

const InsertionSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex, setSortedArrayIndex] = useState([]);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [sortingProgress, setSortingProgress] = useState(0);

  // Update input value when array changes
  useEffect(() => {
    setInputValue(arr.join(' '));
  }, [arr]);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    if (!isNaN(size) && size > 0 && size <= 15) {
      setArrSize(size);
    }
  };

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.some(isNaN)) {
      showToast('Please enter valid integers separated by space.', 'error');
      return;
    }
    if (elements.length !== arrSize) {
      showToast(`Please enter exactly ${arrSize} elements.`, 'error');
      return;
    }
    setArr(elements);
    resetIndices();
    showToast('Array submitted!', 'success');
  };

  const resetIndices = () => {
    setLeftIndex(-1);
    setRightIndex(-1);
    setSortedArrayIndex([]);
    setSortingProgress(0);
  };

  const generateRandomArray = () => {
    const randomArr = Array.from({ length: arrSize }, () => 
      Math.floor(Math.random() * 100)
    );
    
    setArr(randomArr);
    setInputValue(randomArr.join(' '));
    resetIndices();
    showToast('Random array generated!', 'success');
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Insertion Sort implementation
  const handleInsertionSort = async () => {
    setIsSorting(true);
    let newArr = [...arr];
    
    setLeftIndex(0);
    setRightIndex(0);
    await delay(animationSpeed);

    setSortedArrayIndex([newArr[0]]); // First element is already sorted
    await delay(animationSpeed/2);

    for (let i = 1; i < arrSize; i++) {
      // Current element to be compared
      let current = newArr[i];
      let j = i - 1;
      
      setRightIndex(i);
      await delay(animationSpeed/2);
      
      // Compare current element with sorted portion and move elements
      while (j >= 0 && newArr[j] > current) {
        setLeftIndex(j);
        await delay(animationSpeed);
        
        newArr[j + 1] = newArr[j];
        setArr([...newArr]);
        await delay(animationSpeed/2);
        
        j--;
      }
      
      // Place current element at correct position
      newArr[j + 1] = current;
      setArr([...newArr]);
      await delay(animationSpeed/2);
      
      // Update sorted portion
      setSortedArrayIndex(newArr.slice(0, i + 1));
      setSortingProgress(Math.round(((i + 1) / arrSize) * 100));
      await delay(animationSpeed);
    }
    
    setLeftIndex(-1);
    setRightIndex(-1);
    setIsSorting(false);
    showToast("Insertion Sort Completed!", 'success');
  };

  const startInsertionSort = async () => {
    if (!arr.length) {
      showToast("Please submit or generate an array first!", 'error');
      return;
    }
    resetIndices();
    await handleInsertionSort();
  };
  
  const showToast = (message, type) => {
    // We'll use a simple visual indicator instead of toast library
    console.log(`${type}: ${message}`);
  };

  // Calculate dynamic sizes for array elements based on array length
  const getElementSize = () => {
    if (arrSize <= 6) return 'w-16 h-16';
    if (arrSize <= 8) return 'w-14 h-14';
    if (arrSize <= 10) return 'w-12 h-12';
    return 'w-10 h-10';
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen w-full px-4 py-8 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">
            Insertion Sort Visualizer
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>

          <p className="text-gray-400 mt-5">Watch how elements get inserted into their correct positions</p>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Array Size Input */}
            <div className="flex flex-col">
              <label className="text-gray-300 mb-2 text-sm">Array Size (1-15)</label>
              <input
                type="number"
                min="1"
                max="15"
                className="p-3 border rounded-lg bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Size"
                value={arrSize}
                onChange={handleSizeChange}
                disabled={isSorting}
              />
            </div>
            
            {/* Array Elements Input */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-300 mb-2 text-sm">Array Elements (space separated)</label>
              <input
                type="text"
                className="p-3 border rounded-lg bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter numbers separated by spaces"
                value={inputValue}
                onChange={handleInput}
                disabled={isSorting}
              />
            </div>
          </div>
          
          {/* Animation Speed Control */}
          <div className="mb-6">
            <label className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Animation Speed</span>
                <span className="text-gray-400">{animationSpeed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="100"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full "
                disabled={isSorting}
              />
            </label>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-cyan-700 transition-all shadow-md hover:shadow-cyan-500/30 disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Generate Random
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSorting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/30 disabled:opacity-50"
            >
              Submit Array
            </button>
            
            <button
              onClick={startInsertionSort}
              disabled={isSorting || arr.length === 0}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-500/30 disabled:opacity-50 flex items-center gap-2"
            >
              {isSorting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sorting...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start Sorting
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        {isSorting && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${sortingProgress}%` }}
            ></div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 bg-gray-800/70 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
            <span className="text-sm">Sorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-500 rounded"></div>
            <span className="text-sm">Left Index</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Right Index</span>
          </div>
        </div>

        {/* Array Visualization */}
        <div className="flex flex-wrap justify-center gap-6 p-8 bg-gray-800/50 rounded-xl min-h-48 backdrop-blur-sm shadow-xl">
          {arr.length === 0 ? (
            <div className="text-gray-400 italic">No array to visualize. Generate or submit an array to begin.</div>
          ) : (
            arr.map((val, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {/* Top pointer indicator */}
                <div className="h-10 relative w-full">
                  {index === leftIndex && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <ArrowDown className="text-cyan-500" />
                      <span className="text-xs text-cyan-500">Left</span>
                    </div>
                  )}
                </div>

                {/* Array Element Box */}
                <div
                  className={`rounded-lg shadow-lg ${getElementSize()} flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    sortedArrayIndex.includes(val) 
                      ? 'bg-emerald-600 text-white' 
                      : index === leftIndex 
                        ? 'bg-cyan-700 text-white' 
                        : index === rightIndex 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-gray-700 text-white'
                  }`}
                >
                  {val}
                </div>

                {/* Bottom pointer indicator */}
                <div className="h-10 relative w-full">
                  {index === rightIndex && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      <span className="text-xs text-yellow-500">Right</span>
                      <ArrowUp className="text-yellow-500" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InsertionSort;