


import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const BubbleSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex,setsortedArrayIndex] = useState([])
 
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Log low, mid, high to debug
  useEffect(() => {
  }, [leftIndex, rightIndex,arr,sortedArrayIndex]);

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
  const handleBubbleSort = async () => {
    
    
    setLeftIndex(0);
    setRightIndex(0);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay


    let newArr = [...arr]
    for(let i=0; i<arrSize-1; i++){

        for(let j=0; j<arrSize-i-1; j++){

            setLeftIndex(j);
            setRightIndex(j+1);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay


            
            if(newArr[j] > newArr[j+1]){
                let temp = newArr[j];
                newArr[j] = newArr[j+1];
                newArr[j+1] = temp;

                setArr([...newArr])
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

            }
        }

        
        setsortedArrayIndex((prev) => {
          const updatedArray = [...prev, newArr[arrSize - i - 1]];
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

    setArr([...newArr])
  };


  const startBubbleSort = async () => {
    
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    setsortedArrayIndex([]) // Reset the sorted array index
    setLeftIndex(-1)
    setRightIndex(-1)
    await handleBubbleSort(); // Start sorting from the full array
    setLeftIndex(-1)
    setRightIndex(-1)
    toast.success("Bubble Sort Completed!");
    
  };

  return (
    <div className="flex  flex-col gap-5 bg-gray-900 w-screen items-center min-h-screen  overflow-hidden">
      <h1 className='text-2xl font-bold text-white text-center mt-5'>Bubble Sort</h1>
      <input
        type="number"
        className="w-64 p-2 border-2 rounded bg-gray-800 text-white placeholder-white"
        placeholder="Enter the size of the first array"
        onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
      />
      <input
        type="text"
        className="w-80 p-2 border-2 bg-gray-800 rounded  text-white placeholder-white"
        placeholder="Enter array elements of 1st array separated by space"
        value={inputValue}
        onChange={handleInput}
      />

<div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
          >
            Submit Array
          </button>
          <button
            onClick={startBubbleSort}
            className="px-4 py-2 bg-orange-600 font-semibold text-white rounded hover:bg-orange-700"
          >
            Start Sorting
          </button>
        </div>


        <div className="flex flex-row gap-8 mt-16 self-center">
  {arr.map((val, index) => (
    <div key={index} className="p-2 flex flex-col gap-[20px] items-center relative ">
      <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
        {index === leftIndex && (
          <div className="absolute ml-9 gap-10">
            <span className='text-white'>leftIndex</span>
            <FaArrowDown size={20} color="green" />
          </div>
        )}
      </div>
      <span
      className={`rounded shadow bg-gray-200 w-16 h-16 text-2xl font-bold flex items-center justify-center ${
          sortedArrayIndex.includes(val) ? ' bg-green-500 text-white' : ''
        }`}>
        {val}
      </span>
      <div style={{ height: "40px", width: "40px" }} className="flex justify-center">
        {index === rightIndex && (
          <div className="absolute ml-12 gap-3">
            <FaArrowUp size={20} color="blue" />
            <span className='text-white'>RightIndex</span>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


        
      <Toaster />
    </div>
  );
};

export default BubbleSort;
