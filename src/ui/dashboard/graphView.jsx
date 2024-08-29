import React, { useEffect, useState } from "react";
import { OtherInfoGraphs } from "./other_infoGraphs";
import { useTheme } from "../../lib/themeContext";
import { DateDropDown } from "../../components/graphView/mainGraphs/dateDropDown";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import SkeletonGraph from "../../components/graphView/mainGraphs/skeletonGraph";

export const GraphView = () => {
  const { themeOptions } = useTheme();
  const [isDateTabCollapsed, setIsDateTabCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // For storing the selected file
  const [selectedDate, setSelectedDate] = useState();
  const [availableFilePaths, setAvailableFilePaths] = useState([]);
  const { gameName } = useParams();
  const location = useLocation();
  // console.log(filePaths); // Using useLocation to get state

  // useEffect(() => {
  //   if (filePaths && filePaths.length > 0) {
  //     // Sort file paths by date (most recent first)
  //     const sortedFiles = filePaths.sort((a, b) => {
  //       const dateA = new Date(a.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0]);
  //       const dateB = new Date(b.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0]);
  //       return dateB - dateA;
  //     });

  //     // console.log("filepath:", filePaths);

  //     // Save the sorted file paths to localStorage
  //     localStorage.setItem("filePaths", JSON.stringify(sortedFiles));
  //     setSelectedFile(sortedFiles[0]);
  //   }
  // }, [filePaths]);

  useEffect(() => {
    const storedFilePaths = localStorage.getItem(`filePaths_${gameName}`);
    let filePaths =
      location.state?.filePaths ||
      (storedFilePaths ? JSON.parse(storedFilePaths) : []);

    if (filePaths.length > 0) {
      const sortedFiles = filePaths.sort((a, b) => {
        const dateA = new Date(a.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0]);
        const dateB = new Date(b.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0]);
        return dateB - dateA;
      });

      localStorage.setItem(
        `filePaths_${gameName}`,
        JSON.stringify(sortedFiles)
      );
      setAvailableFilePaths(sortedFiles);
      setSelectedFile(sortedFiles[0]);
    }
  }, [gameName, location.state]);

  const handleDateSelection = (date) => {
    const selected = availableFilePaths.find((file) => file.includes(date));
    if (selected) {
      setSelectedFile(selected);
    }
    setIsDateTabCollapsed(false);
  };

  return (
    // graph view wrapper
    <div className="h-[calc(100vh-60px)] w-[calc(100vw-300px)] ">
      {/* graph view section container*/}
      <div
        className="border-b-[1px]"
        style={{ borderColor: themeOptions.borderColor }}
      >
        {/* info bar */}
        <div className="w-full h-[70px] flex gap-4  items-center justify-center ">
          {/* Game Name */}
          <div>
            <span className="text-2xl font-bold">{gameName}</span>
          </div>
          {/* Change date settings */}
          <div className="flex flex-col">
            <button
              onClick={() => {
                setIsDateTabCollapsed(!isDateTabCollapsed);
              }}
              className="w-[200px] flex justify-center items-center gap-1 text-xl border-black border-2 rounded-lg px-2"
            >
              {selectedDate ? (
                <span>{selectedDate}</span>
              ) : (
                <span>Latest Date</span>
              )}
              <img
                src="./assets/icons/arrow-down.png"
                alt="./assets/icons/arrow-down.png"
                height="18"
                width="18"
              />
            </button>
            {/* date options wrapper */}
            {availableFilePaths &&
            availableFilePaths.length > 0 &&
            isDateTabCollapsed ? (
              <DateDropDown
                setIsDateTabCollapsed={setIsDateTabCollapsed}
                availableFilePaths={availableFilePaths}
                handleDateSelection={handleDateSelection}
                setSelectedDate={setSelectedDate}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* section nav */}
        <nav className="h-[40px] flex flex-col justify-center items-start gap-4">
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

          {/* Filter type btns   */}
          <ul className="w-full flex justify-start items-center gap-4 px-8 py-1 text-sm ">
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

        {/* graph view container */}
        <div className="h-[750px] w-[calc(100vw-350px)] flex justify-center items-end">
          <div className="w-full h-full">
            {/* Conditionally render either SkeletonGraph or the selected graph */}
            {selectedFile ? (
              <Outlet context={selectedFile} />
            ) : (
              <SkeletonGraph />
            )}
          </div>
        </div>
      </div>

      {/* other graph section */}
      <OtherInfoGraphs />
    </div>
  );
};
