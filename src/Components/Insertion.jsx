


import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const InsertionSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
 
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
    for(let i=0; i<arrSize; i++){

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
        }

        

    }

    setArr([...newArr])
  };


  const startInsertionSort = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await handleInsertionSort(); // Start sorting from the full array
    setLeftIndex(-1)
    setRightIndex(-1)
    toast.success("Bubble Sort Completed!");
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Insertion Sort</h1>
      <input
        type="number"
        className="w-48 p-2 border rounded bg-white text-black"
        placeholder="Enter the size of the first array"
        onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
      />
      <input
        type="text"
        className="w-80 p-2 border rounded bg-white text-black"
        placeholder="Enter array elements of 1st array separated by space"
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
            onClick={startInsertionSort}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Start Sorting
          </button>
        </div>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === leftIndex && (
              <div className='ml-9'>
                <span>leftIndex</span> 
                <FaArrowDown size={20} color="green" />
              </div>
            )}
            <span
              className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
            >
              {val}
            </span>
            {index === rightIndex && (
              <div className='ml-14'>
                <FaArrowUp size={20} color="blue" />
                <span>RightIndex</span>
              </div>
            )}
          </div>
        ))}
      </div>


      <Toaster />
    </div>
  );
};

export default InsertionSort;
