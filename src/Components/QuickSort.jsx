// // import React, { useState } from 'react';
// // import toast, { Toaster } from 'react-hot-toast';
// // import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

// // const QuickSort = () => {
// //   const [arr, setArr] = useState([]);
// //   const [inputValue, setInputValue] = useState('');
// //   const [lowIndex, setLowIndex] = useState(-1);
// //   const [highIndex, setHighIndex] = useState(-1);
// //   const [pivotIndex, setPivotIndex] = useState(-1);
// //   const [correctlyPlacedPivotIndex, setCorrectlyPlacedPivotIndex] = useState([]);

// //   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// //   const handleInput = (e) => setInputValue(e.target.value);

// //   const handleSubmit = () => {
// //     const elements = inputValue.trim().split(/\s+/).map(Number);
// //     if (elements.some(isNaN)) {
// //       toast.error('Please enter valid integers separated by space.');
// //       return;
// //     }
// //     setArr(elements);
// //     setLowIndex(-1);
// //     setHighIndex(-1);
// //     setPivotIndex(-1);
// //     toast.success('Array submitted!');
// //   };

// //   const partition = async (arr, low, high) => {
// //     let pivot = arr[low];
// //     let i = low + 1;
// //     let j = high;
  
// //     setLowIndex(low);
// //     setHighIndex(high);
// //     setPivotIndex(low);
// //     await delay(800);
  
// //     while (i <= j) {
// //       // Move i right until we find a number > pivot
// //       while (i <= high && arr[i] <= pivot) {
// //         setLowIndex(i);
// //         await delay(800);
// //         i++;
// //       }
  
// //       // Move j left until we find a number <= pivot
// //       while (j > low && arr[j] > pivot) {
// //         setHighIndex(j);
// //         await delay(800);
// //         j--;
// //       }
  
// //       if (i < j) {
// //         [arr[i], arr[j]] = [arr[j], arr[i]];
// //         setArr([...arr]);
// //         await delay(800);
// //       }
// //     }
  
// //     // Place pivot in the correct position
// //     [arr[low], arr[j]] = [arr[j], arr[low]];
// //     setArr([...arr]);
// //     await delay(800);
  
// //     setPivotIndex(j);

// //     setCorrectlyPlacedPivotIndex((prev) => [...prev, arr[j]]);
// //     await delay(800);
// //     return j;
// //   };
  

// //   const quickSort = async (array, low, high) => {

// //     if (low <= high) {
// //       const pi = await partition(array, low, high);
// //       await quickSort(array, low, pi - 1);
// //       await quickSort(array, pi + 1, high);
// //     }
// //   };

// //   const handleQuickSort = async () => {
// //     if (!arr.length) {
// //       toast.error('Please submit a valid array first!');
// //       return;
// //     }

// //     const copy = [...arr];
// //     await quickSort(copy, 0, copy.length - 1);
// //     setLowIndex(-1);
// //     setHighIndex(-1);
// //     setPivotIndex(-1);
// //     toast.success('Quick Sort Completed!');
// //   };

// //   return (
// //     <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen items-center text-white p-6">
// //   <h1 className="text-3xl font-bold mb-4">Quick Sort (Integers)</h1>

// //   {/* Input Section */}
// //   <input
// //     type="text"
// //     className="w-80 p-2 border rounded bg-gray-900 text-white"
// //     placeholder="Enter the array"
// //     value={inputValue}
// //     onChange={handleInput}
// //   />

// //   <div className="flex gap-4 mt-4">
// //     <button
// //       onClick={handleSubmit}
// //       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //     >
// //       Submit Array
// //     </button>
// //     <button
// //       onClick={handleQuickSort}
// //       className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
// //     >
// //       Start Sorting
// //     </button>
// //   </div>

// //   {/* Array Visualization */}
// //   <div className="flex flex-wrap gap-6 mt-12">
// //     {arr.map((val, index) => (
// //       <div key={index} className="flex flex-col items-center gap-2">
// //         {/* Pivot Indicator */}
// //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
// //           {index === pivotIndex && (
// //             <div className="absolute ml-12 gap-3">
// //               <FaArrowDown size={20} color="green" />
// //               <span className="text-white">pivotIndex</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Left Index Indicator */}
// //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
// //           {index === lowIndex && (
// //             <div className="absolute ml-12 gap-3">
// //               <span className="text-white">LeftIndex</span>
// //               <FaArrowDown size={20} color="red" />
// //             </div>
// //           )}
// //         </div>

// //         {/* Array Element Box */}
// //         <div
// //           className={`rounded mt-5 shadow bg-gray-200 w-12 h-12 text-black flex items-center justify-center text-lg font-semibold ${
// //             correctlyPlacedPivotIndex.includes(val) ? "bg-green-600 text-white" : ""
// //           }`}
// //         >
// //           {val}
// //         </div>

// //         {/* Right Index Indicator */}
// //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
// //           {index === highIndex && (
// //             <div className="absolute ml-12 gap-3">
// //               <FaArrowUp size={20} color="blue" />
// //               <span className="text-white">RightIndex</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     ))}
// //   </div>

// //   {/* Toaster for notifications */}
// //   <Toaster />
// // </div>

// //   );
// // };

// // export default QuickSort;

// import React, { useState } from 'react';
// import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';

// const QuickSort = () => {
//   const [arr, setArr] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [lowIndex, setLowIndex] = useState(-1);
//   const [highIndex, setHighIndex] = useState(-1);
//   const [pivotIndex, setPivotIndex] = useState(-1);
//   const [correctlyPlacedPivotIndex, setCorrectlyPlacedPivotIndex] = useState([]);
//   const [isSorting, setIsSorting] = useState(false);
//   const [speed, setSpeed] = useState(800);

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   const handleInput = (e) => setInputValue(e.target.value);

//   const handleSubmit = () => {
//     const elements = inputValue.trim().split(/\s+/).map(Number);
//     if (elements.some(isNaN)) {
//       showToast('Please enter valid integers separated by space.', 'error');
//       return;
//     }
//     setArr(elements);
//     resetIndices();
//     showToast('Array submitted!', 'success');
//   };

//   const resetIndices = () => {
//     setLowIndex(-1);
//     setHighIndex(-1);
//     setPivotIndex(-1);
//     setCorrectlyPlacedPivotIndex([]);
//   };

//   const generateRandomArray = () => {
//     const size = Math.floor(Math.random() * 6) + 5; // 5-10 elements
//     const randomArr = Array.from({ length: size }, () => 
//       Math.floor(Math.random() * 100)
//     );
    
//     setArr(randomArr);
//     setInputValue(randomArr.join(' '));
//     resetIndices();
//     showToast('Random array generated!', 'success');
//   };

//   const partition = async (arr, low, high) => {
//     let pivot = arr[low];
//     let i = low + 1;
//     let j = high;
  
//     setLowIndex(low);
//     setHighIndex(high);
//     setPivotIndex(low);
//     await delay(speed);
  
//     while (i <= j) {
//       // Move i right until we find a number > pivot
//       while (i <= high && arr[i] <= pivot) {
//         setLowIndex(i);
//         await delay(speed);
//         i++;
//       }
  
//       // Move j left until we find a number <= pivot
//       while (j > low && arr[j] > pivot) {
//         setHighIndex(j);
//         await delay(speed);
//         j--;
//       }
  
//       if (i < j) {
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//         setArr([...arr]);
//         await delay(speed);
//       }
//     }
  
//     // Place pivot in the correct position
//     [arr[low], arr[j]] = [arr[j], arr[low]];
//     setArr([...arr]);
//     await delay(speed);
  
//     setPivotIndex(j);
//     setCorrectlyPlacedPivotIndex((prev) => [...prev, arr[j]]);
//     await delay(speed);
//     return j;
//   };
  
//   const quickSort = async (array, low, high) => {
//     if (low <= high) {
//       const pi = await partition(array, low, high);
//       await quickSort(array, low, pi - 1);
//       await quickSort(array, pi + 1, high);
//     }
//   };

//   const handleQuickSort = async () => {
//     if (!arr.length) {
//       showToast('Please submit a valid array first!', 'error');
//       return;
//     }

//     setIsSorting(true);
//     const copy = [...arr];
//     resetIndices();
//     setCorrectlyPlacedPivotIndex([]);
    
//     try {
//       await quickSort(copy, 0, copy.length - 1);
//       resetIndices();
//       showToast('Quick Sort Completed!', 'success');
//     } catch (error) {
//       showToast('Error during sorting', 'error');
//     } finally {
//       setIsSorting(false);
//     }
//   };
  
//   const showToast = (message, type) => {
//     // We'll use a simple visual indicator instead of toast
//     console.log(`${type}: ${message}`);
//   };

//   // Calculate dynamic sizes for array elements based on array length
//   const getElementSize = () => {
//     if (arr.length <= 6) return 'w-16 h-16';
//     if (arr.length <= 8) return 'w-14 h-14';
//     if (arr.length <= 10) return 'w-12 h-12';
//     return 'w-10 h-10';
//   };

//   return (
//     <div className="flex flex-col gap-5 bg-gray-900 text-gray-100 min-h-screen items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       <div className="w-full max-w-4xl">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             Quick Sort Visualizer
//           </h1>
//           <p className="text-gray-400">Watch the algorithm sort in real-time</p>
//         </div>

//         {/* Controls Section */}
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8 bg-gray-800 p-6 rounded-xl shadow-lg">
//           <div className="flex-1 w-full">
//             <input
//               type="text"
//               className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               placeholder="Enter numbers separated by spaces"
//               value={inputValue}
//               onChange={handleInput}
//               disabled={isSorting}
//             />
//           </div>
          
//           <div className="flex gap-3">
//             <button
//               onClick={handleSubmit}
//               disabled={isSorting}
//               className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-purple-500/30 disabled:opacity-50"
//             >
//               Submit
//             </button>
            
//             <button
//               onClick={generateRandomArray}
//               disabled={isSorting}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/30 disabled:opacity-50 flex items-center gap-2"
//             >
//               <RefreshCw size={16} />
//               Random
//             </button>
            
//             <button
//               onClick={handleQuickSort}
//               disabled={isSorting || arr.length === 0}
//               className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all shadow-md hover:shadow-pink-500/30 disabled:opacity-50"
//             >
//               {isSorting ? 'Sorting...' : 'Sort'}
//             </button>
//           </div>
//         </div>

//         {/* Speed Control */}
//         <div className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
//           <label className="flex flex-col gap-2">
//             <div className="flex justify-between">
//               <span>Animation Speed</span>
//               <span>{speed}ms</span>
//             </div>
//             <input
//               type="range"
//               min="100"
//               max="1500"
//               step="100"
//               value={speed}
//               onChange={(e) => setSpeed(Number(e.target.value))}
//               className="w-full"
//               disabled={isSorting}
//             />
//           </label>
//         </div>

//         {/* Legend */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-purple-600 rounded"></div>
//             <span className="text-sm">Pivot</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-red-500 rounded"></div>
//             <span className="text-sm">Left Index</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-blue-500 rounded"></div>
//             <span className="text-sm">Right Index</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-green-500 rounded"></div>
//             <span className="text-sm">Sorted Element</span>
//           </div>
//         </div>

//         {/* Array Visualization */}
//         <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-800/50 rounded-xl min-h-48 backdrop-blur-sm shadow-xl">
//           {arr.length === 0 ? (
//             <div className="text-gray-400 italic">No array to visualize. Generate or submit an array to begin.</div>
//           ) : (
//             arr.map((val, index) => (
//               <div key={index} className="flex flex-col items-center relative">
//                 {/* Indicators */}
//                 <div className="h-10 relative w-full">
//                   {index === pivotIndex && (
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
//                       <ArrowDown className="text-purple-500" />
//                     </div>
//                   )}
//                   {index === lowIndex && (
//                     <div className="absolute bottom-0 left-0">
//                       <ArrowDown className="text-red-500" />
//                     </div>
//                   )}
//                 </div>

//                 {/* Array Element Box */}
//                 <div
//                   className={`rounded-lg shadow-lg ${getElementSize()} flex items-center justify-center text-lg font-bold transition-all duration-300 ${
//                     index === pivotIndex ? 'bg-purple-600 text-white' :
//                     correctlyPlacedPivotIndex.includes(val) ? 'bg-green-600 text-white' :
//                     'bg-gray-700 text-white'
//                   }`}
//                 >
//                   {val}
//                 </div>

//                 {/* Bottom indicators */}
//                 <div className="h-10 relative w-full">
//                   {index === highIndex && (
//                     <div className="absolute top-0 right-0">
//                       <ArrowUp className="text-blue-500" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickSort;


import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, RefreshCw, Play, Pause, SkipBack } from 'lucide-react';

const QuickSort = () => {
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [lowIndex, setLowIndex] = useState(-1);
  const [highIndex, setHighIndex] = useState(-1);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [correctlyPlacedPivotIndex, setCorrectlyPlacedPivotIndex] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [statusMessage, setStatusMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
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
    const maxSize = windowWidth < 640 ? 6 : windowWidth < 1024 ? 8 : 12;
    const size = Math.floor(Math.random() * (maxSize - 4)) + 5; // 5 to maxSize elements
    
    const randomArr = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100)
    );
    
    setArr(randomArr);
    setInputValue(randomArr.join(' '));
    resetIndices();
    showToast('Random array generated!', 'success');
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;
  
    setLowIndex(low);
    setHighIndex(high);
    setPivotIndex(low);
    setStatusMessage(`Pivot: ${pivot} | Starting partition with low=${low} and high=${high}`);
    await delay(speed);
  
    while (i <= j) {
      // Move i right until we find a number > pivot
      while (i <= high && arr[i] <= pivot) {
        setLowIndex(i);
        setStatusMessage(`Left pointer moving right: Finding element > ${pivot}`);
        await delay(speed);
        i++;
      }
  
      // Move j left until we find a number <= pivot
      while (j > low && arr[j] > pivot) {
        setHighIndex(j);
        setStatusMessage(`Right pointer moving left: Finding element <= ${pivot}`);
        await delay(speed);
        j--;
      }
  
      if (i < j) {
        setStatusMessage(`Swapping elements: ${arr[i]} and ${arr[j]}`);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArr([...arr]);
        await delay(speed);
      }
    }
  
    // Place pivot in the correct position
    setStatusMessage(`Placing pivot ${pivot} at its correct position`);
    [arr[low], arr[j]] = [arr[j], arr[low]];
    setArr([...arr]);
    await delay(speed);
  
    setPivotIndex(j);
    setCorrectlyPlacedPivotIndex((prev) => [...prev, j]);
    setStatusMessage(`Pivot ${arr[j]} is now at its correct position`);
    await delay(speed);
    return j;
  };
  
  const quickSort = async (array, low, high) => {
    if (low < high) {
      setStatusMessage(`Sorting subarray from index ${low} to ${high}`);
      await delay(speed/2);
      
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
      if (arr.length <= 4) return 'w-14 h-14 text-lg';
      if (arr.length <= 6) return 'w-12 h-12 text-md';
      return 'w-10 h-10 text-sm';
    }
    // For tablet
    else if (windowWidth < 1024) {
      if (arr.length <= 6) return 'w-16 h-16 text-lg';
      if (arr.length <= 8) return 'w-14 h-14 text-md';
      return 'w-12 h-12 text-sm';
    }
    // For desktop
    else {
      if (arr.length <= 8) return 'w-16 h-16 text-xl';
      if (arr.length <= 10) return 'w-14 h-14 text-lg';
      if (arr.length <= 12) return 'w-12 h-12 text-md';
      return 'w-10 h-10 text-sm';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Header */}
      <header className="w-full py-6 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">
            QuickSort Visualizer
          </h1>
          <p className="text-center text-gray-400 mt-2">Visualize the QuickSort algorithm step by step</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Controls Section */}
        <div className="mb-8 bg-gray-800/80 p-4 md:p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter numbers separated by spaces"
                value={inputValue}
                onChange={handleInput}
                disabled={isSorting}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSorting}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
              
              <button
                onClick={generateRandomArray}
                disabled={isSorting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Random
              </button>
              
              <button
                onClick={reset}
                disabled={isSorting || arr.length === 0}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <SkipBack size={16} />
                Reset
              </button>
              
              <button
                onClick={handleQuickSort}
                disabled={isSorting || arr.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSorting ? <Pause size={16} /> : <Play size={16} />}
                {isSorting ? 'Sorting...' : 'Start Sort'}
              </button>
            </div>
          </div>
        </div>

        {/* Speed Control and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
            <label className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Animation Speed</span>
                <span>{speed}ms</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-purple-500"
                disabled={isSorting}
              />
            </label>
          </div>
          
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <span className="text-gray-400">Status:</span>
              <p className="text-purple-300 font-medium">{statusMessage || 'Ready to sort'}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 bg-gray-800/50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <span className="text-sm">Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm">Left Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Right Pointer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm">Sorted Element</span>
          </div>
        </div>

        {/* Array Visualization */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 p-6 bg-gray-800/30 rounded-xl min-h-48 backdrop-blur-sm shadow-xl border border-gray-700/50">
          {arr.length === 0 ? (
            <div className="text-gray-400 italic flex items-center justify-center min-h-32">
              No array to visualize. Generate or submit an array to begin.
            </div>
          ) : (
            arr.map((val, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {/* Indicators */}
                <div className="h-8 relative w-full flex justify-center">
                  {index === pivotIndex && (
                    <div className="absolute bottom-0 flex flex-col items-center">
                      <ArrowDown className="text-purple-500" />
                      <span className="text-xs text-purple-500 font-medium">Pivot</span>
                    </div>
                  )}
                  {index === lowIndex && (
                    <div className="absolute bottom-0 left-0 flex flex-col items-center">
                      <ArrowDown className="text-red-500" />
                      <span className="text-xs text-red-500 font-medium">Left</span>
                    </div>
                  )}
                </div>

                {/* Array Element Box */}
                <div
                  className={`rounded-lg shadow-lg ${getElementSize()} flex items-center justify-center font-bold transition-all duration-300 ${
                    index === pivotIndex ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white ring-2 ring-purple-400' :
                    correctlyPlacedPivotIndex.includes(index) ? 'bg-gradient-to-br from-green-600 to-green-800 text-white' :
                    'bg-gradient-to-br from-gray-700 to-gray-900 text-white'
                  }`}
                >
                  {val}
                </div>

                {/* Bottom indicators */}
                <div className="h-8 relative w-full flex justify-center">
                  {index === highIndex && (
                    <div className="absolute top-0 right-0 flex flex-col items-center">
                      <ArrowUp className="text-blue-500" />
                      <span className="text-xs text-blue-500 font-medium">Right</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-black/40 backdrop-blur-sm mt-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>QuickSort Visualizer | Interactive Algorithm Visualization</p>
        </div>
      </footer>
    </div>
  );
};

export default QuickSort;