

import React, { useState,useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { ChevronDown, ChevronUp, Search, RefreshCw, PlayCircle, Code, Shuffle, Pause } from 'lucide-react';

const BSAlgo = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [Low, setLow] = useState(null);
  const [High, setHigh] = useState(null);
  const [Mid, setMid] = useState(null);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const isPaused = useRef(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {

    
    window.scrollBy({
      top: 1200,
      behavior: 'smooth'
    })
    
    // Validate size
    if (arrSize <= 0) {
      toast.error("Please enter a valid array size");
      return;
    }

    // Parse and validate input
    const elements = inputValue.trim().split(/\s+/).map(Number);
    
    // Check if input matches the specified size
    if (elements.length !== arrSize) {
      toast.error(`Please enter exactly ${arrSize} elements.`);
      return;
    }

    // Check if array is sorted
    for (let i = 1; i < elements.length; i++) {
      if (elements[i] < elements[i-1]) {
        toast.error("Array must be sorted in ascending order for binary search.");
        return;
      }
    }

    setArr(elements);
    setLow(0);
    setHigh(elements.length - 1);
    setMid(null);
    setFound(false);
    toast.success("Array initialized successfully!");
  };

  // Generate random sorted array based on array size
  const generateRandomArray = () => {
    if (arrSize <= 0) {
      toast.error("Please enter a valid array size");
      return;
    }

    if (arrSize > 100) {
      toast.error("For visualization purposes, please limit array size to 100 elements");
      return;
    }

    // Generate random array with sorted values
    const minValue = 1;
    const maxValue = 999;
    let randomArray = [];
    
    // Start with a random value between 1-100
    let currentValue = Math.floor(Math.random() * 100) + minValue;
    
    for (let i = 0; i < arrSize; i++) {
      randomArray.push(currentValue);
      
      // Increase by a random amount (1-20) for the next element to ensure sorting
      const increment = Math.floor(Math.random() * 20) + 1;
      currentValue += increment;
      
      // Cap at max value
      if (currentValue > maxValue) currentValue = maxValue;
    }
    
    // Update state with the generated array
    setArr(randomArray);
    setInputValue(randomArray.join(' '));
    setLow(0);
    setHigh(randomArray.length - 1);
    setMid(null);
    setFound(false);
    toast.success("Random sorted array generated!");
  };

  const resetVisualization = () => {
    if (arr.length > 0) {
      setLow(0);
      setHigh(arr.length - 1);
      setMid(null);
      setFound(false);
      toast.success("Reset visualization");
    }
  };



  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};

  const visualizeBinarySearch = async () => {
    if (arr.length === 0) {
      toast.error("Please initialize the array first");
      return;
    }

    if (!searchValue.trim()) {
      toast.error("Please enter a value to search");
      return;
    }

    const value = parseInt(searchValue, 10);
    if (isNaN(value)) {
      toast.error("Please enter a valid number to search");
      return;
    }

    setIsSearching(true);
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
      await checkPaused();
      const mid = Math.floor((low + high) / 2);
      setLow(low);
      setHigh(high);
      setMid(mid);

      // Visualize the current state
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (arr[mid] === value) {
        await checkPaused();

        setFound(true);
        setMid(mid);
        toast.success(`Element found at index ${mid}`, {
          icon: '🎯',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setIsSearching(false);
        return;
      } else if (arr[mid] < value) {
        low = mid + 1;
        await checkPaused();

        setLow(mid+1);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        high = mid - 1;
        await checkPaused();

        setHigh(mid-1);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    setFound(false);
    toast.error("Element not found", {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    setIsSearching(false);
  };

  // Pseudo code for binary search
  const binarySearchCode = `function binarySearch(arr, target):
    low = 0
    high = arr.length - 1
    
    while low <= high:
        mid = Math.floor((low + high) / 2)
        
        if arr[mid] == target:
            return mid  // Element found
        else if arr[mid] < target:
            low = mid + 1  // Search in right half
        else:
            high = mid - 1  // Search in left half
            
    return -1  // Element not found`;

    const Close = () => {

      setWindowWidth(1000);
  
    }

  return (
    <div className="relative z-10 flex flex-col bg-gray-950 min-h-screen w-full px-4 py-8 overflow-hidden">
      
      
      {windowWidth < 500 ?
      <div className="max-w-sm absolute z-40 ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}
      
      {/* Background particles */}
      {/* {backgroundParticles.map((particle, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-blue-600"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(1px)'
          }}
        />
      ))}
       */}
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header with animated border */}
        <div className="relative mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
            Binary Search Algorithm
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-center mt-3 max-w-xl">
            Visualize how binary search efficiently finds elements in a sorted array
          </p>
        </div>

        {/* Input Section - Glass morphism card */}
        <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl p-6 w-full max-w-3xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Array Size</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter size"
                  onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Search Value</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Value to find"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search size={18} className="text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-gray-300 text-sm font-medium">Array Elements (sorted)</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter elements separated by space (e.g., 1 3 5 7 9)"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSearching}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-700/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} className={isSearching ? "animate-spin" : ""} />
              Initialize Array
            </button>
            
            <button
              onClick={generateRandomArray}
              disabled={isSearching || arrSize <= 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-orange-700/20 transition-all disabled:opacity-50"
            >
              <Shuffle size={18} />
              Generate Random Array
            </button>
            
            <button
              onClick={visualizeBinarySearch}
              disabled={isSearching || arr.length === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20 transition-all disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isSearching ? "Searching..." : "Start Search"}
            </button>
            
            <button
              onClick={resetVisualization}
              disabled={isSearching || arr.length === 0}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Reset
            </button>
            
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 ml-auto transition-all"
            >
              <Code size={18} />
              {showCode ? "Hide Code" : "Show Code"}
            </button>
          </div>
        </div>

        {/* Code Section */}
        {showCode && (
          <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full max-w-3xl mb-8 overflow-x-auto">
            <pre className="text-gray-300 font-mono text-sm">
              {binarySearchCode}
            </pre>
          </div>
        )}

        {/* Visualization Section */}
        {arr.length > 0 && (
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-800 rounded-xl p-6 w-full max-w-4xl mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-300 mb-6 mt-3 flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isSearching ? "bg-purple-500 animate-pulse" : "bg-green-500"}`}></span>
                Visualization {isSearching && <span className="text-purple-400 ml-2">(in progress...)</span>}
              </h3>

              <button
            onClick={() => (isPaused.current = !isPaused.current)}
            disabled={!isSearching}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isPaused.current ? <PlayCircle size={18} /> : <Pause size={18} />}
            {isPaused.current ? "Resume" : "Pause"}
          </button>

        </div>
            
            <div className="flex flex-row flex-wrap justify-center gap-4  mt-8 relative">
              {/* Legend */}
              <div className="absolute top-0 right-0 flex flex-col gap-2 bg-gray-900/70 p-3 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-300 text-xs">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-300 text-xs">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-300 text-xs">Mid</span>
                </div>
              </div>
              
              {/* Array visualization */}
              {arr.map((val, index) => (
                <div
                  key={index}
                  className="flex flex-col  items-center gap-1 relative my-28"
                >
                  {/* Top Pointer (Mid) */}
                  {index === Mid && (
                    <div className="absolute -top-14 flex flex-col items-center">
                      <span className="text-green-400 text-sm font-medium mb-1">Mid</span>
                      <div className="h-8 w-px bg-gradient-to-b from-green-500 to-transparent"></div>
                      <ChevronDown size={24} className="text-green-500" />
                    </div>
                  )}

                  {/* Index number */}
                  <div className="text-gray-500 text-xs mb-1">{index}</div>

                  {/* Value Box with glass effect */}
                  <div
                    className={`relative rounded-lg backdrop-blur-sm shadow-lg w-14 h-14 text-xl font-medium flex items-center justify-center transition-all duration-500 overflow-hidden
                      ${index === Mid
                          ? "bg-green-500/20 border-2 border-green-500 text-green-300 shadow-green-500/30"
                          : index === Low
                              ? "bg-blue-500/20 border-2 border-blue-500 text-blue-300 shadow-blue-500/30"
                              : index === High
                                  ? "bg-red-500/20 border-2 border-red-500 text-red-300 shadow-red-500/30"
                                  : "bg-gray-800/50 border border-gray-700 text-gray-300"
                      }`}
                  >
                    {/* Inner glow/pulse effect when found */}
                    {found && index === Mid && (
                      <div className="absolute inset-0 bg-green-500/30 animate-pulse rounded-lg"></div>
                    )}
                    <span className="relative z-10">{val}</span>
                  </div>

                  {/* Bottom Pointers */}
                  {index === Low && (
                    <div className="absolute -bottom-14 flex flex-col items-center">
                      <ChevronUp size={24} className="text-blue-500" />
                      <div className="h-8 w-px bg-gradient-to-t from-blue-500 to-transparent"></div>
                      <span className="text-blue-400 text-sm font-medium mt-1">Low</span>
                    </div>
                  )}
                  {index === High && (
                    <div className="absolute -bottom-14 flex flex-col items-center">
                      <ChevronUp size={24} className="text-red-500" />
                      <div className="h-8 w-px bg-gradient-to-t from-red-500 to-transparent"></div>
                      <span className="text-red-400 text-sm font-medium mt-1">High</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result/Status Area */}
        {arr.length > 0 && found && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 flex items-center gap-2">
            <FaSearch className="text-green-400" />
            <span>Element <strong>{arr[Mid]}</strong> found at index <strong>{Mid}</strong></span>
          </div>
        )}
        
        {arr.length > 0 && !found && Mid !== null && !isSearching && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 flex items-center gap-2">
            <FaSearch className="text-red-400" />
            <span>Element <strong>{searchValue}</strong> not found in the array</span>
          </div>
        )}
      </div>

      {/* Custom styled toast container */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 500,
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

export default BSAlgo;