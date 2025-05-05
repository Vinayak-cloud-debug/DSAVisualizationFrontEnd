import { useState } from 'react';
import toast from 'react-hot-toast';

export const useRandomGraph = (
  vertices: string,
  setEdges: React.Dispatch<React.SetStateAction<string[]>>,
  setWeights: React.Dispatch<React.SetStateAction<Record<string, number>>>
) => {
  // Generate a random graph based on number of vertices
  const generateRandomGraph = () => {
    if (!vertices || parseInt(vertices, 10) <= 0) {
      toast.error("Please enter a valid number of vertices first");
      return;
    }
    
    const vertexCount = parseInt(vertices, 10);
    
    // Clear existing edges
    setEdges([]);
    
    const newEdges: string[] = [];
    const newWeights: Record<string, number> = {};
    
    // Determine edge density - more vertices, lower density to avoid cluttering
    let density = 0.5;
    if (vertexCount > 10) density = 0.3;
    if (vertexCount > 20) density = 0.2;
    
    // First ensure graph connectivity - create a minimum spanning tree
    for (let i = 1; i < vertexCount; i++) {
      const from = i - 1;
      const to = i;
      const edge = `${from} ${to}`;
      newEdges.push(edge);
      
      // Random weight between 1 and 10
      const weight = Math.floor(Math.random() * 10) + 1;
      newWeights[edge] = weight;
    }
    
    // Add additional random edges based on density
    const maxPossibleEdges = (vertexCount * (vertexCount - 1)) / 2;
    const targetEdgeCount = Math.min(
      Math.floor(maxPossibleEdges * density),
      Math.max(vertexCount * 2, 30) // Don't create more than ~30 edges to keep UI manageable
    );
    
    while (newEdges.length < targetEdgeCount) {
      const from = Math.floor(Math.random() * vertexCount);
      const to = Math.floor(Math.random() * vertexCount);
      
      // Avoid self-loops and duplicate edges
      if (from !== to) {
        const edge = `${from} ${to}`;
        const reverseEdge = `${to} ${from}`;
        
        if (!newEdges.includes(edge) && !newEdges.includes(reverseEdge)) {
          newEdges.push(edge);
          
          // Random weight between 1 and 10
          const weight = Math.floor(Math.random() * 10) + 1;
          newWeights[edge] = weight;
        }
      }
    }
    
    setEdges(newEdges);
    setWeights(newWeights);
    
    toast.success(`Generated random graph with ${newEdges.length} edges`);
  };

  return { generateRandomGraph };
};