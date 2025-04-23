import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  // // Define each ring's properties with fixed pixel sizes
  // const rings = [
  //   { radius: 50, color: '#3B82F6' },  // Blue - innermost ring
  //   { radius: 120, color: '#10B981' },  // Green - second ring
  //   { radius: 170, color: '#EC4899' },  // Pink - third ring
  //   { radius: 220, color: '#F97316' },  // Orange - fourth ring
  //   { radius: 270, color: '#A855F7' },  // Purple - fifth ring
  //   { radius: 320, color: '#F43F5E' }   // Rose - outermost ring
  // ];

  // const orbitElements = [
  //   { name: 'Arrays', icon: <Package />, ringIndex: 0, duration: '20s', nodeColor: 'bg-blue-500' },
  //   { name: 'Linked List', icon: <Link />, ringIndex: 1, duration: '25s', nodeColor: 'bg-green-500' },
  //   { name: 'Heaps', icon: <GitBranch />, ringIndex: 2, duration: '30s', nodeColor: 'bg-pink-500' },
  //   { name: 'Stacks', icon: <BarChart2 />, ringIndex: 3, duration: '35s', nodeColor: 'bg-orange-500' },
  //   { name: 'Binary Tree', icon: <Binary />, ringIndex: 4, duration: '40s', nodeColor: 'bg-purple-500' },
  //   { name: 'Graph', icon: <Share2 />, ringIndex: 5, duration: '45s', nodeColor: 'bg-rose-500' }
  // ];

  const [blink,setBlink] = useState(0);

  const selectedBlink = (id) => {

    setBlink(id)

    const navigate = useNavigate();
    

    if(id == 1)
      navigate('/QuickSortAlgo');
    if(id == 2)
      navigate('/MergeSortAlgo');
    if(id == 3)
      navigate('/BubbleSortAlgo');
    if(id == 4)
      navigate('/InsertionSortAlgo');
    if(id == 5)
      navigate('/SelectionSortAlgo');
    if(id == 6)
      navigate('/BSAlgo');
    if(id >= 7 && id <= 12){
      sessionStorage.setItem('id', id);
      navigate('/Graph');
    }
    
  }

  var concept1  = [
    
    {id:1,text:'Quick Sort'},
    {id:2,text:'Merge Sort'},
    {id:3,text:'Bubble Sort'},
    {id:4,text:'Insertion Sort'},
    {id:5,text:'Selection Sort'},
    {id:6,text:'Binary Search'},

  ]

  var concept2  = [
    
    {id:7,text:'DFS'},
    {id:8,text:'BFS'},
    {id:9,text:'Dijkstras Algorithm'},
    // {id:4,text:'Bellman Ford Algorithm'},
    // {id:5,text:'Floyd Warshall Algorithm'},
    {id:10,text:'Kruskal Algorithm'},
    // {id:5,text:''},
    {id:11,text:'Topological Sort'},
    {id:12,text:'Prims Algorithm'}


  ]



  return (

    <div className="bg-gray-900 w-screen  min-h-[180vh] lg:min-h-screen flex flex-col items-center overflow-hidden px-4">
    {/* Title */}
    <h1 className="text-2xl font-bold text-center text-[#da6334] mt-5">Algo Vision</h1>
  
  
  
    {/* Main Content */}
    <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-10 space-y-5  lg:mt-20  lg:space-y-0 lg:space-x-72">
  
     
  
      {/* Text Section (Separated Below Solar System in Mobile) */}
      <div className="flex flex-col gap-5 lg:gap-16 items-center w-full lg:w-auto justify-center pt-10 lg:pt-0">
  
        <h1 className=' font-medium text-white self-start ml-3 text-lg'>Sorting Algorithms</h1>

        <div className="flex flex-row gap-4 items-center w-full  text-center">
          {concept1.map((item) => (
            <div key={item.id} className="inline-block relative w-[170px] h-[40px] hover:border-2 hover:border-[#da6334] rounded-lg bg-[#0e1716]">
              <h1 
                onClick={() => selectedBlink(item.id)}
                className="text-base font-semibold text-white mt-2 cursor-pointer"
              >
                {item.text}
              </h1>
              {blink === item.id && (
                <div className="w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate] mt-0.5"></div>
              )}
            </div>
          ))}
        </div>  


        <h1 className=' font-medium text-white self-start ml-3 text-lg'>Graph Algorithms</h1>

        <div className="flex flex-row gap-4 items-center w-full  text-center">
          {concept2.map((item) => (
            <div key={item.id} className="inline-block relative w-[170px] h-[40px] hover:border-2 hover:border-[#da6334] rounded-lg bg-[#0e1716]">
              <h1 
                onClick={() => selectedBlink(item.id)}
                className="text-base font-semibold text-white mt-2 cursor-pointer"
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

    <div className='mt-32'></div>

  </div>
  
  
  
  );
};

export default Home;


//  {/* Solar System */}
//  <div className="relative flex items-center justify-center w-full lg:w-auto min-h-[400px] lg:min-h-[600px]">
//  {rings.map((ring, index) => (
//    <Ring key={index} {...ring} />
//  ))}

//  Central DSA
//  <div className="absolute z-50 w-24 lg:w-32 h-24 lg:h-32 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-yellow-500/50">
//    <div className="text-gray-900 font-bold text-lg lg:text-2xl flex flex-col items-center gap-2">
//      <Brain className="w-6 lg:w-8 h-6 lg:h-8" />
//      <span>DSA</span>
//    </div>
//  </div>

//  {/* Orbiting Elements */}
//  {orbitElements.map((item) => (
//    <div
//      key={item.name}
//      className="absolute"
//      style={{
//        width: `${rings[item.ringIndex].radius}px`,
//        height: `${rings[item.ringIndex].radius}px`,
//        animation: `spin ${item.duration} linear infinite`
//      }}
//    >
//      <div 
//        className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${item.nodeColor} 
//                    p-3 rounded-full text-white hover:scale-110 transition-transform 
//                    cursor-pointer flex flex-col items-center gap-1 z-20`}
//        style={{
//          animation: `counter-spin ${item.duration} linear infinite`,
//          boxShadow: `0 0 15px ${rings[item.ringIndex].color}`
//        }}
//      >
//        {item.icon}
//        <span className="text-xs whitespace-nowrap font-medium">{item.name}</span>
//      </div>
//    </div>
//  ))}
// </div>
