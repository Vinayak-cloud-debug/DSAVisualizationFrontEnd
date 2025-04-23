import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowDown, ArrowUp } from 'lucide-react';

const MergeSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [low, setLow] = useState(0);
  const [mid, setMid] = useState(0);
  const [high, setHigh] = useState(0);
  const [leftArr, setLeftArr] = useState([]);
  const [rightArr, setRightArr] = useState([]);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [temp,setTemp] = useState([])
  const [ind,setInd] = useState(-1)

  const PARTITION_DELAY = 1500;
  const COMPARISON_DELAY = 800;
  const MERGE_DELAY = 600;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSizeChange = (e) => {
    setArrSize(e.target.value);
  };

  const handleSubmit = () => {
    const size = parseInt(arrSize, 10);
    if (isNaN(size) || size <= 0) {
      toast.error('Please enter a valid array size');
      return;
    }

    const elements = inputValue.trim().split(/\s+/);
    if (elements.length !== size) {
      toast.error(`Please enter exactly ${size} elements`);
      return;
    }

    setArr([...elements]);
    setHigh(elements.length - 1);
    setLeftArr([]);
    setRightArr([]);
    toast.success('Array submitted successfully!');
  };

  const merge = async (arr, low, mid, high) => {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);

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
      await delay(COMPARISON_DELAY);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        setTemp((prev) => [...prev, left[i]]);
        await delay(MERGE_DELAY);
        i++;
      } else {
        arr[k] = right[j];
        setTemp((prev) => [...prev,right[j]]);
        await delay(MERGE_DELAY);
        j++;

      }

      k++;
      setArr([...arr]);
      await delay(MERGE_DELAY);
    }

    while (i < left.length) {
      setLeftIndex(i);
      await delay(COMPARISON_DELAY);
      arr[k++] = left[i];
      setArr([...arr]);
      setTemp((prev) => [...prev, left[i]]);
      await delay(MERGE_DELAY);
      i++;
    }

    while (j < right.length) {
      setRightIndex(j);
      await delay(COMPARISON_DELAY);
      arr[k++] = right[j];
      setArr([...arr]);
      setTemp((prev) => [...prev,right[j]]);
      await delay(MERGE_DELAY);
      j++
    }

    

    

    
    setLeftIndex(-1);
    setRightIndex(-1);
    await delay(PARTITION_DELAY);
  };

  const mergeSort = async (arr, low, high) => {
    if (low < high) {
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
    } catch {
      toast.error('An error occurred during sorting');
    }
    setIsSorting(false);
    setLeftArr([]);
    setRightArr([]);
  };

  return (

    <div className="flex flex-col min-h-screen items-center bg-gray-900 gap-6 p-8 text-white">
  <h1 className="text-3xl font-bold mb-4">Merge Sort Visualization</h1>

  {/* Input Section */}
  <div className="flex flex-col gap-4 w-full max-w-md">
    <input
      type="number"
      className="w-full p-2 border rounded bg-gray-800 text-white"
      placeholder="Enter array size"
      value={arrSize}
      onChange={handleSizeChange}
    />
    <input
      type="text"
      className="w-full p-2 border rounded bg-gray-800 text-white"
      placeholder="Enter elements separated by space"
      value={inputValue}
      onChange={handleInput}
    />
    <div className="flex gap-4 justify-center">
      <button
        onClick={handleSubmit}
        disabled={isSorting}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        Submit Array
      </button>
      <button
        onClick={handleMergeSort}
        disabled={isSorting}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 transition"
      >
        Start Sorting
      </button>
    </div>
  </div>

  {/* Main Array Visualization */}
  <div className="flex flex-wrap mt-14 gap-4 justify-center">
    {arr.map((val, index) => (
      <div key={index} className="relative flex flex-col items-center">
        {/* Mid Pointer */}
        {index === mid && (
          <div className="absolute mb-16 -top-14 text-green-400 flex flex-col items-center">
            <span>Mid</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        )}

        {/* Low Pointer */}
        {index === low && (
          <div className="absolute text-blue-400 mb-5 flex flex-col items-center">
            <span>Low</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        )}

        {/* Array Element Box */}
        <div
          className={`w-12 h-12 mt-14 flex items-center justify-center rounded-lg 
            ${index >= low && index <= high ? 'bg-[#13246c]' : 'bg-gray-700'}`}
        >
          {val}
        </div>

        {/* High Pointer */}
        {index === high && (
          <div className="absolute -bottom-12 text-red-400 flex flex-col items-center">
            <ArrowUp className="h-4 w-4" />
            <span>High</span>
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Left and Right Subarrays */}
  {(leftArr.length > 0 || rightArr.length > 0) && (
    <div className="flex flex-col gap-8 mt-12">
      {/* Left Subarray */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl mb-4">Left Subarray</h3>
        <div className="flex gap-4">
          {leftArr.map((val, index) => (
            <div key={index} className="relative">
              {/* Current Element Pointer */}
              {index === leftIndex && (
                <div className="absolute mt-5 -top-8 text-yellow-400 flex flex-col items-center">
                  <span>Current</span>
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
              <div className="w-12 h-12 flex mt-5 items-center justify-center rounded-lg bg-blue-500">
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Subarray */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl mb-4">Right Subarray</h3>
        <div className="flex gap-4">
          {rightArr.map((val, index) => (
            <div key={index} className="relative">
              {/* Current Element Pointer */}
              {index === rightIndex && (
                <div className="absolute mt-5 -top-8 text-yellow-400 flex flex-col items-center">
                  <span>Current</span>
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
              <div className="w-12 h-12 mt-5 flex items-center justify-center rounded-lg bg-green-500">
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* Merged Array */}
  {temp.length > 0 && (
    <div className="flex flex-col gap-5 mt-12">
      <h3 className="text-xl mb-4">Merged Array</h3>
      <div className="flex gap-4">
        {temp.map((val, index) => (
          <div
            key={index}
            className="w-12 h-12 flex text-lg font-bold items-center justify-center rounded-lg bg-gray-500"
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  )}

  <div className="mb-28"></div>

  {/* Toaster for notifications */}
  <Toaster position="top-center" />
</div>

    // <div className="flex flex-col min-h-screen items-center bg-gray-900 gap-6 p-8 text-white">
    //   <h1 className="text-3xl font-bold mb-4">Merge Sort Visualization</h1>

    //   <div className="flex flex-col gap-4 w-full max-w-md">
    //     <input
    //       type="number"
    //       className="w-full p-2 border rounded bg-gray-800 text-white"
    //       placeholder="Enter array size"
    //       value={arrSize}
    //       onChange={handleSizeChange}
    //     />
    //     <input
    //       type="text"
    //       className="w-full p-2 border rounded bg-gray-800 text-white"
    //       placeholder="Enter elements separated by space"
    //       value={inputValue}
    //       onChange={handleInput}
    //     />
    //     <div className="flex gap-4 justify-center">
    //       <button
    //         onClick={handleSubmit}
    //         disabled={isSorting}
    //         className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
    //       >
    //         Submit Array
    //       </button>
    //       <button
    //         onClick={handleMergeSort}
    //         disabled={isSorting}
    //         className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
    //       >
    //         Start Sorting
    //       </button>
    //     </div>
    //   </div>

    //   {/* Main Array */}
    //   <div className="flex flex-wrap mt-14 gap-4 justify-center ">
    //     {arr.map((val, index) => (
    //       <div key={index} className="relative flex flex-col items-center">
    //         {index === mid && (
    //           <div className="absolute mb-16 -top-14 text-green-400 flex flex-col items-center">
    //             <span>Mid</span>
    //             <ArrowDown className="h-4 w-4" />
    //           </div>
    //         )}
    //         {index === low && (
    //           <div className="absolute text-blue-400 mb-5 flex flex-col items-center">
    //             <span>Low</span>
    //             <ArrowDown className="h-4 w-4" />
    //           </div>
    //         )}
    //         <div className={`w-12 h-12 mt-14 flex items-center justify-center rounded-lg 
    //           ${index >= low && index <= high ? 'bg-[#13246c]' : 'bg-gray-700'}`}>
    //           {val}
    //         </div>
    //         {index === high && (
    //           <div className="absolute  -bottom-12 text-red-400 flex flex-col items-center">
    //             <ArrowUp className="h-4 w-4" />
    //             <span>High</span>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>

    //   {/* Subarrays */}
    //   {(leftArr.length > 0 || rightArr.length > 0) && (
    //     <div className="flex flex-col gap-8 mt-12">
    //       <div className="flex flex-col items-center">
    //         <h3 className="text-xl mb-4">Left Subarray</h3>
    //         <div className="flex gap-4">
    //           {leftArr.map((val, index) => (
    //             <div key={index} className="relative">
    //               {index === leftIndex && (
    //                 <div className="absolute mt-5 -top-8 text-yellow-400 flex flex-col items-center">
    //                   <span>Current</span>
    //                   <ArrowDown className="h-4 w-4" />
    //                 </div>
    //               )}
    //               <div className="w-12 h-12 flex mt-5 items-center justify-center rounded-lg bg-blue-500">
    //                 {val}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="flex flex-col items-center">
    //         <h3 className="text-xl mb-4">Right Subarray</h3>
    //         <div className="flex gap-4">
    //           {rightArr.map((val, index) => (
    //             <div key={index} className="relative">
    //               {index === rightIndex && (
    //                 <div className="absolute mt-5 -top-8 text-yellow-400 flex flex-col items-center">
    //                   <span>Current</span>
    //                   <ArrowDown className="h-4 w-4" />
    //                 </div>
    //               )}
    //               <div className="w-12 h-12 mt-5 flex items-center justify-center rounded-lg bg-green-500">
    //                 {val}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   )}



    //   {temp.length > 0 ?
    //     <div className='flex flex-col gap-5'>
    //       <h3 className="text-xl mb-4">Merged Array</h3>
    //       <div className="flex flex-row gap-4">
    //         {temp.map((val, index) => (
    //           <div key={index} className="w-12 h-12 flex text-lg font-bold items-center justify-center rounded-lg bg-gray-500">
    //             {val}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     : null}
    //   <div className="mb-28"></div>

    //   <Toaster position="top-center" />
    // </div>
  );
};



export default MergeSort;



