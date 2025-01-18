import React from 'react';
import { 
  GitBranch,
  BarChart2,
  Link,
  Binary,
  Share2,
  Package,
  Brain
} from 'lucide-react';

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

  return (
    <div className='bg-gray-900 mr-40 overflow-hidden min-h-screen w-screen '>
    <div className="  flex items-center mt-72 justify-center overflow-x-hidden overflow-y-hidden ">
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
  );
};

export default Home;