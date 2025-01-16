// import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

// const MergeSort = () => {

//   const [arr, setArr] = useState([]);
//   const [arrSize, setArrSize] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [low, setLow] = useState(-1);
//   const [mid, setMid] = useState(0);
//   const [high, setHigh] = useState(arrSize);
//   const [ans,setAns] = useState([])
//   const [leftArr,setLeftArr] = useState([])
//   const [rightArr,setRightArr] = useState([])
//   const [leftIndex,setLeftIndex] = useState(0)
//   const [rightIndex,setRightIndex] = useState(0)



//   const handleInput = (e) => setInputValue(e.target.value);



//   const handleSubmit = () => {
//     const elements = inputValue.trim().split(/\s+/).map(Number);
//     if (elements.length !== arrSize) {
//       alert(`Please enter exactly ${arrSize} elements.`);
//       return;
//     }
//     setArr(elements);
//     setHigh(elements.length-1)
    
//   };



//   const MS = async(low,high,arr) =>{

//         if(low >= high)  {
//             setLow(low); // Update low even when it's equal to high
//             setHigh(high); // Update high even when it's equal to high
//             return;
//         }

        
//         setLow(low);
//         setHigh(high);
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const mid = Math.floor((low + high) / 2);
//         setMid(mid);
//         await new Promise((resolve) => setTimeout(resolve, 1000));



//         await new Promise((resolve) => setTimeout(resolve, 500));

//         await MS(low,mid-1,arr);
//         await MS(mid,high,arr);
//         await merge(arr, low, mid, high); // Merge step
//     };
    
//     const merge = async (arr, low, mid, high) => {

//         let left = arr.slice(low,mid+1)
//         let right = arr.slice(mid+1,high+1)

//         setLeftArr(leftArr)
//         setRightArr(rightArr)

//         await new Promise((resolve)=>setTimeout(resolve,500))

//         let leftArrInd  =  low
//         let rightArrInd = mid+1

//         setLeftIndex(leftArrInd)
//         setRightIndex(rightArrInd)
//         await new Promise((resolve)=>setTimeout(resolve,500))



//       while (leftArrInd < left.length && rightArrInd < rightArr.length) {
//         if (arr[leftArrInd] <= arr[rightArrInd]) {
//             leftArrInd++;
//             setAns((ans)=>[...ans,arr[leftArrInd]])
//             await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//             setLeftIndex(leftArrInd)
//             await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//         } else {
//           rightArrInd++;
//           setAns((ans)=>[...ans,arr[rightArrInd]])
//           await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//           setRightIndex(rightArrInd)
//           await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//         }
        
        
//       }
    
    
//       while (leftArrInd < left.length) {
        
//         leftArrInd++;
//         setAns((ans)=>[...ans,arr[leftArrInd]])
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//         setLeftIndex(leftArrInd)
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//       }


//       while (rightArrInd < right.length) {
        
//         rightArrInd++;
//         setAns((ans)=>[...ans,arr[rightArrInd]])
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//         setLeftIndex(rightArrInd)
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Visualize delay

//       }
    
//       // Notify when merge is complete
//       toast.success("Merge Completed!");
//     };



//   const handleMergeSort = async () => {
//     if (!arr.length) {
//       toast.error("Please submit the array first!");
//       return;
//     }
//     await MS(arr, 0, arr.length - 1);
//     toast.success("Merge Sort Completed!");
//   };


//   return (
//     <div className="flex  flex-col gap-5">
//         <h1>Merge Sort</h1>
//       <input
//         type="number"
//         className="w-48 p-2 border rounded bg-white text-black"
//         placeholder="Enter the size of the first array"
//         onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         className="w-80 p-2 border rounded bg-white text-black"
//         placeholder="Enter array elements of 1st array separated by space"
//         value={inputValue}
//         onChange={handleInput}
//       />

//       <button
//         onClick={handleSubmit}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Submit Input Array
//       </button>

      
//       <button
//         onClick={handleMergeSort}
//         className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
//       >
//         MergeSort Analyze
//       </button>

//      <div className="flex flex-row gap-8 mt-16 self-center">
//             {arr.map((val, index) => (
//               <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//                 {index === mid &&(<div><span>Mid</span> <FaArrowDown size={20} color="green" /></div>)}
//                 {index === low && (<div><span>Low</span> <FaArrowDown size={20} color="blue" /></div>)}
//                 <span
//                   className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//                 >
//                   {val}
//                 </span>
//                 {index === high && (<div><span>High</span> <FaArrowUp size={20} color="red" /></div>)}
//               </div>
//             ))}
//         </div>

//             <div className='flex flex-col gap-8 justify-center items-center'>
//                 <div className="flex flex-row gap-8 mt-16 self-center">
//                     {leftArr.map((val, index) => (
//                     <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//                         {index === leftIndex && (<div><span>LeftIndex</span> <FaArrowDown size={20} color="black" /></div>)}
//                         <span
//                         className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//                         >
//                         {val}
//                         </span>
//                     </div>
//                     ))}
//                 </div>

//                 <div className="flex flex-row gap-8 mt-16 self-center">
//                     {rightArr.map((val, index) => (
//                     <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//                         <span
//                         className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//                         >
//                         {val}
//                         </span>
//                         {index === rightIndex && (<div><span>rightIndex</span> <FaArrowUp size={20} color="orange" /></div>)}
//                     </div>
//                     ))}
//                 </div>
//             </div>


//         <h1>Merge Sort Result: </h1>
//         <div className='flex flex-row gap-8 justify-center items-center '>
//             {ans.map((val,index) =>
//                 <span key = {index}
//                 className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//             >
//                 {val}
//             </span>)}
//         </div>

//             <Toaster/>
//     </div>
//   );
// };

// export default MergeSort;


// import React, { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

// const MergeSort = () => {
//   const [arr, setArr] = useState([]);
//   const [arrSize, setArrSize] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [low, setLow] = useState(-1);
//   const [mid, setMid] = useState(0);
//   const [high, setHigh] = useState(arrSize);
//   const [ans, setAns] = useState([]);
//   const [leftArr, setLeftArr] = useState([]);
//   const [rightArr, setRightArr] = useState([]);
//   const [leftIndex, setLeftIndex] = useState(0);
//   const [rightIndex, setRightIndex] = useState(0);

//   // Log low, mid, high to debug
//   useEffect(() => {
//     console.log('Low:', low, 'Mid:', mid, 'High:', high);
//   }, [low, mid, high,leftIndex,rightIndex]);

//   const handleInput = (e) => setInputValue(e.target.value);

//   const handleSubmit = () => {
//     const elements = inputValue.trim().split(/\s+/).map(Number);
//     if (elements.length !== arrSize) {
//       alert(`Please enter exactly ${arrSize} elements.`);
//       return;
//     }
//     setArr(elements);
//     setHigh(elements.length - 1);
//   };

//   const MS = async (low, high, arr) => {
//     if (low >= high) {
//       setLow(low);  // Ensure low is updated on recursion completion
//       setHigh(high); // Ensure high is updated on recursion completion
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       return;
//     }

//     setLow(low);
//     setHigh(high);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const mid = Math.floor((low + high) / 2);
//     setMid(mid);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     await new Promise((resolve) => setTimeout(resolve, 500));

//     await MS(low, mid, arr);
//     await MS(mid + 1, high, arr);
//     await merge(arr, low, mid, high); // Merge step
//   };

//   const merge = async (arr, low, mid, high) => {
//     setLeftArr([])
//     setRightArr([])
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     let left = arr.slice(low, mid + 1);
//     let right = arr.slice(mid + 1, high + 1);

//     let temp = []

//     setLeftArr(left);
//     setRightArr(right);

//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     let leftArrInd = 0;
//     let rightArrInd = 0;

//     setLeftIndex(leftArrInd);
//     setRightIndex(rightArrInd);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     while (leftArrInd < left.length && rightArrInd < right.length) {

//       if (left[leftArrInd] <= right[rightArrInd]) {
//         setLeftArr((leftArr)=>[...leftArr,left[leftArrInd]])
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//         temp.push(left[leftArrInd])
//         // setAns((ans) => [...ans, left[leftArrInd]]);
//         // await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//         leftArrInd++;
//         setLeftIndex(leftArrInd);
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//       } else {

//         setRightArr((rightArr)=>[...rightArr,right[rightArrInd]])
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//         temp.push(right[rightArrInd])
//         // setAns((ans) => [...ans, right[rightArrInd]]);
//         // await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//         rightArrInd++;
//         setRightIndex(rightArrInd);
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//       }
//     }

//     while (leftArrInd < left.length) {
//       temp.push(left[leftArrInd])
//       setLeftArr((leftArr)=>[...leftArr,left[leftArrInd]])
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     //   setAns((ans) => [...ans, left[leftArrInd]]);
//     //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//       leftArrInd++;
//       setLeftIndex(leftArrInd);
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     }

//     while (rightArrInd < right.length) {
//       temp.push(rightArr[rightArrInd])
//       setRightArr((rightArr)=>[...leftArr,left[rightArrInd]])
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     //   setAns((ans) => [...ans, right[rightArrInd]]);
//     //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//       rightArrInd++;
//       setRightIndex(rightArrInd);
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     }

//     let newArr = [...arr];  // Copy the current arr
//     for (let i = 0; i < temp.length; i++) {
//         newArr[low + i] = temp[i];  // Update the elements from index 'low' onwards
//     }
    
//     setArr(newArr);  // Update the arr state
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visual


        
    


//   };

//   const handleMergeSort = async () => {
//     if (!arr.length) {
//       toast.error("Please submit the array first!");
//       return;
//     }
//     await MS(0, arr.length - 1, arr);
//     toast.success("Merge Sort Completed!");
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <h1>Merge Sort</h1>
//       <input
//         type="number"
//         className="w-48 p-2 border rounded bg-white text-black"
//         placeholder="Enter the size of the first array"
//         onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
//       />
//       <input
//         type="text"
//         className="w-80 p-2 border rounded bg-white text-black"
//         placeholder="Enter array elements of 1st array separated by space"
//         value={inputValue}
//         onChange={handleInput}
//       />

//       <button
//         onClick={handleSubmit}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Submit Input Array
//       </button>

//       <button
//         onClick={handleMergeSort}
//         className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
//       >
//         MergeSort Analyze
//       </button>

//       <div className="flex flex-row gap-8 mt-16 self-center">
//         {arr.map((val, index) => (
//           <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//             {index === mid && (
//               <div>
//                 <span>Mid</span> <FaArrowDown size={20} color="green" />
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

//       <div className="flex flex-col gap-8 justify-center items-center">
//         <div className="flex flex-row gap-8 mt-16 self-center">
//           {leftArr.map((val, index) => (
//             <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//               {index === leftIndex && (
//                 <div>
//                   <span>LeftIndex</span> <FaArrowDown size={20} color="black" />
//                 </div>
//               )}
//               <span
//                 className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//               >
//                 {val}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-row gap-8 mt-16 self-center">
//           {rightArr.map((val, index) => (
//             <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
//               <span
//                 className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
//               >
//                 {val}
//               </span>
//               {index === rightIndex && (
//                 <div>
//                   <span>rightIndex</span> <FaArrowUp size={20} color="orange" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

   

//       <Toaster />
//     </div>
//   );
// };

// export default MergeSort;



import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const MergeSort = () => {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [low, setLow] = useState(0);
  const [mid, setMid] = useState(0);
  const [high, setHigh] = useState(arrSize);
  const [leftArr, setLeftArr] = useState([]);
  const [rightArr, setRightArr] = useState([]);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Log low, mid, high to debug
  useEffect(() => {
    console.log('Low:', low, 'Mid:', mid, 'High:', high);
  }, [low, mid, high, leftIndex, rightIndex,leftArr,rightArr]);

  const handleInput = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    const elements = inputValue.trim().split(/\s+/).map(Number);
    if (elements.length !== arrSize) {
      alert(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    setArr(elements);
    setHigh(elements.length - 1);
  };

  // Merge Sort recursive function
  const MS = async (low, high, arr) => {
    if (low >= high) {
      // Base case: low and high pointers are equal or crossed, no further sorting needed
      setLow(low); // Update low state (visualization purpose)
      setHigh(high); // Update high state (visualization purpose)
      return;
    }
  
    // Set low, high, and mid states (visualization purposes)
    setLow(low);
    setHigh(high);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
  
    const mid = Math.floor((low + high) / 2);
    setMid(mid); // Update mid state (visualization purpose)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
  
    // Recursively sort the left and right parts
    await MS(low, mid, arr); // Recursively sort the left part
    await MS(mid + 1, high, arr); // Recursively sort the right part
  
    // Merge the two sorted parts
    await merge(arr, low, mid, high);
  };
  

//   // Merge two sorted subarrays
//   const merge = async (arr, low, mid, high) => {
//     let left = []
//     left = arr.slice(low, mid + 1);
//     let right = []
//     right = arr.slice(mid + 1, high + 1);
//     let temp = [];
//     let leftArrInd = 0;
//     let rightArrInd = 0;
    

//     setLeftArr([])
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     alert("LeftArr "+leftArr)

//     setRightArr([])
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     alert('rightArr '+rightArr)

//     setLeftIndex(leftArrInd);
//     setRightIndex(rightArrInd);

//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//     // Merge array
//     while (leftArrInd < left.length && rightArrInd < right.length) {

//       if (left[leftArrInd] <= right[rightArrInd]) {
//         temp.push(left[leftArrInd]);
//         alert('temp '+temp)
//         leftArrInd++;
//       } else 
//       if(left[leftArrInd] > right[rightArrInd]){
//         alert('temp '+temp)
//         temp.push(right[rightArrInd]);
//         rightArrInd++;
//       }

//       // Only update indices after a change to avoid unnecessary updates
//       setLeftIndex(leftArrInd);
//       setRightIndex(rightArrInd);

//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay

//       alert(temp)
//     }
  
//     // Add remaining elements from the left array
//     while (leftArrInd < left.length) {
//       temp.push(left[leftArrInd]);
//       alert('temp '+temp)
//       leftArrInd++;
//       setLeftIndex(leftArrInd); // Update left index
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     }

//     // Add remaining elements from the right array
//     while (rightArrInd < right.length) {
//       temp.push(right[rightArrInd]);
//       alert('temp '+temp)
//       rightArrInd++;
//       setRightIndex(rightArrInd); // Update right index
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//     }
  
//     // Now update the main array with the merged result
//     let newArr = [...arr];
//     alert('temp '+temp)
//     for (let i = 0; i < temp.length; i++) {
//       newArr[low + i] = temp[i];
//     }
  
//     // Update the array once after merging
//     setArr(newArr);
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Visualize delay
//   };
  

const merge = async (arr, low, mid, high) => {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);
    let temp = [];
    let leftArrInd = 0;
    let rightArrInd = 0;
  
    // Visualize the subarrays
    setLow(low)
    setHigh(high)
    await new Promise((resolve) => setTimeout(resolve, 1000));


    setLeftArr(left);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    setRightArr(right);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    setLeftIndex(leftArrInd);
    setRightIndex(rightArrInd);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Merge arrays
    while (leftArrInd < left.length && rightArrInd < right.length) {
      if (left[leftArrInd] <= right[rightArrInd]) {
        temp.push(left[leftArrInd]);
        leftArrInd++;
      } else {
        temp.push(right[rightArrInd]);
        rightArrInd++;
      }
  
      setLeftIndex(leftArrInd);
      setRightIndex(rightArrInd);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    // Add remaining elements from left array
    while (leftArrInd < left.length) {
      temp.push(left[leftArrInd]);
      leftArrInd++;
      setLeftIndex(leftArrInd);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    // Add remaining elements from right array
    while (rightArrInd < right.length) {
      temp.push(right[rightArrInd]);
      rightArrInd++;
      setRightIndex(rightArrInd);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    // Update the main array with merged result
    for (let i = 0; i < temp.length; i++) {
      arr[low + i] = temp[i];
      // Create a new array reference for React state update
      const newArr = [...arr];
      setArr(newArr);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
}  

  const handleMergeSort = async () => {
    if (!arr.length) {
      toast.error("Please submit the array first!");
      return;
    }
    await MS(0, arr.length - 1, arr); // Start sorting from the full array
    toast.success("Merge Sort Completed!");
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Merge Sort</h1>
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
            onClick={handleMergeSort}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Start Sorting
          </button>
        </div>

      <div className="flex flex-row gap-8 mt-16 self-center">
        {arr.map((val, index) => (
          <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
            {index === mid && (
              <div>
                <span>Mid</span> <FaArrowDown size={20} color="green" />
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

      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-row gap-8 mt-16 self-center">
          {leftArr.map((val, index) => (
            <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
              {index === leftIndex && (
                <div>
                  <span>LeftIndex</span> <FaArrowDown size={20} color="black" />
                </div>
              )}
              <span
                className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-8 mt-16 self-center">
          {rightArr.map((val, index) => (
            <div key={index} className="p-2 flex flex-col gap-[10px] items-center">
              <span
                className={`rounded shadow bg-gray-200 w-10 h-10 flex items-center justify-center `}
              >
                {val}
              </span>
              {index === rightIndex && (
                <div>
                  <span>rightIndex</span> <FaArrowUp size={20} color="orange" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default MergeSort;
