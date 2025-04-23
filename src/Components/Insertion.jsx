


import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const InsertionSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex,setsortedArrayIndex] = useState([])
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Log low, mid, high to debug
  useEffect(() => {
  }, [leftIndex, rightIndex,arr]);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
  };

  // Merge Sort recursive function
  const handleInsertionSort = async () => {
    
    
    setLeftIndex(0);
    setRightIndex(0);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay


    let newArr = [...arr]
    for(let i=0; i<arrSize-1; i++){

        setsortedArrayIndex([])
        await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

        for(let j=i+1; j>0; j--){

            setLeftIndex(j-1);
            setRightIndex(j);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay


            
            if(newArr[j-1] > newArr[j]){
                let temp = newArr[j-1];
                newArr[j-1] = newArr[j];
                newArr[j] = temp;

                setArr([...newArr])
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

            }

            

              setsortedArrayIndex((prev) => {
                const updatedArray = [...prev, newArr[j]];
                console.log(updatedArray); // Log the updated state here
                return updatedArray;
              });
              await new Promise((resolve) => setTimeout(resolve, 1000));
            
        }

        setsortedArrayIndex((prev) => {
          const updatedArray = [...prev, newArr[0]];
          console.log(updatedArray); // Log the updated state here
          return updatedArray;
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));

    }

  
  };


  const startInsertionSort = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await handleInsertionSort(); // Start sorting from the full array
    setLeftIndex(-1)
    setRightIndex(-1)
    toast.success("Insertion Sort Completed!");
  };

  return (

    <div className="flex flex-col gap-6 items-center bg-gray-900 min-h-screen w-full px-4 py-10 overflow-hidden">
  <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
    Insertion Sort
  </h1>

  {/* Inputs */}
  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-4xl">
    <input
      type="number"
      className="w-full sm:w-56 p-2 border rounded bg-gray-900 text-white placeholder-white"
      placeholder="Enter size of the array"
      onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
    />
    <input
      type="text"
      className="w-full sm:w-80 p-2 border rounded bg-gray-900 text-white placeholder-white"
      placeholder="Enter array elements separated by space"
      value={inputValue}
      onChange={handleInput}
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 mt-4">
    <button
      onClick={handleSubmit}
      className="px-4 py-2 w-48 bg-blue-600 font-bold text-white rounded hover:bg-blue-700 transition"
    >
      Submit Array
    </button>
    <button
      onClick={startInsertionSort}
      className="px-4 py-2 w-48 bg-orange-600 font-bold text-white rounded hover:bg-orange-700 transition"
    >
      Start Sorting
    </button>
  </div>

  {/* Array Visualization */}
  <div className="flex flex-wrap justify-center gap-6 mt-12 w-full max-w-5xl">
    {arr.map((val, index) => (
      <div
        key={index}
        className="flex flex-col items-center relative"
        style={{ minHeight: "120px" }}
      >
        {/* Top pointer */}
        {index === leftIndex && (
          <div className="absolute -top-8 flex flex-col items-center">
            <span className="text-white text-sm">leftIndex</span>
            <FaArrowDown size={20} color="green" />
          </div>
        )}

        {/* Array element */}
        <div
          className={`rounded shadow bg-gray-200 text-xl font-bold w-16 h-16 flex items-center justify-center transition-colors duration-300 ${
            sortedArrayIndex.includes(val) ? 'bg-green-500 text-white' : ''
          }`}
        >
          {val}
        </div>

        {/* Bottom pointer */}
        {index === rightIndex && (
          <div className="absolute -bottom-10 flex flex-col items-center">
            <FaArrowUp size={20} color="blue" />
            <span className="text-white text-sm">rightIndex</span>
          </div>
        )}
      </div>
    ))}
  </div>

  <Toaster />
</div>

//     <div className="flex  flex-col gap-5 bg-gray-900 w-screen min-h-screen items-center  overflow-hidden">
//       <h1 className='text-2xl font-bold text-white mt-5 text-center'>Insertion Sort</h1>
//       <input
//         type="number"
//         className="w-56 p-2 border rounded bg-gray-900 text-white placeholder-white"
//         placeholder="Enter the size of the first array"
//         onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         className="w-80 p-2 border  rounded bg-gray-900 text-white placeholder-white"
//         placeholder="Enter array elements of 1st array separated by space"
//         value={inputValue}
//         onChange={handleInput}
//       />

// <div className="flex gap-4">
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 font-bold text-white rounded hover:bg-blue-700"
//           >
//             Submit Array
//           </button>
//           <button
//             onClick={startInsertionSort}
//             className="px-4 py-2 bg-orange-600 font-bold text-white rounded hover:bg-orange-700"
//           >
//             Start Sorting
//           </button>
//         </div>

    
//     <div className="flex flex-row gap-8 mt-16 self-center">
//       {arr.map((val, index) => (
//         <div key={index} className="p-2 flex flex-col gap-[20px] items-center relative ">
//           <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
//             {index === leftIndex && (
//               <div className="absolute ml-9 gap-10">
//                 <span className='text-white'>leftIndex</span>
//                 <FaArrowDown size={20} color="green" />
//               </div>
//             )}
//           </div>

//           <span
//           className={`rounded shadow bg-gray-200 text-2xl w-16 h-16 font-bold flex items-center justify-center ${
//               sortedArrayIndex.includes(val) ? ' bg-green-500 text-white' : ''
//             }`}>
//             {val}
//           </span>
//           <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
//             {index === rightIndex && (
//               <div className="absolute ml-12 gap-3">
//                 <FaArrowUp size={20} color="blue" />
//                 <span className='text-white'>RightIndex</span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
    


//       <Toaster />
//     </div>
  );
};

export default InsertionSort;
