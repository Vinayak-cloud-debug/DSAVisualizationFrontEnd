// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Ring = ({ radius, color }) => (
//   <div 
//     className="absolute rounded-full border-8"
//     style={{
//       width: `${radius}px`,
//       height: `${radius}px`,
//       borderColor: color,
//       boxShadow: `0 0 10px ${color}`,
//     }}
//   />
// );

// const Home = () => {

  
//   const navigate = useNavigate();
//   // // Define each ring's properties with fixed pixel sizes
//   // const rings = [
//   //   { radius: 50, color: '#3B82F6' },  // Blue - innermost ring
//   //   { radius: 120, color: '#10B981' },  // Green - second ring
//   //   { radius: 170, color: '#EC4899' },  // Pink - third ring
//   //   { radius: 220, color: '#F97316' },  // Orange - fourth ring
//   //   { radius: 270, color: '#A855F7' },  // Purple - fifth ring
//   //   { radius: 320, color: '#F43F5E' }   // Rose - outermost ring
//   // ];

//   // const orbitElements = [
//   //   { name: 'Arrays', icon: <Package />, ringIndex: 0, duration: '20s', nodeColor: 'bg-blue-500' },
//   //   { name: 'Linked List', icon: <Link />, ringIndex: 1, duration: '25s', nodeColor: 'bg-green-500' },
//   //   { name: 'Heaps', icon: <GitBranch />, ringIndex: 2, duration: '30s', nodeColor: 'bg-pink-500' },
//   //   { name: 'Stacks', icon: <BarChart2 />, ringIndex: 3, duration: '35s', nodeColor: 'bg-orange-500' },
//   //   { name: 'Binary Tree', icon: <Binary />, ringIndex: 4, duration: '40s', nodeColor: 'bg-purple-500' },
//   //   { name: 'Graph', icon: <Share2 />, ringIndex: 5, duration: '45s', nodeColor: 'bg-rose-500' }
//   // ];

//   const [blink,setBlink] = useState(0);

//   const selectedBlink = (id) => {

//     setBlink(id)

    

//     if(id == 1)
//       navigate('/QuickSortAlgo');
//     if(id == 2)
//       navigate('/MergeSortAlgo');
//     if(id == 3)
//       navigate('/BubbleSortAlgo');
//     if(id == 4)
//       navigate('/InsertionSortAlgo');
//     if(id == 5)
//       navigate('/SelectionSortAlgo');
//     if(id == 6)
//       navigate('/BSAlgo');
//     if(id >= 7 && id <= 12){
//       sessionStorage.setItem('id', id);
//       navigate('/Graph');
//     }
    
//   }

//   var concept1  = [
    
//     {id:1,text:'Quick Sort'},
//     {id:2,text:'Merge Sort'},
//     {id:3,text:'Bubble Sort'},
//     {id:4,text:'Insertion Sort'},
//     {id:5,text:'Selection Sort'},
//     {id:6,text:'Binary Search'},

//   ]

//   var concept2  = [
    
//     {id:7,text:'DFS'},
//     {id:8,text:'BFS'},
//     {id:9,text:'Dijkstras Algorithm'},
//     // {id:4,text:'Bellman Ford Algorithm'},
//     // {id:5,text:'Floyd Warshall Algorithm'},
//     {id:10,text:'Kruskal Algorithm'},
//     // {id:5,text:''},
//     {id:11,text:'Topological Sort'},
//     {id:12,text:'Prims Algorithm'}


//   ]



//   return (

//     <div className="bg-gray-900 w-full min-h-screen flex flex-col items-center overflow-hidden px-4 py-6">
//   {/* Title */}
//   <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#da6334] mt-4">
//     Algo Vision
//   </h1>

//   {/* Main Content */}
//   <div className="flex flex-col lg:flex-row items-center justify-center w-full mt-10 space-y-10 lg:space-y-0 lg:space-x-20 px-2">
    
//     {/* Text Section */}
//     <div className="flex flex-col gap-8 items-center w-full lg:w-auto justify-center">
      
//       {/* Sorting Algorithms */}
//       <div className="w-full max-w-3xl">
//         <h2 className="font-medium text-white text-lg sm:text-xl mb-4 ml-3">Sorting Algorithms</h2>
//         <div className="flex flex-wrap gap-4 justify-center">
//           {concept1.map((item) => (
//             <div key={item.id} className="relative w-36 h-12 hover:border-2 hover:border-[#da6334] rounded-lg bg-[#0e1716] flex items-center justify-center">
//               <h1 
//                 onClick={() => selectedBlink(item.id)}
//                 className="text-sm sm:text-base font-semibold text-white cursor-pointer"
//               >
//                 {item.text}
//               </h1>
//               {blink === item.id && (
//                 <div className="absolute bottom-0 w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate]" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Graph Algorithms */}
//       <div className="w-full max-w-3xl">
//         <h2 className="font-medium text-white text-lg sm:text-xl mb-4 ml-3">Graph Algorithms</h2>
//         <div className="flex flex-wrap gap-4 justify-center">
//           {concept2.map((item) => (
//             <div key={item.id} className="relative w-36 h-12 hover:border-2 hover:border-[#da6334] rounded-lg bg-[#0e1716] flex items-center justify-center">
//               <h1 
//                 onClick={() => selectedBlink(item.id)}
//                 className="text-sm sm:text-base font-semibold text-white cursor-pointer"
//               >
//                 {item.text}
//               </h1>
//               {blink === item.id && (
//                 <div className="absolute bottom-0 w-full h-0.5 bg-green-400 animate-[glitter_0.5s_infinite_alternate]" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>

//   <style>
//     {`
//       @keyframes spin {
//         from { transform: rotate(0deg); }
//         to { transform: rotate(360deg); }
//       }
//       @keyframes counter-spin {
//         from { transform: rotate(360deg) translateX(-50%); }
//         to { transform: rotate(0deg) translateX(-50%); }
//       }
//     `}
//   </style>
// </div>

  
  
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, GitMerge, Shuffle, ArrowDownUp, Filter, Search, 
         Network, GitBranch, Activity, Navigation, Diamond, Share2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [blink, setBlink] = useState(0);
  const [activeCategory, setActiveCategory] = useState('sorting');
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  
  // Generate random particles for the background
  useEffect(() => {
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.1
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

  const selectedBlink = (id) => {
    setBlink(id);
    
    // Navigation logic
    if(id === 1) navigate('/QuickSortAlgo');
    else if(id === 2) navigate('/MergeSortAlgo');
    else if(id === 3) navigate('/BubbleSortAlgo');
    else if(id === 4) navigate('/InsertionSortAlgo');
    else if(id === 5) navigate('/SelectionSortAlgo');
    else if(id === 6) navigate('/BSAlgo');
    else if(id >= 7 && id <= 12) {
      sessionStorage.setItem('id', id);
      navigate('/Graph');
    }
  };

  const sortingAlgorithms = [
    { id: 1, text: 'Quick Sort', icon: <Shuffle size={18} /> },
    { id: 2, text: 'Merge Sort', icon: <GitMerge size={18} /> },
    { id: 3, text: 'Bubble Sort', icon: <ArrowDownUp size={18} /> },
    { id: 4, text: 'Insertion Sort', icon: <Filter size={18} /> },
    { id: 5, text: 'Selection Sort', icon: <Filter size={18} /> },
    { id: 6, text: 'Binary Search', icon: <Search size={18} /> },
  ];

  const graphAlgorithms = [
    { id: 7, text: 'DFS', icon: <GitBranch size={18} /> },
    { id: 8, text: 'BFS', icon: <Network size={18} /> },
    { id: 9, text: 'Dijkstra\'s Algorithm', icon: <Navigation size={18} /> },
    { id: 10, text: 'Kruskal Algorithm', icon: <Share2 size={18} /> },
    { id: 11, text: 'Topological Sort', icon: <Activity size={18} /> },
    { id: 12, text: 'Prim\'s Algorithm', icon: <Diamond size={18} /> }
  ];

  // Get current algorithm set based on active category
  const currentAlgorithms = activeCategory === 'sorting' ? sortingAlgorithms : graphAlgorithms;

  return (
    <div className="relative bg-gray-950 w-full min-h-screen flex flex-col items-center overflow-hidden px-4 py-8">
      {/* Background particles */}
      {/* {backgroundParticles.map((particle, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(1px)'
          }}
        />
      ))} */}
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950 to-gray-950 z-0"></div>
      
      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Header with animated glow */}
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 mt-4 pb-2">
            AlgoVision
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <p className="text-gray-400 text-center mt-4 max-w-xl">
            Interactive visualizations for common algorithms and data structures
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center mt-12 mb-8 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm border border-gray-800">
          <button 
            onClick={() => setActiveCategory('sorting')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'sorting' 
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code size={18} />
            <span>Sorting Algorithms</span>
          </button>
          
          <button 
            onClick={() => setActiveCategory('graph')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'graph' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Network size={18} />
            <span>Graph Algorithms</span>
          </button>
        </div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {currentAlgorithms.map((item) => (
            <div 
              key={item.id}
              onClick={() => selectedBlink(item.id)}
              className={`relative overflow-hidden group backdrop-blur-sm cursor-pointer
                transition-all duration-300 rounded-xl
                border ${blink === item.id ? 'border-orange-500' : 'border-gray-800/50'}
                bg-gray-900/30 hover:bg-gray-900/50
                flex flex-col items-center justify-center p-6 h-32
                ${blink === item.id ? 'shadow-lg shadow-orange-500/20' : ''}
              `}
            >
              {/* Hover effect gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-red-600/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with glow effect */}
              <div className={`p-3 rounded-full mb-3 ${
                blink === item.id 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-gray-800 text-gray-400 group-hover:text-white'
              } transition-all duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-base font-medium text-gray-100 group-hover:text-white transition-colors">
                {item.text}
              </h3>
              
              {/* Active indicator */}
              {blink === item.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer credit */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>© 2025 AlgoVision - Visualize to Understand</p>
        </div>
      </div>
    </div>
  );
};

export default Home;