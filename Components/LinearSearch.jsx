


import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const LinearSearch = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [key,setkey] = useState(-1)
  const [currIndex,setCurrIndex] = useState(0);

  // Log low, mid, high to debug
  useEffect(() => {
  }, [currIndex,arr,key]);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
  };

 
  const FindElementIndex = async () => {
    
    setCurrIndex(0);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
    let flag = 0;

    let newArr = [...arr]
    for(let i=0; i<arrSize; i++){

        setCurrIndex(i)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

            if(key == newArr[i]){
                flag = 1;
                toast.success("Element found at "+i+" index")
                break;
            }
        
        
        
    }

    if(flag==0)
        toast.error("Element not found")

  };


  const PerformLinearSearch = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await FindElementIndex(); // Start sorting from the full array
    
  };

  const handleSearchElement = async(val) =>{

    setkey(val)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

  }

  return (
    <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen justify-center overflow-hidden">
      <h1 className='text-2xl font-bold '>Linear Search</h1>
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

    <input
        type="text"
        className="w-80 p-2 border rounded bg-white text-black"
        placeholder="Enter the element to Search"
        onChange={(e)=>handleSearchElement(e.target.value)}
      />

<div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
          >
            Submit Array
          </button>
          <button
            onClick={PerformLinearSearch}
            className="px-4 py-2 bg-orange-600 font-semibold text-white rounded hover:bg-orange-700"
          >
            Find the element
          </button>
        </div>


        <div className="flex flex-row gap-8 mt-16 self-center">
  {arr.map((val, index) => (
    <div key={index} className="p-2 flex flex-col gap-[20px] items-center relative ">
      <span
      className={`rounded shadow bg-gray-200 w-10 h-10 font-bold flex items-center justify-center 
          `}>
        {val}
      </span>
      <div style={{ height: "30px", width: "50px" }} className="flex justify-center">
        {index === currIndex && (
          <div className="absolute ml-12 gap-3">
            <FaArrowUp size={20} color="blue" />
            <span>CurrIndex</span>
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

export default LinearSearch;
