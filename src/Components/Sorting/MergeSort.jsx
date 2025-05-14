import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownCircle, Moon, Sun, Shuffle, Info, X, Sparkles, ArrowUpCircle, PlayCircle,RefreshCw, Pause } from 'lucide-react';

// Enhanced theme constants with stunning dark UI options
const THEMES = {
  midnight: {
    background: 'bg-gradient-to-br from-gray-950 via-gray-900 to-black',
    card: 'bg-gray-900/70 backdrop-blur-md border-gray-800/50',
    input: 'bg-gray-800 border-gray-700/50 focus:ring-gray-600',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    primary: 'bg-gray-700 hover:bg-gray-600',
    secondary: 'bg-gray-800 hover:bg-gray-700',
    success: 'bg-green-800 hover:bg-green-700',
    highlight: 'bg-gradient-to-r from-gray-700 to-gray-800',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-white',
    mainArray: 'from-gray-800 to-gray-700',
    leftArray: 'bg-gray-700',
    rightArray: 'bg-gray-600',
    mergedArray: 'bg-gray-700',
    lowIndex: 'text-blue-400',
    midIndex: 'text-green-400',
    highIndex: 'text-red-700',
    currentIndex: 'text-yellow-400',
    glow: 'shadow-lg shadow-black/40'
  },
  abyss: {
    background: 'bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950',
    card: 'bg-slate-900/70 backdrop-blur-md border-slate-800/30',
    input: 'bg-slate-800 border-slate-700/50 focus:ring-slate-600',
    text: 'text-slate-200',
    textSecondary: 'text-slate-400',
    primary: 'bg-slate-700 hover:bg-slate-600',
    secondary: 'bg-slate-800 hover:bg-slate-700',
    success: 'bg-teal-800 hover:bg-teal-700',
    highlight: 'bg-gradient-to-r from-slate-700 to-slate-800',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-300 to-white',
    mainArray: 'from-slate-800 to-slate-700',
    leftArray: 'bg-slate-700',
    rightArray: 'bg-slate-600',
    mergedArray: 'bg-slate-700',
    lowIndex: 'text-blue-400',
    midIndex: 'text-teal-400',
    highIndex: 'text-red-500',
    currentIndex: 'text-yellow-400',
    glow: 'shadow-lg shadow-black/30'
  },
  // New stunning dark theme - Nebula
  nebula: {
    background: 'bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950',
    card: 'bg-indigo-950/70 backdrop-blur-md border-indigo-800/30',
    input: 'bg-indigo-900/80 border-indigo-700/50 focus:ring-violet-600',
    text: 'text-indigo-100',
    textSecondary: 'text-indigo-300',
    primary: 'bg-violet-800 hover:bg-violet-700',
    secondary: 'bg-indigo-800 hover:bg-indigo-700',
    success: 'bg-fuchsia-800 hover:bg-fuchsia-700',
    highlight: 'bg-gradient-to-r from-indigo-800 to-violet-900',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-200 to-indigo-100',
    mainArray: 'from-indigo-800 to-violet-900',
    leftArray: 'bg-gradient-to-r from-indigo-800 to-indigo-700',
    rightArray: 'bg-gradient-to-r from-violet-800 to-violet-700',
    mergedArray: 'bg-gradient-to-r from-fuchsia-800 to-purple-800',
    lowIndex: 'text-cyan-400',
    midIndex: 'text-fuchsia-400',
    highIndex: 'text-red-400',
    currentIndex: 'text-green-300',
    glow: 'shadow-lg shadow-violet-950/70'
  },
  // New stunning dark theme - Cyber
  cyber: {
    background: 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950',
    card: 'bg-gray-900/80 backdrop-blur-md border border-cyan-500/20',
    input: 'bg-gray-800/90 border-cyan-700/30 focus:ring-cyan-600/50',
    text: 'text-cyan-50',
    textSecondary: 'text-cyan-300/70',
    primary: 'bg-cyan-900 hover:bg-cyan-800 border border-cyan-700/30',
    secondary: 'bg-gray-800 hover:bg-gray-700 border border-cyan-800/20',
    success: 'bg-green-900 hover:bg-green-800 border border-green-700/30',
    highlight: 'bg-gradient-to-r from-gray-800 to-cyan-900',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-blue-300',
    mainArray: 'from-cyan-900 to-blue-900',
    leftArray: 'bg-gradient-to-r from-cyan-900 to-cyan-800',
    rightArray: 'bg-gradient-to-r from-blue-900 to-blue-800',
    mergedArray: 'bg-gradient-to-r from-cyan-800 to-blue-800',
    lowIndex: 'text-cyan-400',
    midIndex: 'text-blue-400',
    highIndex: 'text-red-600',
    currentIndex: 'text-green-400',
    glow: 'shadow-lg shadow-cyan-900/30'
  }
};

const MergeSort = () => {
  // Theme state
  const [currentTheme, setCurrentTheme] = useState('cyber'); // Default to new nebula theme
  const theme = THEMES[currentTheme];
  
  // Component state
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [low, setLow] = useState(0);
  const [mid, setMid] = useState(0);
  const [high, setHigh] = useState(0);
  const [currIndex, setCurrIndex] = useState(-1);
  const [leftArr, setLeftArr] = useState([]);
  const [rightArr, setRightArr] = useState([]);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [temp, setTemp] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const isPaused = useRef(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

  // Animation constants
  const PARTITION_DELAY = 1500;
  const COMPARISON_DELAY = 800;
  const MERGE_DELAY = 600;

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mergeSort-theme');
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Set theme
  const setTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('mergeSort-theme', theme);
    setThemeMenuOpen(false);
  };

  // Custom toast notification system
  const toast = {
    success: (message) => {
      setNotification({ type: 'success', message });
      setTimeout(() => setNotification(null), 3000);
    },
    error: (message) => {
      setNotification({ type: 'error', message });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSizeChange = (e) => {
    setArrSize(e.target.value);
    
    // Optional: Auto-generate random array when size changes
    const size = parseInt(e.target.value, 10);
    if (!isNaN(size) && size > 0 && size <= 20) {
      const randomElements = Array.from(
        { length: size }, 
        () => Math.floor(Math.random() * 99) + 1
      );
      setInputValue(randomElements.join(' '));
    }
  };

  const handleSubmit = () => {
    const size = parseInt(arrSize, 10);
    if (isNaN(size) || size <= 0) {
      toast.error('Please enter a valid array size');
      return;
    }

    if (size > 20) {
      toast.error('For visualization purposes, please use a size of 20 or less');
      return;
    }

    if (inputValue.trim() === '') {
      // If no input is provided, generate random array
      generateRandomArray();
      return;
    }

    const elements = inputValue.trim().split(/\s+/).map(num => parseInt(num, 10));
    
    if (elements.length !== size) {
      toast.error(`Please enter exactly ${size} elements`);
      return;
    }

    if (elements.some(isNaN)) {
      toast.error('All elements must be valid numbers');
      return;
    }

    setArr([...elements]);
    setHigh(elements.length - 1);
    setLeftArr([]);
    setRightArr([]);
    setTemp([]);
    toast.success('Array submitted successfully!');
  };

  const generateRandomArray = () => {
    const size = parseInt(arrSize, 10);
    if (isNaN(size) || size <= 0) {
      toast.error('Please enter a valid array size');
      return;
    }
    
    if (size > 20) {
      toast.error('For visualization purposes, please use a size of 20 or less');
      return;
    }
    
    // Generate random numbers between 1-99
    const randomElements = Array.from(
      { length: size }, 
      () => Math.floor(Math.random() * 99) + 1
    );
    
    // Update input field with generated values
    setInputValue(randomElements.join(' '));
    setArr(randomElements);
    setHigh(randomElements.length - 1);
    setLeftArr([]);
    setRightArr([]);
    setTemp([]);
    toast.success('Random array generated successfully!');
  };


  
const checkPaused = async () => {

  while (isPaused.current) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
  }
};

  

  const merge = async (arr, low, mid, high) => {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);

    await checkPaused();

    setLeftArr(left);
    setRightArr(right);
    setTemp([]);

    await delay(PARTITION_DELAY);

    let i = 0;
    let j = 0;
    let k = low;

    while (i < left.length && j < right.length) {
      setLeftIndex(i);
      setRightIndex(j);
      setCurrIndex(k);
      await delay(COMPARISON_DELAY);

      if (parseInt(left[i]) <= parseInt(right[j])) {

        await checkPaused();
        
        arr[k] = left[i];
        setTemp((prev) => [...prev, left[i]]);
        await delay(MERGE_DELAY);
        i++;
      } else {
        arr[k] = right[j];
      
        setTemp((prev) => [...prev, right[j]]);
        await delay(MERGE_DELAY);
        j++;
      }

      k++;
      setArr([...arr]);
      await delay(MERGE_DELAY);
    }

    while (i < left.length) {
      await checkPaused();
      setLeftIndex(i);
      setCurrIndex(k);
      await delay(COMPARISON_DELAY);
      arr[k++] = left[i];
      setArr([...arr]);
      setTemp((prev) => [...prev, left[i]]);
      await delay(MERGE_DELAY);
      i++;
    }

    while (j < right.length) {

      await checkPaused();
      setRightIndex(j);
      setCurrIndex(k);
      await delay(COMPARISON_DELAY);
      arr[k++] = right[j];
      setArr([...arr]);
      setTemp((prev) => [...prev, right[j]]);
      await delay(MERGE_DELAY);
      j++;
    }

    setLeftIndex(-1);
    setRightIndex(-1);
    setCurrIndex(-1);
    await delay(PARTITION_DELAY);
  };

  const mergeSort = async (arr, low, high) => {
    if (low < high) {
      await checkPaused();
      setLow(low);
      setHigh(high);
      const mid = Math.floor((low + high) / 2);
      setMid(mid);
      await delay(PARTITION_DELAY);

      await mergeSort(arr, low, mid);
      await mergeSort(arr, mid + 1, high);
      await merge(arr, low, mid, high);
    }
  };

  const handleMergeSort = async () => {
    if (!arr.length) {
      toast.error('Please submit the array first!');
      return;
    }
    if (isSorting) {
      toast.error('Sorting is already in progress!');
      return;
    }

    setIsSorting(true);
    try {
      await mergeSort([...arr], 0, arr.length - 1);
      toast.success('Sorting completed!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during sorting');
    }
    setIsSorting(false);
    setLeftArr([]);
    setRightArr([]);
  };

  // Generate quick preset array sizes
  const quickSizePresets = [5, 8, 10, 15, 20];

  const Close = () => {

    setWindowWidth(1000);

  }

  return (
    <div className={`flex z-10 flex-col bg-gray-950 min-h-screen items-center  gap-6 p-8 ${theme.text} font-mono transition-colors duration-500`}>
      
      {windowWidth < 500 ?
      <div className="max-w-sm absolute z-40 ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}

      {/* Title with enhanced styling */}
      
        <div className="relative  mb-8 w-[400px] lg:w-[490px] mt-10">
          <h1 className="text-3xl ml-12  sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-green-600">
            Merge Sort Algorithm
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
          <p className={`${theme.textSecondary} text-center mt-10 max-w-lg opacity-80`}>
            A visual representation of the divide-and-conquer sorting algorithm
          </p>
        </div>
      

      {/* Input Section with enhanced styling */}
      <div className={`flex flex-col backdrop-blur-sm bg-gray-900/50 border border-gray-800 flex-wrap gap-4 w-full max-w-lg lg:max-w-xl p-6 rounded-xl  shadow-xl transition-colors duration-300 mt-4`}>
        {/* Array size input with quick presets */}
        <div className="flex flex-wrap flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              className={`w-full p-3 rounded-lg ${theme.input} border focus:outline-none focus:ring-2 transition-colors duration-300`}
              placeholder="Enter array size (max 20)"
              value={arrSize}
              onChange={handleSizeChange}
              min="1"
              max="20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={`text-sm ${theme.textSecondary}`}>Quick size:</span>
            {quickSizePresets.map(size => (
              <button
                key={size}
                onClick={() => {
                  setArrSize(size.toString());
                  // Auto-generate when preset is selected
                  const randomElements = Array.from(
                    { length: size }, 
                    () => Math.floor(Math.random() * 99) + 1
                  );
                  setInputValue(randomElements.join(' '));
                }}
                className={`px-2 py-1 text-xs rounded ${
                  parseInt(arrSize) === size ? theme.primary : theme.secondary
                } transition-colors`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
        
          <input
            type="text"
            className={`w-full p-3 rounded-lg ${theme.input} border focus:outline-none focus:ring-2 transition-colors duration-300`}
            placeholder="Enter elements separated by space or leave empty for random"
            value={inputValue}
            onChange={handleInput}
          />

        </div>
        <div className="flex flex-wrap items-center gap-4 justify-center">
        <button
            onClick={generateRandomArray}
            disabled={isSorting || !arrSize}
            className={` flex items-center px-6 py-3 gap-2 rounded-md ${theme.secondary} transition opacity-80 hover:opacity-100 disabled:opacity-50`}
            title="Generate random array"
          >
            <Shuffle className="h-4 w-6 " />
            Random
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSorting || !arrSize}
            className={`px-6 py-3 ${theme.primary} flex items-center gap-2 rounded-lg transition ${theme.glow} disabled:opacity-50 font-semibold`}
          >
            <RefreshCw size={16} />
            Submit Array
          </button>

        

          <button
              onClick={handleMergeSort}
              disabled={isSorting || arr.length === 0}
              className="px-4 py-2 rounded-lg  bg-gradient-to-r from-teal-600 to-teal-800 hover:from-sky-700 hover:to-indigo-700 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20 transition-all disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isSorting ? "Sorting..." : "Start Sorting"}
            </button>
        </div>
      </div>

      {/* Status indicator */}
  

        <div className="flex justify-between gap-6 items-center mb-4">
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
      {/* Main Array with enhanced styling */}
      <div className="flex flex-wrap mt-14 gap-4 justify-center">
        {arr.map((val, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {index === mid && (
              <div className={`absolute mb-16 -top-14 ${theme.midIndex} flex flex-col items-center`}>
                <span>Mid</span>
                <ArrowDownCircle className="h-4 w-4" />
              </div>
            )}
            {index === low && (
              <div className={`absolute ${theme.lowIndex} mb-5 flex flex-col items-center`}>
                <span>Low</span>
                <ArrowDownCircle className="h-4 w-4" />
              </div>
            )}

            <div
              className={`w-14 h-14 mt-14 flex items-center justify-center rounded-lg text-lg font-bold 
              ${
                index >= low && index <= high
                  ? ` border-cyan-800 border-2  text-white ${theme.glow}`
                  : index === currIndex ? 'bg-gray-950 border-2 border-cyan-500':'bg-gray-900 text-white'
              } transition-all duration-300 transform hover:scale-105`}
            >
              {val}
            </div>
            {index === high && (
              <div className={`absolute -bottom-12 ${theme.highIndex} flex flex-col items-center`}>
                <ArrowUpCircle className="h-4 w-4" />
                <span>High</span>
              </div>
            )}

            {index === currIndex && (
              <div className={`absolute -bottom-24 text-cyan-600 flex flex-col items-center`}>
                <ArrowUpCircle className="h-4 w-4" />
                <span>curr</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left and Right Subarrays with enhanced styling */}
      {(leftArr.length > 0 || rightArr.length > 0) && (
        <div className="flex flex-col gap-8 mt-20">
          <div className="flex flex-col items-center">
            <h3 className={`text-xl mb-4 text-blue-300 ${theme.glow}`}>Left Subarray</h3>
            <div className="flex gap-4 mt-10 flex-wrap justify-center">
              {leftArr.map((val, index) => (
                <div key={index} className="relative">
                  {index === leftIndex && (
                    <div className={`absolute mt-5 -top-14 ${theme.currentIndex} flex flex-col items-center`}>
                      <span>left</span>
                      <ArrowDownCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`w-14 h-14 flex mt-5 items-center justify-center rounded-lg bg-gray-900 shadow-md transition-all duration-300 transform ${index === leftIndex ? 'scale-110 ring-2 ring-white/30' : ''} ${theme.glow}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className={`text-xl mb-4 text-teal-300 ${theme.glow}`}>Right Subarray</h3>
            <div className="flex gap-4 mt-10 flex-wrap justify-center">
              {rightArr.map((val, index) => (
                <div key={index} className="relative">
                  {index === rightIndex && (
                    <div className={`absolute mt-5 -top-14 ${theme.currentIndex} flex flex-col items-center`}>
                      <span>right</span>
                      <ArrowDownCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`w-14 h-14 mt-5 flex items-center justify-center rounded-lg bg-gray-900 shadow-md transition-all duration-300 transform ${index === rightIndex ? 'scale-110 ring-2 ring-white/30' : ''} ${theme.glow}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Merged Array with enhanced styling */}
      {temp.length > 0 && (
        <div className="flex flex-col gap-5 mt-16">
          <h3 className={`text-xl mb-4 w-40 text-amber-300 ${theme.glow}`}>Merged Array</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {temp.map((val, index) => (
              <div
                key={index}
                className={`w-14 h-14 flex text-lg font-bold items-center justify-center rounded-lg bg-gray-900 shadow-inner transition-all duration-300 ${theme.glow} animate-pulse`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom toast notification */}
      {notification && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white font-medium flex items-center gap-2 ${theme.glow} animate-fadeIn z-50`}>
          {notification.message}
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${theme.card} rounded-xl max-w-lg w-full p-6 ${theme.glow}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${theme.heading}`}>Merge Sort Algorithm</h3>
              <button 
                onClick={() => setShowInfoModal(false)}




                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <p>Merge Sort is a divide-and-conquer algorithm that works by:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Dividing the array into two halves</li>
                <li>Recursively sorting each half</li>
                <li>Merging the sorted halves back together</li>
              </ol>
              <p>This visualization shows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The recursive division process with <span className={theme.lowIndex}>Low</span>, <span className={theme.midIndex}>Mid</span>, and <span className={theme.highIndex}>High</span> pointers</li>
                <li>The comparison of elements in left and right subarrays</li>
                <li>The merging process that builds up the sorted result</li>
              </ul>
              <p>Time Complexity: O(n log n)</p>
              <p>Space Complexity: O(n)</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowInfoModal(false)}
                className={`px-4 py-2 ${theme.primary} rounded-lg`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-28" />
    </div>
  );
};

export default MergeSort;