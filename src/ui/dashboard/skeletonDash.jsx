import React from "react";

export const SkeletonDash = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-[calc(100vw-300px)] flex items-center justify-center">
      <span className="text-2xl">
        Choose a <span className="font-bold">Game</span> and <span className="font-bold"> View Type</span> to display in
        this section
      </span>
    </div>
  );
};
