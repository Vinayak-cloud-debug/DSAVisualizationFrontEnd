import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const BSAlgo = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [Low, setLow] = useState(null);
  const [High, setHigh] = useState(null);
  const [Mid, setMid] = useState(null);
  const [found, setFound] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
    setLow(0);
    setHigh(elements.length - 1);
    setMid(null);
    setFound(false);
  };


  const visualizeBinarySearch = async () => {
    let low = 0;
    let high = arr.length - 1;
    const value = parseInt(searchValue, 10);

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setLow(low);
      setHigh(high);
      setMid(mid);

      // Visualize the current state
      await new Promise((resolve) => setTimeout(resolve, 1800));

      if (arr[mid] === value) {
        setFound(true);
        setMid(mid)
        toast.success("Element found at "+mid+" index")
      
        return;
      } else if (arr[mid] < value) {
        low = mid + 1;
        setLow(mid+1)
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } else {
        high = mid - 1;
        setHigh(mid-1)
        await new Promise((resolve) => setTimeout(resolve, 1800));
      }
    }

    setFound(false);
    toast.error("Element not found")
};



  return (
//     <div className="flex  flex-col gap-5 bg-gray-900 items-center w-screen min-h-screen  overflow-hidden">
//         <h1 className='text-2xl font-bold text-center mt-10 text-white'>Binary Search Algorithm</h1>
//       <input
//         type="number"
//         className="w-56 p-2 ml-5 border rounded bg-gray-900 text-white placeholder-white"
//         placeholder="Enter the size of the array"
//         onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         className="w-80 p-2 border ml-5 rounded bg-gray-900 text-white placeholder-white"
//         placeholder="Enter array elements separated by space"
//         value={inputValue}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         className="w-52 p-2 border ml-5 rounded bg-gray-900 text-white placeholder-white"
//         placeholder="Enter the element to search"
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//       />
//       <button
//         onClick={handleSubmit}
//         className="px-4 py-2 w-[200px] ml-5 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>
//       <button
//         onClick={visualizeBinarySearch}
//         className="px-4 py-2  w-[200px] ml-5 bg-orange-600 text-white rounded hover:bg-blue-700"
//       >
//         Search
//       </button>

//       <div className="flex flex-row gap-8 mt-16 self-center">
//   {arr.map((val, index) => (
//     <div
//       key={index}
//       className="p-2 flex flex-col gap-[10px] items-center relative"
//       style={{ minHeight: "60px" }} // Ensures consistent height for the container
//     >
//       {/* Top Pointer */}
//       <div
//         className="flex justify-center"
//         style={{ height: "30px", width: "50px", position: "relative" }}
//       >
//         {index === Mid && (
//           <div className="absolute top-0 flex flex-col items-center">
//             <span className='text-white'>Mid</span>
//             <FaArrowDown size={20} color="green" />
//           </div>
//         )}

//       </div>

//       {/* Main Box */}
//       <span
//         className={`rounded shadow mt-3 bg-gray-200 w-12 h-12 text-xl font-bold flex items-center justify-center ${
//           index === Mid
//             ? "bg-green-400"
//             : index === Low
//             ? "bg-blue-400"
//             : index === High
//             ? "bg-red-400"
//             : ""
//         }`}
//       >
//         {val}
//       </span>



//       {/* Bottom Pointer */}
//       <div
//         className="flex justify-center mt-5"
//         style={{ height: "30px", width: "50px", position: "relative" }}
//       >
//         {index === High && (
//           <div className="absolute bottom-0 flex flex-col items-center">
//             <FaArrowUp size={20} color="red" />
//             <span className='text-white'>High</span>
//           </div>
//         )}

// {index === Low && (
//           <div className="absolute top-0 flex flex-col items-center">
//             <FaArrowUp size={20} color="blue" />
//             <span className='text-white'>Low</span>
//           </div>
//         )}
//       </div>
      
//     </div>
//   ))}
// </div>

      
//       <Toaster/>
//     </div>

<div className="flex flex-col gap-6 items-center bg-gray-900 min-h-screen w-full px-4 py-10 overflow-hidden">
  <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
    Binary Search Algorithm
  </h1>

  {/* Inputs */}
  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-4xl">
    <input
      type="number"
      className="w-full sm:w-56 p-2 border rounded bg-gray-900 text-white placeholder-white"
      placeholder="Enter the size of the array"
      onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
    />
    <input
      type="text"
      className="w-full sm:w-80 p-2 border rounded bg-gray-900 text-white placeholder-white"
      placeholder="Enter array elements separated by space"
      value={inputValue}
      onChange={handleInputChange}
    />
    <input
      type="text"
      className="w-full sm:w-52 p-2 border rounded bg-gray-900 text-white placeholder-white"
      placeholder="Enter the element to search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 mt-4">
    <button
      onClick={handleSubmit}
      className="px-4 py-2 w-48 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Submit
    </button>
    <button
      onClick={visualizeBinarySearch}
      className="px-4 py-2 w-48 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
    >
      Search
    </button>
  </div>

  {/* Array Visualization */}
  <div className="flex flex-wrap justify-center gap-6 mt-12 w-full px-4">
    {arr.map((val, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-2 relative"
        style={{ minHeight: "100px" }}
      >
        {/* Top Pointer (Mid) */}
        {index === Mid && (
          <div className="absolute -top-6 flex flex-col items-center">
            <span className="text-white text-sm">Mid</span>
            <FaArrowDown size={20} color="green" />
          </div>
        )}

        {/* Value Box */}
        <div
          className={`rounded shadow bg-gray-200 w-12 h-12 text-xl font-bold flex items-center justify-center transition-colors duration-300 ${
            index === Mid
              ? "bg-green-400"
              : index === Low
              ? "bg-blue-400"
              : index === High
              ? "bg-red-400"
              : ""
          }`}
        >
          {val}
        </div>

        {/* Bottom Pointers */}
        {index === Low && (
          <div className="absolute bottom-[-30px] flex flex-col items-center">
            <FaArrowUp size={20} color="blue" />
            <span className="text-white text-sm">Low</span>
          </div>
        )}
        {index === High && (
          <div className="absolute bottom-[-60px] flex flex-col items-center">
            <FaArrowUp size={20} color="red" />
            <span className="text-white text-sm">High</span>
          </div>
        )}
      </div>
    ))}
  </div>

  <Toaster />
</div>

  );
};

export default BSAlgo;
