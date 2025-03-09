import React, { useEffect, useState } from 'react';
import { 
  GitBranch,
  BarChart2,
  Link,
  Binary,
  Share2,
  Package,
  Brain
} from 'lucide-react';
import LogOut from '../pages/LogOut/Logout'

const Ring = ({ radius, color }) => (
  <div 
    className="absolute rounded-full border-8"
    style={{
      width: `${radius}px`,
      height: `${radius}px`,
      borderColor: color,
      boxShadow: `0 0 10px ${color}`,
    }}
  />
);

const Home = () => {
  // Define each ring's properties with fixed pixel sizes
  const rings = [
    { radius: 50, color: '#3B82F6' },  // Blue - innermost ring
    { radius: 120, color: '#10B981' },  // Green - second ring
    { radius: 170, color: '#EC4899' },  // Pink - third ring
    { radius: 220, color: '#F97316' },  // Orange - fourth ring
    { radius: 270, color: '#A855F7' },  // Purple - fifth ring
    { radius: 320, color: '#F43F5E' }   // Rose - outermost ring
  ];

  const orbitElements = [
    { name: 'Arrays', icon: <Package />, ringIndex: 0, duration: '20s', nodeColor: 'bg-blue-500' },
    { name: 'Linked List', icon: <Link />, ringIndex: 1, duration: '25s', nodeColor: 'bg-green-500' },
    { name: 'Heaps', icon: <GitBranch />, ringIndex: 2, duration: '30s', nodeColor: 'bg-pink-500' },
    { name: 'Stacks', icon: <BarChart2 />, ringIndex: 3, duration: '35s', nodeColor: 'bg-orange-500' },
    { name: 'Binary Tree', icon: <Binary />, ringIndex: 4, duration: '40s', nodeColor: 'bg-purple-500' },
    { name: 'Graph', icon: <Share2 />, ringIndex: 5, duration: '45s', nodeColor: 'bg-rose-500' }
  ];

  const [blink,setBlink] = useState(0);

  const selectedBlink = (id) => {

    setBlink(id)


    if(id == 1)
      window.location.href = '/BSAlgo';
    if(id == 2)
      window.location.href = '/MergeSortAlgo';
    if(id == 3)
      window.location.href = '/BubbleSortAlgo';
    if(id == 4)
      window.location.href = '/InsertionSortAlgo';
    if(id == 5)
      window.location.href = '/MergeSort';
    if(id == 6)
      window.location.href = '/NumberOfPaths';
    if(id == 7)
      window.location.href = '/SelectionSortAlgo';
    if(id == 8)
      window.location.href = '/LeftRotateArray';
    if(id == 9)
      window.location.href = '/SecondLargestElement';
    if(id == 10)
      window.location.href = '/SpiralMatrix';
    if(id == 11)
      window.location.href = '/QuickSortAlgo';
    if(id == 12)
      window.location.href = '/TwoPointerAlgo';
    if(id == 13)
      window.location.href = '/LargestElement';
    if(id == 14)
      window.location.href = '/SmallestElement';
  }

  var concept1  = [
    
    {id:1,text:'Binary Search'},
    {id:2,text:'Merge Sort'},
    {id:3,text:'Bubble Sort'},
    {id:4,text:'Insertion Sort'},
    {id:5,text:'Merge Sort function'},
    {id:6,text:'Number Of Paths'},
    {id:7,text:'Selection Sort'},

    

  ]


  var concept2  = [
    
    
    {id:8,text:'LeftRotateArray'},
    {id:9,text:'Second Largest Element'},
    {id:10,text:'Spiral Matrix'},
    {id:11,text:'Quick Sort'},
    {id:12,text:'Two Pointer'},
    {id:13,text:'Largest Element'},
    {id:14,text:'Smallest Element'},
  ]


  


  return (

    <div className="bg-gray-900 w-screen min-h-[180vh] lg:min-h-screen flex flex-col items-center overflow-hidden px-4">
    {/* Title */}
    <h1 className="text-2xl font-bold text-center text-white mt-5">Algo Vision</h1>
  
    {/* Logout Button */}
    <div className="w-full flex  justify-end mt-4">
      <LogOut />
    </div>
  
    {/* Main Content */}
    <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-10 space-y-5  lg:mt-20  lg:space-y-0 lg:space-x-72">
  
      {/* Solar System */}
      <div className="relative flex items-center justify-center w-full lg:w-auto min-h-[400px] lg:min-h-[600px]">
        {rings.map((ring, index) => (
          <Ring key={index} {...ring} />
        ))}
  
        {/* Central DSA */}
        <div className="absolute z-50 w-24 lg:w-32 h-24 lg:h-32 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-yellow-500/50">
          <div className="text-gray-900 font-bold text-lg lg:text-2xl flex flex-col items-center gap-2">
            <Brain className="w-6 lg:w-8 h-6 lg:h-8" />
            <span>DSA</span>
          </div>
        </div>
  
        {/* Orbiting Elements */}
        {orbitElements.map((item) => (
          <div
            key={item.name}
            className="absolute"
            style={{
              width: `${rings[item.ringIndex].radius}px`,
              height: `${rings[item.ringIndex].radius}px`,
              animation: `spin ${item.duration} linear infinite`
            }}
          >
            <div 
              className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${item.nodeColor} 
                          p-3 rounded-full text-white hover:scale-110 transition-transform 
                          cursor-pointer flex flex-col items-center gap-1 z-20`}
              style={{
                animation: `counter-spin ${item.duration} linear infinite`,
                boxShadow: `0 0 15px ${rings[item.ringIndex].color}`
              }}
            >
              {item.icon}
              <span className="text-xs whitespace-nowrap font-medium">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
  
      {/* Text Section (Separated Below Solar System in Mobile) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full lg:w-auto justify-center pt-10 lg:pt-0">
  
        <div className="flex flex-col gap-8 items-center w-full lg:w-[300px] text-center">
          {concept1.map((item) => (
            <div key={item.id} className="inline-block relative">
              <h1 
                onClick={() => selectedBlink(item.id)}
                className="text-xl font-semibold text-white cursor-pointer"
              >
                {item.text}
              </h1>
              {blink === item.id && (
                <div className="w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate] mt-0.5"></div>
              )}
            </div>
          ))}
        </div>  
  
        <div className="flex flex-col gap-8 items-center w-full lg:w-[300px] text-center">
          {concept2.map((item) => (
            <div key={item.id} className="inline-block relative">
              <h1 
                onClick={() => selectedBlink(item.id)}
                className="text-xl font-semibold text-white cursor-pointer"
              >
                {item.text}
              </h1>
              {blink === item.id && (
                <div className="w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate] mt-0.5"></div>
              )}
            </div>
          ))}
        </div>  
  
      </div>
  
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counter-spin {
            from { transform: rotate(360deg) translateX(-50%); }
            to { transform: rotate(0deg) translateX(-50%); }
          }
        `}
      </style>
  
    </div>
  </div>
  
  
  
  );
};

export default Home;
