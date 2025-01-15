import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const TwoPointerAlgo = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [found, setFound] = useState(false);
  const [leftGot,setLeftGot] = useState(false)

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    setLeftGot(0)
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
    setLeft(0);
    setRight(elements.length - 1);
    setFound(false);
  };



  const VisualiseTwoPointerApproach = async () => {
    setLeftGot(0)
    let left = 0;
    let right = arr.length - 1;
    const value = parseInt(searchValue, 10);

    while (left <= right) {
      setLeft(left);
      setRight(right);

      // Visualize the current state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (arr[left] === value) {
        setFound(true);
        setLeft(left)
        toast.success("Element found at "+left)
        setLeftGot(1)
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
      } 

      if (arr[right] === value) {
        setFound(true);
        setRight(right)
        setLeftGot(2)
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success("Element found at "+right)
        return;
      } 

      left++;
      right--;

    }

    setFound(false);
    toast.error("Element not found")
};

  return (
    <div className="flex  flex-col gap-5">
        <h1>Two Pointer Algorithm</h1>
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
        onChange={handleInputChange}
      />
      <input
        type="text"
        className="w-52 p-2 border rounded bg-white text-black"
        placeholder="Enter the element to search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      <button
        onClick={VisualiseTwoPointerApproach}
        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
      >
        TwoPointer
      </button>
 
      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === left && (<div><span>left</span> <FaArrowDown size={20} color="blue" /></div>)}
            <span
              className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center ${leftGot === 1 && index === left ? 'bg-blue-800 text-white font-bold':(leftGot===2) && index === right ? 'bg-red-700 text-white font-bold':''} `}
            >
              {val}
            </span>

            {index === right && (<div><span>High</span> <FaArrowUp size={20} color="red" /></div>)}
           
          </div>
        ))}
      </div>

      
      <Toaster/>
    </div>
  );
};

export default TwoPointerAlgo;
