import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const MergeSortFunction = () => {
  const [arr1, setArr1] = useState([]);
  const [arr1Size, setArr1Size] = useState(0);
  const [arr2, setArr2] = useState([]);
  const [arr2Size, setArr2Size] = useState(0);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [ans,setAns] = useState([])
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const handleArr1Input = (e) => setInputValue1(e.target.value);
  const handleArr2Input = (e) => setInputValue2(e.target.value);



  const handleArray1Submit = () => {
    
    
    const elements = inputValue1.trim().split(/\s+/).map(Number);
    if (elements.length !== arr1Size) {
      alert(`Please enter exactly ${arr1Size} elements.`);
      return;
    }
    setArr1(elements);
    
  };

  const handleArray2Submit = () => 
    
  
    {
    const elements = inputValue2.trim().split(/\s+/).map(Number);
    if (elements.length !== arr2Size) {
      alert(`Please enter exactly ${arr2Size} elements.`);
      return;
    }
    setArr2(elements);
    
  };


  const visualizeMergeFunction = async () => {
    
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
    let left = 0;
    let right = 0;

    while (left < arr1Size && right < arr2Size) {
      setLeft(left);
      setRight(right);

      // Visualize the current state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (arr1[left] <= arr2[right]) {
    

        setAns((ans)=>[...ans,arr1[left]])
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLeft((prevLeft)=>left+1)
        left += 1
        await new Promise((resolve) => setTimeout(resolve, 1000));

      } else if (arr1[left] > arr2[right]) {
        
        setAns((ans)=>[...ans,arr2[right]])
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRight((prevRight)=>right+1)
        right += 1
        await new Promise((resolve) => setTimeout(resolve, 1000));

      } 
    }


    while(left < arr1Size){
        setLeft(left);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setAns((ans)=>[...ans,arr1[left]])
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLeft(left+1)
        left += 1
        await new Promise((resolve) => setTimeout(resolve, 1000));

    }

    while(right < arr2Size){
        setRight(right);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setAns((ans)=>[...ans,arr2[right]])
        await new Promise((resolve) => setTimeout(resolve, 500));

        setRight(right+1)
        right += 1
        await new Promise((resolve) => setTimeout(resolve, 500));

    }

    toast.success("Merge Completed Successfully !!")

    return;
};

  return (
    <div className="flex  flex-col gap-5 bg-gray-900 w-screen min-h-screen justify-center overflow-hidden">
        <h1>Merge function in Merge Sort</h1>
      <input
        type="number"
        className="w-48 p-2 border rounded bg-gray-900 text-white"
        placeholder="Enter the size of the first array"
        onChange={(e) => setArr1Size(parseInt(e.target.value, 10))}
      />
      <input
        type="text"
        className="w-80 p-2 border rounded bg-gray-900 text-white"
        placeholder="Enter array elements of 1st array separated by space"
        value={inputValue1}
        onChange={handleArr1Input}
      />

<input
        type="number"
        className="w-48 p-2 border rounded bg-gray-900 text-white"
        placeholder="Enter the size of the second array"
        onChange={(e) => setArr2Size(parseInt(e.target.value, 10))}
      />
      <input
        type="text"
        className="w-80 p-2 border rounded bg-gray-900 text-white"
        placeholder="Enter array elements of 1st array separated by space"
        value={inputValue2}
        onChange={handleArr2Input}
      />
      <button
        onClick={handleArray1Submit}
        className="px-4 py-2 bg-blue-600 w-[200px] text-white rounded hover:bg-blue-700"
      >
        Submit 1st Array
      </button>

      <button
        onClick={handleArray2Submit}
        className="px-4 py-2 bg-blue-600 w-[200px] text-white rounded hover:bg-blue-700"
      >
        Submit 2nd Array
      </button>
      <button
        onClick={visualizeMergeFunction}
        className="px-4 py-2 bg-orange-600 w-[200px] text-white rounded hover:bg-blue-700"
      >
        Merge_Two_Arrays
      </button>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr1.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === left && (<div><span className='text-white'>left</span> <FaArrowDown size={20} color="blue" /></div>)}
            <span
              className={`rounded shadow bg-gray-200  w-14 h-14 text-lg font-medium flex items-center justify-center `}
            >
              {val}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr2.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            <span
              className={`rounded shadow bg-gray-200 w-14 h-14 text-lg font-medium flex items-center justify-center `}
            >
              {val}
            </span>
            {index === right && (<div><span className='text-white'>High</span> <FaArrowUp size={20} color="red" /></div>)}
          </div>
        ))}
      </div>

        {ans.length > 0 ?
          <div className='flex flex-col gap-5  self-center'>
            <h1 className='text-[#ffffff] text-xl font-medium'>Merged array </h1>
            <div className='flex flex-row gap-8 justify-center items-center '>
                {ans.map((val,index) =>
                    <span key = {index}
                    className={`rounded shadow bg-gray-200 w-16 h-16 text-2xl font-medium flex items-center justify-center `}
                >
                    {val}
                </span>)}
            </div>
          </div>
        :null}

        <div className='mb-28'></div>
            <Toaster/>
    </div>
  );
};

export default MergeSortFunction;
