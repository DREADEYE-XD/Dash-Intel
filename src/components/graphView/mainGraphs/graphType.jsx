import React from "react";
import { NavLink } from "react-router-dom";

export const GraphType = ({ themeOptions, gameName, availableFilePaths }) => {
  return (
    <>
      {/* Graph Type Btns */}
      <ul
        className="w-full flex justify-start items-center gap-4 px-8 py-1 font-semibold border-b-[1px]"
        style={{ borderColor: themeOptions.graphBorderColor }}
      >
        <li className="px-2 rounded-md cursor-pointer hoverMode">
          <NavLink
            to={`/analysis/${gameName}/frameTimeGraph`}
            state={{ filePaths: availableFilePaths }}
          >
            FrameTimes
          </NavLink>
        </li>
        {/* Placed just for a border seperator view */}
        <li
          className="border-[1px] h-full"
          style={{ borderColor: themeOptions.graphBorderColor }}
        ></li>
        <li className="px-2 rounded-md cursor-pointer hoverMode">
          <NavLink
            to={`/analysis/${gameName}/fpsGraph`}
            state={{ filePaths: availableFilePaths }}
          >
            FPS
          </NavLink>
        </li>
      </ul>
    </>
  );
};
