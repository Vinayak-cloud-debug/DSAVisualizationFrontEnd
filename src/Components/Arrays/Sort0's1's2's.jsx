

import { ArrowDownCircle, Code, Info, PlayCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SortZeroOneTwo = () => {

  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [sortedArrayIndex, setSortedArrayIndex] = useState([]);
  const [leftSwapIndex, setLeftSwapIndex] = useState(-1);
  const [rightSwapIndex, setRightSwapIndex] = useState(-1);
  
  const [leftIndex,setLeftIndex] = useState(-1);
  const [rightIndex,setRightIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

  // Generate random particles for the background
  useEffect(() => {
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      color: `rgba(${Math.random() * 50 + 50}, ${Math.random() * 100 + 100}, ${Math.random() * 150 + 100}, ${Math.random() * 0.3 + 0.1})`
    }));
    setBackgroundParticles(particles);
  }, []);

  // Animation frame for particles
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 100
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => setInputValue(e.target.value);
const generateRandomArray = () => {
  if (!arrSize || arrSize <= 0 || arrSize > 15) {
    toast.error("Please enter a valid array size between 1 and 15");
    return;
  }

   const MAX_VALUE = 100; // Set your desired maximum value here

  const randomArray = Array.from({ length: arrSize }, () =>
    Math.floor(Math.random() * (MAX_VALUE + 1)) // 0 to MAX_VALUE
  );

  setArr(randomArray);
  setInputValue(randomArray.join(' '));
  setSortedArrayIndex([]);
  setLeftIndex(-1);
  setRightIndex(-1);
  toast.success("Random array of non-negative integers generated!");
};


  const handleSubmit = () => {


    
    window.scrollBy({
      top: 1200,
      behavior: 'smooth'
    })
    
    if (!arrSize || arrSize <= 0) {
      toast.error("Please enter a valid array size");
      return;
    }
    
    const elements = inputValue.trim().split(/\s+/).map(Number);
    
    if (elements.some(isNaN)) {
      toast.error("Please enter valid numbers");
      return;
    }
    
    if (elements.length !== arrSize) {
      toast.error(`Please enter exactly ${arrSize} elements.`);
      return;
    }
    
    setArr(elements);
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    
    toast.success("Array initialized successfully!");
  };

  const handlestartSlidingWindow = async () => {
    let newArr = [...arr];


    setSortedArrayIndex([]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    

    for(let i = 0; i<2; i++){

        let right = newArr.length-1;

        setRightIndex(right);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        while(newArr[right]!=i){
            
            right--;
            setRightIndex(right)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }


        let left = right-1;
        setLeftIndex(left);
        await new Promise((resolve) => setTimeout(resolve, 1000));


        while(left >= 0){

            if(newArr[left] > i){
                setLeftSwapIndex(left);
                setRightSwapIndex(right);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let temp = newArr[left];
                newArr[left] = newArr[right];
                newArr[right] = temp;
                right--;
                setRightIndex(right)
                setArr([...newArr])

                await new Promise((resolve) => setTimeout(resolve, 1000));

                setLeftSwapIndex(-1);
                setRightSwapIndex(-1);
                await new Promise((resolve) => setTimeout(resolve, 500));


            }

            left--;
            setLeftIndex(left)
            
            await new Promise((resolve) => setTimeout(resolve, 1000));

        }
    }

    setLeftIndex(0);
    setRightIndex(newArr.length-1);
    await new Promise((resolve) => setTimeout(resolve, 1000));


    for(let i = 0; i<newArr.length; i++){
        setSortedArrayIndex((prev) => [...prev,i])
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }



  };

  const startSlidingWindow = async () => {
    if (!arr.length) {
      toast.error("Please submit an array first!");
      return;
    }
    
    setIsSorting(true);
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    
    
    await handlestartSlidingWindow();
    
    
    toast.success("Sliding Window  Completed!");
    setIsSorting(false);
  };

  const resetArray = () => {
    if (isSorting) return;
    
    setArr([]);
    setInputValue('');
    setSortedArrayIndex([]);
    setLeftIndex(-1);
    setRightIndex(-1);
    toast.success("Reset successful!");
  };

  // Pseudo code for bubble sort
  const bubbleSortCode = `function ZeroesToEnd(nums):
      
    

      while(newArr[left]){ // until and unless we dont find a zero move ahead
        left++;
        
    


    let right = left+1;
    setRightIndex(right)
    await new Promise((resolve) => setTimeout(resolve, 1000));


    while(right < newArr.length){

        if(newArr[right]){
            
            swap(nums[left],nums[right])
            left++;
        }

        right++;
    }
        
    return nums;
  }
    `;

  // Algorithm info
  const algorithmInfo = `
  Best, Average, Worst Case: O(n)

  The entire array is traversed once with constant-time updates to the sum.
  O(1)

  Space Complexity: O(1)

  Here we find the first zero using left pointer and take right pointer to move ahead , so  moving ahead 
  if we find a non-zero element we then swap values in left and right pointer.

  `;
    
  const Close = () => {

    setWindowWidth(1000);

  }
  return (
    <div className="relative z-10 flex flex-col bg-gray-950 min-h-screen w-full px-4 py-8 overflow-hidden">
      {/* Background particles */}


      {windowWidth < 500 ?
      <div className="max-w-sm absolute z-40 ml-5 mt-10 bg-gray-800 text-gray-200 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          For Better View
        </h2>
        <p className="text-sm sm:text-base">Please rotate your phone to landscape mode.</p>
        <p onClick={Close} className='w-20 h-7 mt-7 cursor-pointer hover:bg-slate-700 ring-1 ring-slate-700 text-center rounded-xl'>Close</p>
      </div>
      :null}

      {backgroundParticles.map((particle, i) => (
        <div 
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header with animated border */}
        <div className="relative mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-green-600">
            Move Zeroes to the End
          </h1>
          <div className="mt-2 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
          <p className="text-gray-400 text-center mt-3  lg:max-w-2xl">
            Visualize how using two pointers we can move all the zeroes to the end
          </p>
        </div>

        {/* Input Section - Glass morphism card */}
        <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-800 rounded-xl p-6 w-full max-w-3xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Array Size <span className="text-gray-500">(max 15)</span></label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="15"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter size"
                  onChange={(e) => setArrSize(parseInt(e.target.value, 10))}
                  disabled={isSorting}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-300 text-sm font-medium">Array Elements</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter elements separated by space (e.g., 1 5 3 5 4 2)"
                  value={inputValue}
                  onChange={handleInput}
                  disabled={isSorting}
                />
              </div>

              
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSorting}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-emerald-700/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} className={isSorting ? "animate-spin" : ""} />
              Initialize Array
            </button>
            
            <button
              onClick={generateRandomArray}
              disabled={isSorting || !arrSize}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-700/20 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Random Array
            </button>
            
            <button
              onClick={startSlidingWindow}
              disabled={isSorting || arr.length === 0}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium flex items-center gap-2 shadow-lg shadow-purple-700/20 transition-all disabled:opacity-50"
            >
              <PlayCircle size={18} />
              {isSorting ? "Finding Max Sum..." : "Start"}
            </button>
            
            <button
              onClick={resetArray}
              disabled={isSorting}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw size={18} />
              Reset
            </button>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 transition-all"
              >
                <Info size={18} />
                {showInfo ? "Hide Info" : "Algorithm Info"}
              </button>

              <button
                onClick={() => setShowCode(!showCode)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 transition-all"
              >
                <Code size={18} />
                {showCode ? "Hide Code" : "Show Code"}
              </button>
            </div>
          </div>
        </div>

        {/* Information and Code Sections */}
        <div className="w-full max-w-3xl mb-8 space-y-4">
          {/* Algorithm Info */}
          {showInfo && (
            <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full overflow-x-auto">
              <h3 className="text-lg font-medium text-emerald-400 mb-3">About Moving Zeroes to end</h3>
              <div className="text-gray-300 text-sm whitespace-pre-line">
                {algorithmInfo}
              </div>
            </div>
          )}
          
          {/* Code Section */}
          {showCode && (
            <div className="backdrop-blur-sm bg-gray-900/70 border border-gray-800 rounded-xl p-4 w-full overflow-x-auto">
              <h3 className="text-lg font-medium text-emerald-400 mb-3">Pseudo Code</h3>
              <pre className="text-gray-300 font-mono text-sm">
                {bubbleSortCode}
              </pre>
            </div>
          )}
        </div>

        {/* Visualization Section */}
        {arr.length > 0 && (
          <div className="backdrop-blur-sm bg-gray-900/30 border border-gray-800 rounded-xl p-6 w-full max-w-4xl mt-4">
            <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isSorting ? "bg-purple-500 animate-pulse" : "bg-green-500"}`}></span>
              Visualization {isSorting && <span className="text-purple-400 ml-2">(in progress...)</span>}
            </h3>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-gray-300 text-xs"> Elements b/w L & R</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300 text-xs">Left Element (l)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-gray-300 text-xs">Right Element (r)</span>
              </div>
            </div>
            
            {/* Array visualization */}
             <div className="flex flex-wrap justify-center  mt-8 pb-20 relative">
                          {arr.map((val, index) => {
                            const isSorted = sortedArrayIndex.includes(index);
                            const isLeft = index === leftIndex;
                            const isRight = index === rightIndex;
            
                            return (
                              <div
                                key={index}
                                className="flex flex-col items-center  relative my-8"
                              >
                                {/* Index number */}
                                <div className="text-gray-500 text-xs mb-1">{index}</div>
            
                                {/* Left Comparison Indicator */}
                                {isLeft && (
                                  <div className="absolute -top-14 flex flex-col items-center">
                                    <span className="text-blue-400 text-sm font-medium mb-1">l</span>
                                    <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
                                    <ArrowDownCircle size={20} className="text-blue-500" />
                                  </div>
                                )}
                                
                                {/* Right Comparison Indicator */}
                                {isRight && (
                                  <div className="absolute -top-14 flex flex-col items-center">
                                    <span className="text-purple-400 text-sm font-medium mb-1">r</span>
                                    <div className="h-8 w-px bg-gradient-to-b from-purple-500 to-transparent"></div>
                                    <ArrowDownCircle size={20} className="text-purple-500" />
                                  </div>
                                )}
            
            
                                {/* Value Box with glass effect */}
                                <div className={`relative backdrop-blur-sm  shadow-lg w-20 h-16 items-center  justify-center  border-emerald-500 
                              ${sortedArrayIndex.length === 1 && sortedArrayIndex[0] === index
                                  ? 'border-2 rounded-lg'
                                  : sortedArrayIndex.length > 1 && sortedArrayIndex[0] === index
                                  ? 'border-t-2 border-l-2 border-b-2 rounded-l-lg'
                                  : sortedArrayIndex.length > 1 &&
                                    sortedArrayIndex[sortedArrayIndex.length - 1] === index
                                  ? 'border-t-2 border-r-2 border-b-2 rounded-r-lg'
                                  : sortedArrayIndex.includes(index)
                                  ? 'border-t-2 border-b-2'
                                  : '' } `}>
                                    <div
                                  className={`relative rounded-lg ml-3 mt-0.5  backdrop-blur-sm shadow-lg w-14 h-14 text-xl font-medium flex items-center justify-center transition-all duration-300 overflow-hidden
                                    ${isSorted || sortedArrayIndex.includes(index)
                                        ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-300 shadow-emerald-500/30"
                                        : leftSwapIndex === index ? 'bg-blue-800/50 border border-blue-700 text-gray-300' : rightSwapIndex === index ? 'bg-red-800/50 border border-red-700 text-gray-300' : "bg-gray-800/50 border border-gray-700 text-gray-300"
                                    }`}
                                >
                                
                                  <span className="relative z-10">{val}</span>
                                </div>
                                </div>
                                
                                {/* Connection line between compared elements */}
                                {isLeft && arr[index + 1] !== undefined && index + 1 === rightIndex && (
                                  <div className="absolute top-1/2 left-[calc(100%_-_7px)] w-[calc(100%_+_6px)] h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                )}
                              </div>
                            );
                          })}
                        </div>

            
          </div>
        )}
      </div>

      {/* Custom styled toast container */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            borderRadius: '8px',
          },
        }}
      />
    </div>

  );
};

export default SortZeroOneTwo;