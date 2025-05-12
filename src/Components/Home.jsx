
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, GitMerge, Shuffle, ArrowDownUp, Filter, Search, 
         Network, GitBranch, Activity, Navigation, Diamond, Share2, 
         Grid2X2,
         ChartScatter,
         ArrowUpDown,
        
         } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [blink, setBlink] = useState(0);
  const [activeCategory, setActiveCategory] = useState('sorting');
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  
 

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
    else
    if(id == 13) {
      navigate('/MaximumSubarraySumWithSizeK');
    }
    else
    if(id == 14) {
      navigate('/LongestSubstringWithoutRepeatingCharacters');
    }
    else
    if(id == 15) {
      navigate('/MaximumConsecutiveOnes');
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

  
  const SlidingWindow = [
    { id: 13, text: 'Maximum Sum of Subarray with Size k', icon: <GitBranch size={18} /> },
    { id: 14, text: 'Longest Substring without Repeating Characters', icon: <Network size={18} /> },
    { id: 15, text: 'Maximum Consecutive Ones ', icon: <Navigation size={18} /> },
    
    
  ];



  const GridPaths = [
    { id: 17, text: 'Maximum Sum Path', icon: <GitBranch size={18} /> },
    { id: 18, text: 'Minimum Path Sum', icon: <Network size={18} /> },
    { id: 19, text: 'Count all the Paths in Grid', icon: <Navigation size={18} /> },
    { id: 20, text: 'Unique Paths', icon: <Share2 size={18} /> },
    { id: 21, text: 'Shortest Paths in a Grid', icon: <Share2 size={18} /> },

  ];

  const TwoPointer = [
    { id: 23, text: 'Kadane Algo', icon: <GitBranch size={18} /> },
    { id: 24, text: 'Two Number Sum Equals Target', icon: <Network size={18} /> },
  
  ];

  const BinarySearch = [
    { id: 25, text: 'Lower Bound', icon: <GitBranch size={18} /> },
    { id: 26, text: 'Upper Bound', icon: <Network size={18} /> },
    { id: 27, text: 'First Occurence of an element', icon: <Navigation size={18} /> },
    { id: 28, text: 'Last Occurence of an element', icon: <Share2 size={18} /> },
    { id: 29, text: 'Search in Rotated Sorted Array 1', icon: <Filter size={18} /> },
    { id: 30, text: 'Search in Rotated Sorted Array 2', icon: <Activity size={18} /> },
    { id: 31, text: 'Find Minimum Element with Constraints', icon: <Diamond size={18} /> },

   
  ];

  // Get current algorithm set based on active category
  const currentAlgorithms = activeCategory === 'sorting' ? sortingAlgorithms : activeCategory === 'graph' ? graphAlgorithms : activeCategory === 'slidingWindow' ?  SlidingWindow :  activeCategory === 'GridPaths' ?  GridPaths : activeCategory === 'TwoPointers' ? TwoPointer : BinarySearch;

  return (
    <div className="relative bg-gray-950 scroll-smooth w-full min-h-screen flex flex-col items-center overflow-hidden px-4 py-8">
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
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center mt-12 mb-8 bg-gray-900/50 p-1 rounded-xl backdrop-blur-sm border border-gray-800">
          <button 
            onClick={() => setActiveCategory('sorting')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'sorting' 
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code size={18} />
            <span>Sorting Algos</span>
          </button>
          
          <button 
            onClick={() => setActiveCategory('graph')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'graph' 
                ? 'bg-gradient-to-r from-red-600  to-orange-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ChartScatter size={18} />
            <span>Graph Algos</span>
          </button>

          <button 
            onClick={() => setActiveCategory('slidingWindow')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'slidingWindow' 
                ? 'bg-gradient-to-r from-red-600  to-orange-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ArrowDownUp size={18} />
            <span>Sliding Window </span>
          </button>

          <button 
            onClick={() => setActiveCategory('GridPaths')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'GridPaths' 
                ? 'bg-gradient-to-r from-red-600  to-orange-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Grid2X2 size={18} />
            <span>Grid Paths</span>
          </button>

          <button 
            onClick={() => setActiveCategory('TwoPointers')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'TwoPointers' 
                ? 'bg-gradient-to-r from-red-600  to-orange-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ArrowUpDown size={18} />
            <span>Two Pointers</span>
          </button>

          <button 
            onClick={() => setActiveCategory('BinarySearch')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeCategory === 'BinarySearch' 
                ? 'bg-gradient-to-r from-red-600  to-orange-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ArrowUpDown size={18} />
            <span>BS Algos</span>
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