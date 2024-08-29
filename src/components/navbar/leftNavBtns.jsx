import React from "react";
import { NavLink } from "react-router-dom";

export const LeftNavBtns = () => {
  return (
    <div className="flex gap-14">
      {/* search input */}
      <div className="p-10 flex items-center">
        <img
          src="./assets/icons/search.png"
          alt="./assets/icons/search.png"
          height="16"
          width="16"
          className="absolute ml-2"
        />
        <input type="text" className="p-1 rounded-full indent-8 text-black" />
      </div>

      {/* nav btns */}
      <ul
        id="leftNavBtn"
        className="flex justify-center items-center gap-8 text-lg text-white"
      >
        <li className="px-4 py-1 cursor-pointer rounded-md hover:bg-[#1737533f]">
          <NavLink
            to="/analysis"
            
          >
            Analysis
          </NavLink>
          
        </li>
        <li className="px-4 py-1 cursor-pointer rounded-md hover:bg-[#1737533f] ">
          <NavLink to='/test'>Test</NavLink>
        </li>
        <li className="px-4 py-1 cursor-pointer rounded-md hover:bg-[#1737533f]">
          Verification
        </li>
        <li className="px-4 py-1 cursor-pointer rounded-md hover:bg-[#1737533f]">
          BTN 1
        </li>
        <li className="px-4 py-1 cursor-pointer rounded-md hover:bg-[#1737533f]">
          BTN 2
        </li>
      </ul>
    </div>
  );
};
