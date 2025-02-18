

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const SpiralMatrix = () => {

  const [matrix,setMatrix] = useState([[1,2,3,4],[7,8,9,10],[13,14,15,16],[19,20,21,22]])
  const [SpiralValues,setSpiralValues] = useState([])
  

  useEffect(()=>{

  },[SpiralValues])

  const BlinkSpiralMatrix = async()=>{



    let top = 0,bottom = 3;
    let right = 3,left = 0;
    // Traverse the matrix in spiral order
    while (top <= bottom && left <= right) {

        // Traverse from left to right
        for (let i = left; i <= right; ++i) {
            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[top][i]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            // setSpiralValues([])
            // await new Promise((resolve) => setTimeout(resolve, 500));


        }

        top++;
        
        // Traverse from top to bottom
        for (let i = top; i <= bottom; ++i) {
            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[i][right]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            
            // setSpiralValues([])
            // await new Promise((resolve) => setTimeout(resolve, 500));

        }
        right--;
        
        // Traverse from right to left
        if (top <= bottom) {
            for (let i = right; i >= left; --i) {
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[bottom][i]]);
                await new Promise((resolve) => setTimeout(resolve, 300));

                
            // setSpiralValues([])
            // await new Promise((resolve) => setTimeout(resolve, 500));

            }
            bottom--;
        }
        
        // Traverse from bottom to top
        if (left <= right) {
            for (let i = bottom; i >= top; --i) {
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[i][left]]);
                await new Promise((resolve) => setTimeout(resolve, 300));

                
            // setSpiralValues([])
            // await new Promise((resolve) => setTimeout(resolve, 500));

            }
            left++;
        }
    }

   

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpiralValues((prev) => [...prev]); // Ensure initial re-render

    while (true) {
      let isEmpty = false;

      setSpiralValues((prev) => {
        if (prev.length === 0) {
          isEmpty = true; // Stop the loop if array is empty
          return prev;
        }
        return prev.slice(0, -1); // Remove the last element
      });

      if (isEmpty) break; // Exit the loop if the array is empty

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay between pops
    }
      


  }


  const BlinkZigZagHorizontalMatrix = async()=>{



    for(let i=0; i<4; i++){

        for(let j=0; j<4; j++){

            if(i%2 === 0){
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[i][j]]);
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
            else{
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[i][3-j]]);
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
                

        }
    }
    
   
   

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpiralValues((prev) => [...prev]); // Ensure initial re-render

    while (true) {
      let isEmpty = false;

      setSpiralValues((prev) => {
        if (prev.length === 0) {
          isEmpty = true; // Stop the loop if array is empty
          return prev;
        }
        return prev.slice(0, -1); // Remove the last element
      });

      if (isEmpty) break; // Exit the loop if the array is empty

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay between pops
    }
      


  }

  
  const BlinkZigZagVerticalMatrix = async()=>{



    for(let j=0; j<4; j++){

        for(let i=0; i<4; i++){

            if(j%2 === 0){
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[i][j]]);
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
            else{
                setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[3-i][j]]);
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
                

        }
    }
    
   
   

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpiralValues((prev) => [...prev]); // Ensure initial re-render

    while (true) {
      let isEmpty = false;

      setSpiralValues((prev) => {
        if (prev.length === 0) {
          isEmpty = true; // Stop the loop if array is empty
          return prev;
        }
        return prev.slice(0, -1); // Remove the last element
      });

      if (isEmpty) break; // Exit the loop if the array is empty

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay between pops
    }
      


  }


  
  const BlinkCrossBottomUpMatrix = async()=>{



    for(let i=0; i<4; i++){

        let j=0;
        let k = i;
        while(k>=0 && j<=3){

            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[k][j]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            k--;
            j++;

        }
    }

    for(let i=1; i<=3; i++){

        let j=i;
        let k = 3;
        while(k>=0 && j<=3){

            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[k][j]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            k--;
            j++;

        }
    }
    


    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpiralValues((prev) => [...prev]); // Ensure initial re-render

    while (true) {
      let isEmpty = false;

      setSpiralValues((prev) => {
        if (prev.length === 0) {
          isEmpty = true; // Stop the loop if array is empty
          return prev;
        }
        return prev.slice(0, -1); // Remove the last element
      });

      if (isEmpty) break; // Exit the loop if the array is empty

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay between pops
    }



  }
    
  const BlinkCrossUpBottomMatrix = async()=>{



    
    for(let i=3; i>=1; i--){

        let j=i;
        let k = 3;
        while(k>=0 && j<=3){

            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[k][j]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            k--;
            j++;

        }
    }


    for(let i=3; i>=0; i--){

        let j=0;
        let k = i;
        while(k>=0 && j<=3){

            setSpiralValues((prevSpiralValues) =>[...prevSpiralValues,matrix[k][j]]);
            await new Promise((resolve) => setTimeout(resolve, 300));

            k--;
            j++;

        }
    }

    


    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpiralValues((prev) => [...prev]); // Ensure initial re-render

    while (true) {
      let isEmpty = false;

      setSpiralValues((prev) => {
        if (prev.length === 0) {
          isEmpty = true; // Stop the loop if array is empty
          return prev;
        }
        return prev.slice(0, -1); // Remove the last element
      });

      if (isEmpty) break; // Exit the loop if the array is empty

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay between pops
    }
      


  }



  return (
    <div className="flex flex-col self-center gap-5">
 
 <div  className="flex flex-col gap-8 mt-16 self-center">

 {matrix.map((row, index) => (


        <div key={index} className="p-2 flex flex-row gap-[20px] items-center relative">

            {row.map((val,index)=>(


                    <span key = {index} className={`rounded shadow bg-gray-200 w-10 h-10 font-bold
                     flex items-center justify-center ${SpiralValues.includes(val) ? 'bg-green-500 text-white' : ''}`}>
                    {val}
                    </span>
                    
            ))}
        </div>

    ))}
      </div>

        <div className='flex flex-row gap-14 self-center'>
            <button
                onClick={BlinkSpiralMatrix}
                className="px-4 py-2 w-40 h-10 self-center bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                Start Spiral Blink
                </button>

                <button
                onClick={BlinkZigZagHorizontalMatrix}
                className="px-4 py-2 w-60 h-10 self-center bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                Start ZigZag Horizontal Blink
                </button>

                <button
                onClick={BlinkZigZagVerticalMatrix}
                className="px-4 py-2 w-60 h-10 self-center bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                Start ZigZag Vertical Blink
                </button>

                <button
                onClick={BlinkCrossBottomUpMatrix}
                className="px-4 py-2 w-64 h-10 self-center bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                Start Cross Bottom to Up Blink
                </button>

                <button
                onClick={BlinkCrossUpBottomMatrix}
                className="px-4 py-2 w-64 h-10 self-center bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                Start Cross Up to Bottom Blink
                </button>
        </div>

      <Toaster />
    </div>
  );
};

export default SpiralMatrix;