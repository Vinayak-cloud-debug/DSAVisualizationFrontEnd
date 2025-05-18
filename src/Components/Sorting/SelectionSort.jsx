
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowDownCircle, Code, RefreshCw, PlayCircle,Loader2, Info, Target,Pause } from 'lucide-react';


const SelectionSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex, setSortedArrayIndex] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [compareIndex, setCompareIndex] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [particles, setParticles] = useState([]);
  const isPaused = useRef(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

  // Generate random particles for the background
  useEffect(() => {
    const particlesArray = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      color: `rgba(${Math.random() * 50 + 100}, ${Math.random() * 50 + 100}, ${Math.random() * 255}, ${Math.random() * 0.3 + 0.1})`
    }));
    setParticles(particlesArray);
  }, []);

  // Animation frame for particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 100
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleInput = () => setInputValue(e.target.value);

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
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setMinIndex(-1);
    toast.success("Random array generated!");
  };


  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};

  

  const handleSubmit = () => {


    window.scrollBy({
      top: 1200,
      behavior: 'smooth'

    })
    

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
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setMinIndex(-1);
    toast.success("Array initialized successfully!");
  };

  const handleSelectionSort = async () => {
    let newArr = [...arr];
    
    for (let i = 0; i < arrSize - 1; i++) {
      let minIndex = i;

      await checkPaused();
      
      setCurrentIndex(i);
      setMinIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 800));

      for (let j = i + 1; j < arrSize; j++) {
        await checkPaused();
        setCompareIndex(j);
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        if (newArr[j] < newArr[minIndex]) {
          await checkPaused();
          minIndex = j;
          setMinIndex(minIndex);
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      await checkPaused();
      setMinIndex(minIndex);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Swap the found minimum element with the first element
      if (minIndex !== i) {
        let temp = newArr[minIndex];
        newArr[minIndex] = newArr[i];
        newArr[i] = temp;

        await checkPaused();
        setArr([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      await checkPaused();
      // Mark as sorted
      setSortedArrayIndex(prev => [...prev, i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    

    await checkPaused();
    // Mark the last element as sorted too
    setSortedArrayIndex(prev => [...prev, arrSize - 1]);
    
    setArr([...newArr]);
  };

  const startSelectionSort = async () => {
    if (!arr.length) {
      toast.error("Please submit an array first!");
      return;
    }
    
    setIsSorting(true);
    setSortedArrayIndex([]);
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setMinIndex(-1);
    
    await handleSelectionSort();
    
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setMinIndex(-1);
    toast.success("Selection Sort Completed!");
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    
    setArr([]);
    setInputValue('');
    setSortedArrayIndex([]);
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setMinIndex(-1);
    toast.success("Reset successful!");
  };

  const Close = () => {

    setWindowWidth(1000);

  }

  return (
    <div className="relative z-10 flex flex-col bg-gray-950  min-h-screen w-full px-4 py-8 overflow-hidden">

      {windowWidth < 500 ?
      <div className="max-w-sm absolute z-40 ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}

      
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header with animated border */}
        <div className="relative mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">
            Selection Sort Algorithm
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-center mt-3 max-w-xl">
            Visualize how selection sort finds the minimum element in each pass
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
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
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
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
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
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-violet-700/20 transition-all disabled:opacity-50"
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
              onClick={startSelectionSort}
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
              <h3 className="text-lg font-medium text-violet-400 mb-3">About Selection Sort</h3>
              <div className="text-gray-300 text-sm whitespace-pre-line">
                Selection Sort works by repeatedly finding the minimum element from the unsorted part of the array
                and putting it at the beginning of the unsorted section.
                
                Time Complexity:
                • Best Case: O(n²)
                • Average Case: O(n²)
                • Worst Case: O(n²)
                
                Space Complexity: O(1) - only requires a constant amount of additional memory
                
                Selection Sort is simple but inefficient for large arrays. It makes the minimum
                number of swaps among basic sorting algorithms (at most n-1 swaps),
                which can be useful when memory write operations are costly.
              </div>
            </div>
          )}
          
          {/* Code Section */}
          {showCode && (
            <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full overflow-x-auto">
              <h3 className="text-lg font-medium text-violet-400 mb-3">Pseudo Code</h3>
              <pre className="text-gray-300 font-mono text-sm">
{`function selectionSort(arr):
    n = arr.length
    
    // Traverse through all array elements
    for i from 0 to n-1:
        // Find the minimum element in the unsorted array
        minIndex = i
        
        for j from i+1 to n:
            if arr[j] < arr[minIndex]:
                minIndex = j
                
        // Swap the found minimum element with the first element
        if minIndex != i:
            swap arr[minIndex] and arr[i]
            
    return arr`}
              </pre>
            </div>
          )}
        </div>

        {/* Visualization Section */}
        {arr.length > 0 && (
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-800 rounded-xl p-6 w-full max-w-4xl mt-4">
              <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-300 mb-6 mt-3 flex items-center">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isSorting ? "bg-purple-500 animate-pulse" : "bg-green-500"}`}></span>
                            Visualization {isSorting && <span className="text-purple-400 ml-2">(in progress...)</span>}
                          </h3>
            
                          <button
                        onClick={() => (isPaused.current = !isPaused.current)}
                        disabled={!isSorting}
                        className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isPaused.current ? <PlayCircle size={18} /> : <Pause size={18} />}
                        {isPaused.current ? "Resume" : "Pause"}
                      </button>

                    </div>

            
            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-gray-300 text-xs">Sorted Elements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300 text-xs">Current Index (i)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-300 text-xs">Minimum Element</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                <span className="text-gray-300 text-xs">Compare Index (j)</span>
              </div>

              
            </div>
            
            {/* Array visualization */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 pb-20 relative">
              {arr.map((val, index) => {
                const isSorted = sortedArrayIndex.includes(index);
                const isCurrentIndex = index === currentIndex;
                const isCompareIndex = index === compareIndex;
                const isMinIndex = index === minIndex;
                
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1 relative my-8"
                  >
                    {/* Index number */}
                    <div className="text-gray-500 text-xs mb-1">{index}</div>
                    
                    {/* Current Index Indicator */}
                    {isCurrentIndex && (
                      <div className="absolute -top-14 flex flex-col items-center">
                        <span className="text-blue-400 text-sm font-medium mb-1">i</span>
                        <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
                        <ArrowDownCircle size={20} className="text-blue-500" />
                      </div>
                    )}

                    {/* Min Index Indicator */}
                    {isMinIndex && !isCurrentIndex && (
                      <div className="absolute -top-14 flex flex-col items-center">
                        <span className="text-purple-400 text-sm font-medium mb-1">min</span>
                        <div className="h-8 w-px bg-gradient-to-b from-purple-500 to-transparent"></div>
                        <Target size={20} className="text-purple-500" />
                      </div>
                    )}
                    
                    {/* Compare Index Indicator */}
                    {isCompareIndex && (
                      <div className="absolute -top-14 flex flex-col items-center">
                        <span className="text-indigo-400 text-sm font-medium mb-1">j</span>
                        <div className="h-8 w-px bg-gradient-to-b from-indigo-500 to-transparent"></div>
                        <ArrowDownCircle size={20} className="text-indigo-500" />
                      </div>
                    )}

                    {/* Value Box with glass effect */}
                    <div
                      className={`relative rounded-lg backdrop-blur-sm shadow-lg w-14 h-14 text-xl font-medium flex items-center justify-center transition-all duration-300 overflow-hidden
                        ${isSorted
                            ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-300 shadow-emerald-500/30"
                            : isCurrentIndex
                                ? "bg-blue-500/30 border-2 border-blue-500 text-blue-300 shadow-blue-500/30"
                                : isMinIndex
                                    ? "bg-purple-500/30 border-2 border-purple-500 text-purple-300 shadow-purple-500/30"
                                    : isCompareIndex
                                        ? "bg-indigo-500/30 border-2 border-indigo-500 text-indigo-300 shadow-indigo-500/30"
                                        : "bg-gray-800/50 border border-gray-700 text-gray-300"
                        }`}
                    >
                      {/* Inner glow/pulse effect when comparing */}
                      {(isMinIndex || isCompareIndex) && !isSorted && (
                        <div className="absolute inset-0 bg-purple-500/10 animate-pulse rounded-lg"></div>
                      )}
                      <span className="relative z-10">{val}</span>
                    </div>
                    
                    {/* Connection line between current and min indices */}
                    {isCurrentIndex && minIndex !== currentIndex && (
                      <div 
                        className="absolute top-1/2 left-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0"
                        style={{
                          width: `calc(50px * ${Math.abs(minIndex - currentIndex)})`
                        }}
                      ></div>
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

export default SelectionSort;