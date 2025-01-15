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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (arr[mid] === value) {
        setFound(true);
        setMid(mid)
        toast.success("Element found at "+mid)
      
        return;
      } else if (arr[mid] < value) {
        low = mid + 1;
        setLow(mid+1)
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        high = mid - 1;
        setHigh(mid-1)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    setFound(false);
    toast.error("Element not found")
};

  return (
    <div className="flex  flex-col gap-5">
        <h1>Binary Search Algorithm</h1>
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
        onClick={visualizeBinarySearch}
        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
      >
        BSAlgo
      </button>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === Mid &&(<div><span>Mid</span> <FaArrowDown size={20} color="green" /></div>)}
            {index === Low && (<div><span>Low</span> <FaArrowDown size={20} color="blue" /></div>)}
            <span
              className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center ${
                index === Mid ? 'bg-green-400' : index === Low ? 'bg-blue-400' : index === High ? 'bg-red-400' : ''
              }`}
            >
              {val}
            </span>
            {index === High && (<div><span>High</span> <FaArrowUp size={20} color="red" /></div>)}
          </div>
        ))}
      </div>

      <div>
            {Mid === searchValue ? <h1>{Mid} === {searchValue}</h1>:null}
            {Mid > searchValue ? <h1>{Mid} greater than {searchValue}</h1>:null}
            {Mid < searchValue ? <h1>{Mid} smaller than {searchValue}</h1>:null}
      </div>
      <Toaster/>
    </div>
  );
};

export default BSAlgo;
