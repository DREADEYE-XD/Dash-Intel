import React, { useState } from 'react';
import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Assuming you have a theme context
import TestDateDropDown from './TestDateDropDown'; // Assuming this component exists
import OtherInfoGraphs from './OtherInfoGraphs'; // Assuming this component exists

export const GraphView = () => {
  const { themeOptions } = useTheme();
  const [isDateTabCollapsed, setisDateTabCollapsed] = useState(false);
  const { filePaths } = useOutletContext(); // Get filePaths from parent route
  const { gameName } = useParams(); // Get game name from URL parameter

  return (
    <div className="h-[calc(100vh-60px)] w-[calc(100vw-300px)]">
      <div
        className="border-b-[1px]"
        style={{ borderColor: themeOptions.borderColor }}
      >
        <div className="w-full h-[70px] flex gap-4 items-center justify-center">
          <div>
            <span className="text-2xl font-bold">{gameName}</span>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setisDateTabCollapsed(true)}
              className="flex justify-center items-center gap-1 text-xl border-black border-2 rounded-lg px-2"
            >
              <span>Date</span>
              <img
                src="./assets/icons/arrow-down.png"
                alt="./assets/icons/arrow-down.png"
                height="18"
                width="18"
              />
            </button>
            {isDateTabCollapsed && (
              <TestDateDropDown setisDateTabCollapsed={setisDateTabCollapsed} />
            )}
          </div>
        </div>
        <nav className="h-[40px] flex flex-col justify-center items-start gap-4">
          <ul
            className="w-full flex justify-start items-center gap-4 px-8 py-1 font-semibold border-b-[1px]"
            style={{ borderColor: themeOptions.graphBorderColor }}
          >
            <li className="px-2 rounded-md cursor-pointer hoverMode">
              <NavLink to="frameTimeGraph">FrameTimes</NavLink>
            </li>
            <li
              className="border-[1px] h-full"
              style={{ borderColor: themeOptions.graphBorderColor }}
            ></li>
            <li className="px-2 rounded-md cursor-pointer hoverMode">
              <NavLink to="fpsGraph">FPS</NavLink>
            </li>
          </ul>
          <ul className="w-full flex justify-start items-center gap-4 px-8 py-1 text-sm">
            <li>Filters:</li>
            <li className="px-2 rounded-md cursor-pointer hoverMode">Raw</li>
            <li
              className="border-[1px] h-full"
              style={{ borderColor: themeOptions.graphBorderColor }}
            ></li>
            <li className="px-2 rounded-md cursor-pointer hoverMode">
              Moving Average
            </li>
            <li
              className="border-[1px] h-full"
              style={{ borderColor: themeOptions.graphBorderColor }}
            ></li>
            <li className="px-2 rounded-md cursor-pointer hoverMode">
              Moving Avg + Raw
            </li>
          </ul>
        </nav>
        <div className="h-[750px] w-[calc(100vw-350px)] flex justify-center items-end">
          <div className="w-full h-full">
            <Outlet context={{ filePaths }} />
          </div>
        </div>
      </div>
      <OtherInfoGraphs />
    </div>
  );
};