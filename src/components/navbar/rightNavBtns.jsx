import React from "react";
import { useTheme } from "../../lib/themeContext";

export const RightNavBtns = () => {
    const { theme, toggleTheme, themeOptions } = useTheme();
  return (
    <div className="p-10 flex items-center justify-center gap-10">
      {/* theme btn wrapper*/}
      <button
        type="checkbox"
        className="w-[60px] h-[25px] border-[1px] border-black rounded-full flex items-center px-0"
        onClick={() => {
          toggleTheme(!theme);
        }}
        style={{ borderColor: themeOptions.toggleBtnBorderColor }}
      >
        <div
          id="themeToggler"
          className="w-[30px] h-[25px] bg-black rounded-full"
          style={{
            backgroundColor: themeOptions.toggleBtnBgColor,
            transform: themeOptions.transform,
          }}
        ></div>
      </button>

      <button className="w-[44px] h-[44px] bg-black rounded-full text-white font-bold text-xl ">
        {/* <img src="" alt="" /> */}
        <span className="">S</span>
      </button>
    </div>
  );
};
