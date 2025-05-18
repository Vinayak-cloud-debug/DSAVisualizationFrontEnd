

import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpCircle, RefreshCw, Play, Pause, SkipBack,ArrowDownCircle,PlayCircle, Code } from 'lucide-react';

const QuickSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [lowIndex, setLowIndex] = useState(-1);
  const [highIndex, setHighIndex] = useState(-1);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [correctlyPlacedPivotIndex, setCorrectlyPlacedPivotIndex] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [statusMessage, setStatusMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isPaused = useRef(false);
  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {


    window.scrollBy({
      top: 1200,
      behavior: 'smooth'
    })
    

    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.some(isNaN)) {
      showToast('Please enter valid integers separated by space.', 'error');
      return;
    }
    setArr(elements);
    resetIndices();
    showToast('Array submitted!', 'success');
  };

  const resetIndices = () => {
    setLowIndex(-1);
    setHighIndex(-1);
    setPivotIndex(-1);
    setCorrectlyPlacedPivotIndex([]);
    setStatusMessage('');
  };

  const reset = () => {
    resetIndices();
    setIsSorting(false);
  };

  const generateRandomArray = () => {
    // Adjust size based on screen width
    const size = arrSize // 4 to maxSize elements
    
    const randomArr = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100)
    );
    
    setArr(randomArr);
    setInputValue(randomArr.join(' '));
    resetIndices();
    showToast('Random array generated!', 'success');
  };



  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};

  const partition = async (arr, low, high) => {
    if (low === high) {
      setPivotIndex(low);
      setLowIndex(low);
      setHighIndex(high);
      setStatusMessage(`Single element ${arr[low]} is already at correct position`);
      await delay(speed);
      setCorrectlyPlacedPivotIndex((prev) => [...prev, low]);
      await delay(speed);
      return low;
    }

    let pivot = arr[low];
    let i = low;
    let j = high;
  
    setLowIndex(low);
    setHighIndex(high);
    setPivotIndex(low);
    await delay(speed);
    setStatusMessage(`Pivot: ${pivot} | Starting partition with low=${low} and high=${high}`);
    await delay(speed);
  
    while (i <= j) {

      
      // Move i right until we find a number > pivot
      while (i <= high && arr[i] <= pivot) {

        await checkPaused();
        setLowIndex(i);
        setStatusMessage(`Left pointer moving right: Finding element > ${pivot}`);
        await delay(speed);
        i++;
      }

      
  
      // Move j left until we find a number <= pivot
      while (j > low && arr[j] > pivot) {

        await checkPaused();
        setHighIndex(j);
        setStatusMessage(`Right pointer moving left: Finding element <= ${pivot}`);
        await delay(speed);
        j--;
      }
  
      if (i < j) {
        
        await checkPaused();
        setStatusMessage(`Swapping elements: ${arr[i]} and ${arr[j]}`);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArr([...arr]);
        await delay(speed);
      }
    }


    await checkPaused();
    setStatusMessage(`Placing pivot ${pivot} at its correct position`);
    [arr[low], arr[j]] = [arr[j], arr[low]];
    setArr([...arr]);
    await delay(speed);

    setPivotIndex(j);
    setLowIndex(j);
    setHighIndex(high);

    await delay(speed);
    setCorrectlyPlacedPivotIndex((prev) => [...prev, j]);
    await delay(speed);
    setStatusMessage(`Pivot ${arr[j]} is now at its correct position`);
    await delay(speed);
    return j;
  };
  
  const quickSort = async (array, low, high) => {
    if (low <= high) {
      setStatusMessage(`Sorting subarray from index ${low} to ${high}`);
      await delay(speed);
      
      const pi = await partition(array, low, high);
      
      await quickSort(array, low, pi - 1);
      await quickSort(array, pi + 1, high);
    }
  };

  const handleQuickSort = async () => {
    if (!arr.length) {
      showToast('Please submit a valid array first!', 'error');
      return;
    }

    setIsSorting(true);
    const copy = [...arr];
    resetIndices();
    setCorrectlyPlacedPivotIndex([]);
    
    try {
      setStatusMessage('Starting QuickSort algorithm...');
      await quickSort(copy, 0, copy.length - 1);
      resetIndices();
      setStatusMessage('QuickSort completed successfully!');
      showToast('QuickSort Completed!', 'success');
      
      // Highlight all elements as correctly placed after sorting completes
      setCorrectlyPlacedPivotIndex(Array.from(Array(arr.length).keys()));
    } catch (error) {
      showToast('Error during sorting', 'error');
      setStatusMessage('Error during sorting process');
    } finally {
      setIsSorting(false);
    }
  };
  
  const showToast = (message, type) => {
    setStatusMessage(message);
    console.log(`${type}: ${message}`);
  };

  // Calculate dynamic sizes for array elements based on array length and screen width
  const getElementSize = () => {
    // For mobile
    if (windowWidth < 640) {
      if (arr.length <= 3) return 'w-16 h-16 text-xl';
      if (arr.length <= 5) return 'w-14 h-14 text-lg';
      return 'w-12 h-12 text-md';
    }
    // For tablet
    else if (windowWidth < 1024) {
      if (arr.length <= 5) return 'w-16 h-16 text-xl';
      if (arr.length <= 7) return 'w-14 h-14 text-lg';
      return 'w-12 h-12 text-md';
    }
    // For desktop
    else {
      if (arr.length <= 6) return 'w-20 h-20 text-2xl';
      if (arr.length <= 8) return 'w-16 h-16 text-xl';
      return 'w-14 h-14 text-lg';
    }
  };

  // Get pointer indicator styles for better visualization
  const getPointerStyle = (type) => {
    const baseStyle = " transform translate-x-0 flex flex-col items-center justify-center";
    
    switch(type) {
      case 'pivot':
        return `${baseStyle}  mb-1 w-full`;
      case 'left':
        return `${baseStyle} bottom-full mb-1 w-full`;
      case 'right':
        return `${baseStyle} top-full mt-1 w-full`;
      default:
        return baseStyle;
    }
  };

  const Close = () => {

    setWindowWidth(1000);

  }


  const [showCode, setShowCode] = useState(false);



  return (
    <div className={`flex  flex-col min-h-screen bg-gradient-to-br from-gray-900  to-black text-gray-100`}>

      {windowWidth < 500 ?
      <div className="max-w-sm   ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}

      

        {/* Controls Section */}
          <div className=" bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header with animated border */}
        <div className="relative mb-8">
          <h1 className="text-3xl sm:text-4xl mt-5 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-green-600">
            Quick Sort Algorithm
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-center mt-3 max-w-xl">
            Visualize how the Quick Sort algorithm works with real-time animations.
          </p>
        </div>

        {/* Input Section - Glass morphism card */}
        <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl p-6 w-full max-w-3xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Array Size <span className="text-gray-500">(max 15)</span></label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="15"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter size"
                  onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-300 text-sm font-medium">Array Elements</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter elements separated by space (e.g., 42 17 8 23 5)"
                  value={inputValue}
                  onChange={handleInput}
                  disabled={isSorting}
                />
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSorting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} className={isSorting ? "animate-spin" : ""} />
              Initialize Array
            </button>
            
            <button
              onClick={generateRandomArray}
              disabled={isSorting || !arrSize}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-700/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Random Array
            </button>
            
            <button
              onClick={handleQuickSort}
              disabled={isSorting || arr.length === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20 transition-all disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isSorting ? "Sorting..." : "Start Sorting"}
            </button>
            
            <button
              onClick={resetIndices}
              disabled={isSorting}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Reset
            </button>

          

            
            <div className="flex gap-2 ml-auto">
              
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 transition-all"
              >
                <Code size={18} />
                {showCode ? "Hide Code" : "Show Code"}
              </button>
            </div>
          </div>
        </div>

        

        {/* Speed Control and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/70 p-5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50">
            <label className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">Animation Speed</span>
                <span className="text-purple-400 font-mono bg-purple-900/30 px-2 py-1 rounded-md text-sm">{speed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
                disabled={isSorting}
              />
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </label>
          </div>
          
          <div className="bg-gray-800/70 p-5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 flex items-center justify-center">
            <div className="text-center w-full">
              <span className="text-gray-400 block mb-1">Status:</span>
              <p className="text-purple-300 font-medium bg-purple-900/20 py-2 px-3 rounded-md overflow-hidden text-ellipsis">{statusMessage || 'Ready to sort'}</p>
            </div>
          </div>
        </div>


        

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 bg-gray-800/50 p-4 rounded-lg shadow-md border border-gray-700/30">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-md shadow-purple-500/30"></div>
            <span className="text-sm text-gray-300">Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-md shadow-red-500/30"></div>
            <span className="text-sm text-gray-300">Left Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-md shadow-blue-500/30"></div>
            <span className="text-sm text-gray-300">Right Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-md shadow-green-500/30"></div>
            <span className="text-sm text-gray-300">Sorted Element</span>
          </div>

           <button
              onClick={() => (isPaused.current = !isPaused.current)}
              disabled={!isSorting}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isPaused.current ? <PlayCircle size={18} /> : <Pause size={18} />}
              {isPaused.current ? "Resume" : "Pause"}
          </button>
        </div>

        {/* Array Visualization */}
        <div className="flex flex-wrap justify-center gap-4 p-8 backdrop-blur-sm bg-gray-900/30  border-gray-800 rounded-xl min-h-56 shadow-xl border ">
          {arr.length === 0 ? (
            <div className="text-gray-400 italic flex flex-col items-center justify-center min-h-32">
              <RefreshCw size={40} className="text-gray-500 mb-4 opacity-30" />
              <p>No array to visualize. Generate or submit an array to begin.</p>
            </div>
          ) : (
            arr.map((val, index) => (
              <div key={index} className="flex flex-col items-center justify-center relative">
                {/* Space for top indicators */}
                <div className="h-12 w-full relative">
                  {/* Pivot indicator */}
                  {index === pivotIndex && (
                    <div className={getPointerStyle('pivot')}>
                      <div className="flex flex-col items-center ">
                        <div className="text-xs font-medium mb-1  bg-purple-900/50 text-purple-300 rounded-md px-2  py-0.5 shadow-md">Pivot</div>
                        <ArrowDownCircle className="text-purple-400 " size={20} />
                      </div>
                    </div>
                  )}
                  
                  {/* Left pointer indicator */}
                  {index === lowIndex && index !== pivotIndex && (
                    <div className={getPointerStyle('left')}>
                      <div className="flex flex-col items-center">
                        <div className="text-xs font-medium mb-1 bg-red-900/50 text-red-400 rounded-md px-2 py-0.5 shadow-md">Left</div>
                        <ArrowDownCircle className="text-red-700 " size={20} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Array Element Box - Enhanced with better shadows and gradients */}
                <div
                  className={`${getElementSize()}  flex items-center justify-center font-bold transition-all duration-300 rounded-xl ${
                    index === pivotIndex ? 'bg-blue-800/30 to-blue-900 text-white ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/30 transform scale-105' :
                    correctlyPlacedPivotIndex.includes(index) ? 'bg-green-700/30 border-2 border-green-700 text-green-300 shadow-green-500/30' :
                    'bg-gray-800/30 border-2 border-gray-700 text-gray-300 shadow-gray-500/30'
                  }`}
                >
                  {val}
                </div>

                {/* Space for bottom indicators */}
                <div className="h-12 w-full relative">
                  {/* Right pointer indicator */}
                  {index === highIndex && (
                    <div className={getPointerStyle('right')}>
                      <div className="flex flex-col items-center">
                        <ArrowUpCircle className="text-blue-400 " size={20} />
                        <div className="text-xs font-medium mt-1 bg-blue-900/50 text-blue-300 rounded-md px-2 py-0.5 shadow-md">Right</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      

    </div>

    <div className='mb-32'></div>
    </div>
  );
};

export default QuickSort;