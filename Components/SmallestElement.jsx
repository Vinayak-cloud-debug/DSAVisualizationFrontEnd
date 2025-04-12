

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const SmallestElement = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [mini, setMini] = useState(Number.POSITIVE_INFINITY);
  const [currIndex, setCurrIndex] = useState(0);
  const [blinkMaxi, setBlinkMaxi] = useState(0);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
    setMini(Number.POSITIVE_INFINITY); // Reset maxi when new array is submitted
  };

  const FindLargestElement = async () => {
    let currMini = Number.POSITIVE_INFINITY;
    setCurrIndex(0);
    
    for (let i = 0; i < arrSize; i++) {
      setCurrIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (arr[i] < currMini) {
        currMini = arr[i];
        setMini(currMini);
        setBlinkMaxi(1);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBlinkMaxi(0);
      }
    }
  };

  const PerformLargestElementSearch = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await FindLargestElement();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className='text-2xl font-bold'>Smallest Element</h1>
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
          className="px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
        >
          Submit Array
        </button>
        <button
          onClick={PerformLargestElementSearch}
          className="px-4 py-2 bg-orange-600 font-semibold text-white rounded hover:bg-orange-700"
        >
          Find the element
        </button>
      </div>

      <div className={`flex flex-col justify-center items-center self-center gap-5`}>
        <span className='font-bold text-xl'>Smallest Element</span>
        <span className={`font-bold text-lg rounded shadow p-2 bg-gray-200 w-28 h-10 ${blinkMaxi ? 'bg-green-500 text-white' : ''}`}>
          {mini === -999999 ? '-999999' : mini}
        </span>
      </div>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[20px] items-center relative">
            <span className={`rounded shadow bg-gray-200 w-10 h-10 font-bold flex items-center justify-center`}>
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

export default SmallestElement;