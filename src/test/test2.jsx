import React from 'react';
import { useOutletContext } from 'react-router-dom';

export const FPSGraph = () => {
  const { filePaths } = useOutletContext();

  // Use filePaths to load and process your data
  console.log('File paths for FPS Graph:', filePaths);

  return (
    <div>
      <h2>FPS Graph</h2>
      {/* Your FPS graph implementation here */}
    </div>
  );
};

export const FrameTimeGraph = () => {
  const { filePaths } = useOutletContext();

  // Use filePaths to load and process your data
  console.log('File paths for FrameTime Graph:', filePaths);

  return (
    <div>
      <h2>FrameTime Graph</h2>
      {/* Your FrameTime graph implementation here */}
    </div>
  );
};