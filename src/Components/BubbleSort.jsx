

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowDownCircle, ArrowUpCircle, Code, RefreshCw, PlayCircle, Info } from 'lucide-react';

const BubbleSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex, setSortedArrayIndex] = useState([]);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

  // Generate random particles for the background
  useEffect(() => {
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      color: `rgba(${Math.random() * 50 + 50}, ${Math.random() * 100 + 100}, ${Math.random() * 150 + 100}, ${Math.random() * 0.3 + 0.1})`
    }));
    setBackgroundParticles(particles);
  }, []);

  // Animation frame for particles
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 100
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => setInputValue(e.target.value);

  const generateRandomArray = () => {
    if (!arrSize || arrSize <= 0 || arrSize > 15) {
      toast.error("Please enter a valid array size between 1 and 15");
      return;
    }
    
    // Generate random array
    const randomArray = Array.from({ length: arrSize }, () => 
      Math.floor(Math.random() * 100)
    );
    
    setArr(randomArray);
    setInputValue(randomArray.join(' '));
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    toast.success("Random array generated!");
  };

  const handleSubmit = () => {
    if (!arrSize || arrSize <= 0) {
      toast.error("Please enter a valid array size");
      return;
    }
    
    const elements = inputValue.trim().split(/\s+/).map(Number);
    
    if (elements.some(isNaN)) {
      toast.error("Please enter valid numbers");
      return;
    }
    
    if (elements.length !== arrSize) {
      toast.error(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    
    setArr(elements);
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    toast.success("Array initialized successfully!");
  };

  const handleBubbleSort = async () => {
    let newArr = [...arr];
    
    for (let i = 0; i < arrSize - 1; i++) {
      for (let j = 0; j < arrSize - i - 1; j++) {
        setLeftIndex(j);
        setRightIndex(j + 1);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (newArr[j] > newArr[j + 1]) {
          // Swap elements
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
          setArr([...newArr]);
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }
      
      // Mark this position as sorted
      setSortedArrayIndex((prev) => [...prev, arrSize - i - 1]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    
    // Mark the first element as sorted too
    setSortedArrayIndex((prev) => [...prev, 0]);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setArr([...newArr]);
  };

  const startBubbleSort = async () => {
    if (!arr.length) {
      toast.error("Please submit an array first!");
      return;
    }
    
    setIsSorting(true);
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    
    await handleBubbleSort();
    
    setLeftIndex(-1);
    setRightIndex(-1);
    toast.success("Bubble Sort Completed!");
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    
    setArr([]);
    setInputValue('');
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    toast.success("Reset successful!");
  };

  // Pseudo code for bubble sort
  const bubbleSortCode = `function bubbleSort(arr):
    n = arr.length
    
    for i from 0 to n-1:
        for j from 0 to n-i-1:
            // Compare adjacent elements
            if arr[j] > arr[j+1]:
                // Swap them if they are in wrong order
                swap arr[j] and arr[j+1]
                
    return arr`;

  // Algorithm info
  const algorithmInfo = `
    Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
    compares adjacent elements, and swaps them if they are in the wrong order. 
    
    Time Complexity:
    • Best Case: O(n) - when array is already sorted
    • Average Case: O(n²)
    • Worst Case: O(n²) - when array is sorted in reverse order
    
    Space Complexity: O(1) - only requires a single additional memory space for swapping
    
    This algorithm is named for the way smaller elements "bubble" to the top of the list.
    While simple to understand and implement, Bubble Sort is not efficient for large data sets.`;

    
  const Close = () => {

    setWindowWidth(1000);

  }
  return (
    <div className="relative z-10 flex flex-col bg-gray-950 min-h-screen w-full px-4 py-8 overflow-hidden">
      {/* Background particles */}

      
      {windowWidth < 500 ?
      <div className="max-w-sm absolute z-40 ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}

      {backgroundParticles.map((particle, i) => (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header with animated border */}
        <div className="relative mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-green-600">
            Bubble Sort Algorithm
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-center mt-3 max-w-xl">
            Visualize how bubble sort works by comparing adjacent elements
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
              onClick={startBubbleSort}
              disabled={isSorting || arr.length === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20 transition-all disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isSorting ? "Sorting..." : "Start Sorting"}
            </button>
            
            <button
              onClick={resetArray}
              disabled={isSorting}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Reset
            </button>
            
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 transition-all"
              >
                <Info size={18} />
                {showInfo ? "Hide Info" : "Algorithm Info"}
              </button>
              
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

        {/* Information and Code Sections */}
        <div className="w-full max-w-3xl mb-8 space-y-4">
          {/* Algorithm Info */}
          {showInfo && (
            <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full overflow-x-auto">
              <h3 className="text-lg font-medium text-emerald-400 mb-3">About Bubble Sort</h3>
              <div className="text-gray-300 text-sm whitespace-pre-line">
                {algorithmInfo}
              </div>
            </div>
          )}
          
          {/* Code Section */}
          {showCode && (
            <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full overflow-x-auto">
              <h3 className="text-lg font-medium text-emerald-400 mb-3">Pseudo Code</h3>
              <pre className="text-gray-300 font-mono text-sm">
                {bubbleSortCode}
              </pre>
            </div>
          )}
        </div>

        {/* Visualization Section */}
        {arr.length > 0 && (
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-800 rounded-xl p-6 w-full max-w-4xl mt-4">
            <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isSorting ? "bg-purple-500 animate-pulse" : "bg-green-500"}`}></span>
              Visualization {isSorting && <span className="text-purple-400 ml-2">(in progress...)</span>}
            </h3>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-gray-300 text-xs">Sorted Elements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300 text-xs">Left Element (j)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-300 text-xs">Right Element (j+1)</span>
              </div>
            </div>
            
            {/* Array visualization */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 pb-20 relative">
              {arr.map((val, index) => {
                const isSorted = sortedArrayIndex.includes(index);
                const isLeft = index === leftIndex;
                const isRight = index === rightIndex;
                
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1 relative my-8"
                  >
                    {/* Index number */}
                    <div className="text-gray-500 text-xs mb-1">{index}</div>
                    
                    {/* Left Comparison Indicator */}
                    {isLeft && (
                      <div className="absolute -top-14 flex flex-col items-center">
                        <span className="text-blue-400 text-sm font-medium mb-1">j</span>
                        <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
                        <ArrowDownCircle size={20} className="text-blue-500" />
                      </div>
                    )}
                    
                    {/* Right Comparison Indicator */}
                    {isRight && (
                      <div className="absolute -top-14 flex flex-col items-center">
                        <span className="text-purple-400 text-sm font-medium mb-1">j+1</span>
                        <div className="h-8 w-px bg-gradient-to-b from-purple-500 to-transparent"></div>
                        <ArrowDownCircle size={20} className="text-purple-500" />
                      </div>
                    )}

                    {/* Value Box with glass effect */}
                    <div
                      className={`relative rounded-lg backdrop-blur-sm shadow-lg w-14 h-14 text-xl font-medium flex items-center justify-center transition-all duration-300 overflow-hidden
                        ${isSorted
                            ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-300 shadow-emerald-500/30"
                            : isLeft
                                ? "bg-blue-500/30 border-2 border-blue-500 text-blue-300 shadow-blue-500/30"
                                : isRight
                                    ? "bg-purple-500/30 border-2 border-purple-500 text-purple-300 shadow-purple-500/30"
                                    : "bg-gray-800/50 border border-gray-700 text-gray-300"
                        }`}
                    >
                      {/* Inner glow/pulse effect when swapping */}
                      {(isLeft || isRight) && !isSorted && (
                        <div className="absolute inset-0 bg-blue-500/10 animate-pulse rounded-lg"></div>
                      )}
                      <span className="relative z-10">{val}</span>
                    </div>
                    
                    {/* Connection line between compared elements */}
                    {isLeft && arr[index + 1] !== undefined && index + 1 === rightIndex && (
                      <div className="absolute top-1/2 left-[calc(100%_-_7px)] w-[calc(100%_+_6px)] h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom styled toast container */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
};

export default BubbleSort;