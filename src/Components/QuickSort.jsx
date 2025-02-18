// import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

// const QuickSort = () => {
//   const [arr, setArr] = useState([]);
//   const [arrSize, setArrSize] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [low, setLow] = useState(0);
//   const [pIndex, setPIndex] = useState(0);
//   const [high, setHigh] = useState(arrSize);

//   const handleInput = (e) => setInputValue(e.target.value);

//   const handleSubmit = () => {
//     const elements = inputValue.trim().split(/\s+/).map(Number);
//     if (elements.length !== arrSize) {
//       alert(`Please enter exactly ${arrSize} elements.`);
//       return;
//     }
//     setArr(elements);
//   };

//   const partition = async(arr, low, high) => {
//     let pivot = arr[low]; // pivot element
//     let i = low + 1;
//     let j = high;
//     let newArr = [...arr];

//     while (i <= j) {
//       // Move i to the right until you find the element greater than the pivot
//       while (newArr[i] <= pivot && i <= high-1) {
//         i++;
//       }
//       // Move j to the left until you find the element which is less than the pivot
//       while (newArr[j] > pivot && j >= low+1) {
//         j--;
//       }

//       alert("i and low and high updated check")
//       setLow(i)
//       setHigh(j)
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//       if (i < j) {
//         // Swap elements at i and j
//         [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
//         setArr([...newArr])
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//       }

//     }

//     // Swap pivot with element at j to place it in the correct position
//     [newArr[low], newArr[j]] = [newArr[j], newArr[low]];

//     setArr([...newArr]); // Update array in state
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     setPIndex(j);
    
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     return j;
// };

//   const quickSort = async (arr, low, high) => {
//     setLow(low)
//     setHigh(high)
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     if (low < high) {
//       // Get partition index
//       alert('pIndex')
//         let pIndex = await partition(arr, low, high);

//       // Recursively sort the left subarray
//       await quickSort(arr, low, pIndex - 1);

//       // Recursively sort the right subarray
//       await quickSort(arr, pIndex + 1, high);
//     }
//   };

//   const handleQuickSort = async () => {
//     if (!arr.length) {
//       toast.error("Please submit the array first!");
//       return;
//     }
//     await quickSort(arr, 0, arr.length - 1); // Start sorting from the full array
//     toast.success("Quick Sort Completed!");
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <h1>Quick Sort</h1>
//       <input
//         type="number"
//         className="w-48 p-2 border rounded bg-white text-black"
//         placeholder="Enter the size of the array"
//         onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         className="w-80 p-2 border rounded bg-white text-black"
//         placeholder="Enter array elements separated by space"
//         value={inputValue}
//         onChange={handleInput}
//       />
//       <div className="flex gap-4">
//         <button
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Submit Array
//         </button>
//         <button
//           onClick={handleQuickSort}
//           className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
//         >
//           Start Sorting
//         </button>
//       </div>

//       <div className="flex flex-row gap-8 mt-16 self-center">
//         {arr.map((val, index) => (
//           <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//             {index === pIndex && (
//               <div>
//                 <span>pIndex</span> <FaArrowDown size={20} color="green" />
//               </div>
//             )}
//             {index === low && (
//               <div>
//                 <span>Low</span> <FaArrowDown size={20} color="blue" />
//               </div>
//             )}
//             <span
//               className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//             >
//               {val}
//             </span>
//             {index === high && (
//               <div>
//                 <span>High</span> <FaArrowUp size={20} color="red" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <Toaster />
//     </div>
//   );
// };

// export default QuickSort;


import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const QuickSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [low, setLow] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [high, setHigh] = useState(arrSize);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[low]; // pivot element
    let i = low + 1; // Start `i` from the element next to the pivot
    let j = high; // Start `j` from the last element
    let newArr = [...arr];

    // Visualize the initial state
    setLow(low);
    setHigh(high);
    setPIndex(low);

    // Move `i` to the right and `j` to the left to partition the array
    while (i <= j) {
      while (newArr[i] <= pivot && i <= high - 1) {
        i++;
      }
      while (newArr[j] > pivot && j >= low + 1) {
        j--;
      }

      if (i < j) {
        // Swap elements at `i` and `j`
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        setArr([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualization delay
      }
    }

    // Swap pivot with element at `j` to place it in the correct position
    [newArr[low], newArr[j]] = [newArr[j], newArr[low]];

    setArr([...newArr]); // Update the array in state
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualization delay

    setPIndex(j);
    return j; // Return partition index
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      // Perform partition
      const partitionIndex = await partition(arr, low, high);

      // Recursively sort the left and right subarrays
      await quickSort(arr, low, partitionIndex - 1);
      await quickSort(arr, partitionIndex + 1, high);
    }
  };

  const handleQuickSort = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await quickSort(arr, 0, arr.length - 1); // Start sorting from the full array
    toast.success("Quick Sort Completed!");
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen justify-center overflow-hidden">
      <h1>Quick Sort</h1>
      <input
        type="number"
        className="w-48 p-2 border rounded bg-white text-black"
        placeholder="Enter the size of the array"
        onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
      />
      <input
        type="text"
        className="w-80 p-2 border rounded bg-white text-black"
        placeholder="Enter array elements separated by space"
        value={inputValue}
        onChange={handleInput}
      />
      <div className="flex gap-4">
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

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === pIndex && (
              <div>
                <span>pIndex</span> <FaArrowDown size={20} color="green" />
              </div>
            )}
            {index === low && (
              <div>
                <span>Low</span> <FaArrowDown size={20} color="blue" />
              </div>
            )}
            <span
              className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
            >
              {val}
            </span>
            {index === high && (
              <div>
                <span>High</span> <FaArrowUp size={20} color="red" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Toaster />
    </div>
  );
};

export default QuickSort;
