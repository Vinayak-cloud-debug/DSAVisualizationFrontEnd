import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const QuickSort = () => {
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [lowIndex, setLowIndex] = useState(-1);
  const [highIndex, setHighIndex] = useState(-1);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [correctlyPlacedPivotIndex, setCorrectlyPlacedPivotIndex] = useState([]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.some(isNaN)) {
      toast.error('Please enter valid integers separated by space.');
      return;
    }
    setArr(elements);
    setLowIndex(-1);
    setHighIndex(-1);
    setPivotIndex(-1);
    toast.success('Array submitted!');
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;
  
    setLowIndex(low);
    setHighIndex(high);
    setPivotIndex(low);
    await delay(800);
  
    while (i <= j) {
      // Move i right until we find a number > pivot
      while (i <= high && arr[i] <= pivot) {
        setLowIndex(i);
        await delay(800);
        i++;
      }
  
      // Move j left until we find a number <= pivot
      while (j > low && arr[j] > pivot) {
        setHighIndex(j);
        await delay(800);
        j--;
      }
  
      if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArr([...arr]);
        await delay(800);
      }
    }
  
    // Place pivot in the correct position
    [arr[low], arr[j]] = [arr[j], arr[low]];
    setArr([...arr]);
    await delay(800);
  
    setPivotIndex(j);

    setCorrectlyPlacedPivotIndex((prev) => [...prev, arr[j]]);
    await delay(800);
    return j;
  };
  

  const quickSort = async (array, low, high) => {

    if (low <= high) {
      const pi = await partition(array, low, high);
      await quickSort(array, low, pi - 1);
      await quickSort(array, pi + 1, high);
    }
  };

  const handleQuickSort = async () => {
    if (!arr.length) {
      toast.error('Please submit a valid array first!');
      return;
    }

    const copy = [...arr];
    await quickSort(copy, 0, copy.length - 1);
    setLowIndex(-1);
    setHighIndex(-1);
    setPivotIndex(-1);
    toast.success('Quick Sort Completed!');
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen items-center text-white p-6">
  <h1 className="text-3xl font-bold mb-4">Quick Sort (Integers)</h1>

  {/* Input Section */}
  <input
    type="text"
    className="w-80 p-2 border rounded bg-gray-900 text-white"
    placeholder="Enter the array"
    value={inputValue}
    onChange={handleInput}
  />

  <div className="flex gap-4 mt-4">
    <button
      onClick={handleSubmit}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Submit Array
    </button>
    <button
      onClick={handleQuickSort}
      className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
    >
      Start Sorting
    </button>
  </div>

  {/* Array Visualization */}
  <div className="flex flex-wrap gap-6 mt-12">
    {arr.map((val, index) => (
      <div key={index} className="flex flex-col items-center gap-2">
        {/* Pivot Indicator */}
        <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
          {index === pivotIndex && (
            <div className="absolute ml-12 gap-3">
              <FaArrowDown size={20} color="green" />
              <span className="text-white">pivotIndex</span>
            </div>
          )}
        </div>

        {/* Left Index Indicator */}
        <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
          {index === lowIndex && (
            <div className="absolute ml-12 gap-3">
              <span className="text-white">LeftIndex</span>
              <FaArrowDown size={20} color="red" />
            </div>
          )}
        </div>

        {/* Array Element Box */}
        <div
          className={`rounded mt-5 shadow bg-gray-200 w-12 h-12 text-black flex items-center justify-center text-lg font-semibold ${
            correctlyPlacedPivotIndex.includes(val) ? "bg-green-600 text-white" : ""
          }`}
        >
          {val}
        </div>

        {/* Right Index Indicator */}
        <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
          {index === highIndex && (
            <div className="absolute ml-12 gap-3">
              <FaArrowUp size={20} color="blue" />
              <span className="text-white">RightIndex</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Toaster for notifications */}
  <Toaster />
</div>

    // <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen items-center  text-white p-6">
    //   <h1 className="text-3xl font-bold mb-4">Quick Sort (Integers)</h1>

    //   <input
    //     type="text"
    //     className="w-80 p-2 border rounded bg-gray-900 text-white"
    //     placeholder="Enter the array "
    //     value={inputValue}
    //     onChange={handleInput}
    //   />

    //   <div className="flex gap-4">
    //     <button
    //       onClick={handleSubmit}
    //       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    //     >
    //       Submit Array
    //     </button>
    //     <button
    //       onClick={handleQuickSort}
    //       className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
    //     >
    //       Start Sorting
    //     </button>
    //   </div>

    //   <div className="flex flex-wrap gap-6 mt-12 ">
    //     {arr.map((val, index) => (
    //       <div key={index} className="flex flex-col items-center gap-2">
    //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
    //           {index === pivotIndex && (
    //             <div className="absolute ml-12 gap-3">
    //               <FaArrowDown size={20} color="green" />
    //               <span className='text-white'>pivotIndex</span>
    //             </div>
    //           )}
    //         </div>

    //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
    //           {index === lowIndex && (
    //             <div className="absolute ml-12 gap-3">
    //               <span className='text-white'>LeftIndex</span>
    //               <FaArrowDown size={20} color="red" />
    //             </div>
    //           )}
    //         </div>
            
    //         <div className={`rounded mt-5 shadow bg-gray-200 w-12 h-12 text-black flex items-center justify-center text-lg font-semibold ${correctlyPlacedPivotIndex.includes(val) ? 'bg-green-600 text-white':''} `}>
    //           {val}
    //         </div>

    //         <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
    //           {index === highIndex && (
    //             <div className="absolute ml-12 gap-3">
    //               <FaArrowUp size={20} color="blue" />
    //               <span className='text-white'>RightIndex</span>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   <Toaster />
    // </div>
  );
};

export default QuickSort;
