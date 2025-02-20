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
    { radius: 100, color: '#3B82F6' },  // Blue - innermost ring
    { radius: 180, color: '#10B981' },  // Green - second ring
    { radius: 260, color: '#EC4899' },  // Pink - third ring
    { radius: 340, color: '#F97316' },  // Orange - fourth ring
    { radius: 420, color: '#A855F7' },  // Purple - fifth ring
    { radius: 500, color: '#F43F5E' }   // Rose - outermost ring
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
  
  <div className='bg-gray-900 w-screen min-h-screen justify-center overflow-hidden'>
        <h1 className='text-2xl font-bold text-center text-white mt-5'>Algo Vision</h1>
        <div className="flex justify-end mr-32">
          <LogOut/>
        </div>


    <div className=' flex flex-row gap-[50px]    '>
      {/* Center content using flexbox */}

      

      <div className='w-[600px] h-[600px] bg-gray-900 mt-20 flex flex-row gap-[50px] items-center justify-center'>
          <div className='w-[300px] h-[600px] flex flex-col gap-[50px] items-center justify-center'>
          {concept1.map((item,index)=>
            <div key={item.id} className="inline-block relative">
              <h1 onClick={(e) => selectedBlink(item.id)} className="text-xl font-semibold text-white cursor-pointer">
                {item.text}
              </h1>
              {blink == item.id ? (
                <div className="w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate] mt-0.5"></div>
              ) : null}
            </div>
          )}
         
          </div>  

          <div className='w-[300px] h-[600px] flex flex-col gap-[50px] items-center justify-center'>
          {concept2.map((item,index)=>
            <div key={item.id} className="inline-block relative">
              <h1 onClick={(e) => selectedBlink(item.id)} className="text-xl font-semibold text-white cursor-pointer">
                {item.text}
              </h1>
              {blink == item.id ? (
                <div className="w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate] mt-0.5"></div>
              ) : null}
            </div>
          )}
         
          </div>  
      </div>

      <div className="flex items-center justify-center mt-96 left-40 w-full h-full relative">
        {/* All 6 physical rings */}
        {rings.map((ring, index) => (
          <Ring key={index} {...ring} />
        ))}

        {/* Central DSA Element */}
        <div className="absolute z-50 w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-yellow-500/50">
          <div className="text-gray-900 font-bold text-2xl flex flex-col items-center gap-2">
            <Brain className="w-8 h-8" />
            <span>DSA</span>
          </div>
        </div>

        {/* Orbiting Elements */}
        {orbitElements.map((item, index) => (
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

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes counter-spin {
            from { transform: rotate(360deg) translateX(-50%); }
            to { transform: rotate(0deg) translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  </div>
  );
};

export default Home;
