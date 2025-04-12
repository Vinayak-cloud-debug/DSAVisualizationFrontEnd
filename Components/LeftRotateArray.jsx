

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const LeftRotateArray = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [places, setplaces] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [FirstElement,setFirstElement] = useState(0)

  useEffect(()=>{

  },[currIndex,nextIndex,arr,FirstElement])
  
  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
   
  };

  const LeftRotate = async () => {

    let newArr = [...arr]
    for(let i=0; i<places%arrSize; i++){

        let firstEle = newArr[0]
        setFirstElement(firstEle)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        for(let j=0; j<arrSize-1; j++){
            
            setCurrIndex(j)
            setNextIndex(j+1)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            newArr[j] = newArr[j+1];
            setArr([...newArr])
            await new Promise((resolve) => setTimeout(resolve, 1000));

        }

        newArr[arrSize-1] = firstEle
        setArr([...newArr])
        await new Promise((resolve) => setTimeout(resolve, 1000));

    }

    setCurrIndex(-1)
    setNextIndex(-1)
    await new Promise((resolve) => setTimeout(resolve, 500));


  };

  const PerformLeftRotate = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await LeftRotate();
    toast.success("Left Rotate by K places completed !")
  };

  const handleRotatePlaces = (val) =>{

    setplaces(val)
  }

  return (
    <div className="flex flex-col gap-5 bg-gray-900 w-screen min-h-screen justify-center overflow-hidden">
      <h1 className='text-2xl font-bold'>Left Rotate Array by K places</h1>
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
        placeholder="Enter the number of places to rotate the array"
        onChange={(e)=>handleRotatePlaces(e.target.value)}
      />    

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
        >
          Submit Array
        </button>
        <button
          onClick={PerformLeftRotate}
          className="px-4 py-2 bg-orange-600 font-semibold text-white rounded hover:bg-orange-700"
        >
         Start Rotating
        </button>
      </div>

      <div className={`flex flex-col justify-center items-center self-center gap-5`}>
        <span className='font-bold text-xl'>First Element</span>
        <span className={`font-bold text-lg rounded shadow p-2 bg-gray-200 w-28 h-10 `}>
          {FirstElement}
        </span>
      </div>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[20px] items-center ">
             <div style={{ height: "30px", width: "50px" }} className="flex justify-center">
              {index === nextIndex && (

                <div className="absolute ml-10 gap-3">
                  <span >NextIndex</span>
                  <FaArrowDown size={20} color="red" />
                </div>
              )}
            </div>

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

export default LeftRotateArray;