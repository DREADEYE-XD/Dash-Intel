import React from "react";
import { LeftNavBtns } from "../../components/navbar/leftNavBtns";
import { RightNavBtns } from "../../components/navbar/rightNavBtns";

export const Navbar = () => {
  
  return (
    <nav className="h-[60px] w-screen flex justify-between items-center bg-[#3cb1ff]">
      {/* left nav btns with input*/}
      <LeftNavBtns />

      {/* profile btn & theme btn*/}
      <RightNavBtns />
    </nav>
  );
};
