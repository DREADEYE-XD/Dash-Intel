import React, { useEffect, useState } from "react";
import { OtherInfoGraphs } from "./other_infoGraphs";
import { useTheme } from "../../lib/themeContext";
// import DateDropDown from "../../components/graphView/mainGraphs/dateDropDown";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SkeletonGraph from "../../components/graphView/mainGraphs/skeletonGraph";
import { InfoNav } from "../../components/graphView/mainGraphs/infoNav";
import { FilterBtns } from "../../components/graphView/mainGraphs/filterBtns";
import { GraphType } from "../../components/graphView/mainGraphs/graphType";

export const GraphView = () => {
  const { themeOptions } = useTheme();
  const [isDateTabCollapsed, setIsDateTabCollapsed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // For storing the selected file
  const [selectedDate, setSelectedDate] = useState();
  const [availableFilePaths, setAvailableFilePaths] = useState([]);
  const [graphFilterType, setGraphFilterType] = useState({});
  const { gameName } = useParams();
  const location = useLocation();

  useEffect(() => {
    setGraphFilterType({
      isRaw: false,
      isAverage: false,
      isRawPlusAverage: true,
    });
  }, []);

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
    
  };

  const handleFilterClick = (filterType) => {
    setGraphFilterType({
      isRaw: filterType === "raw",
      isAverage: filterType === "average",
      isRawPlusAverage: filterType === "rawPlusAverage",
    });
  };

  return (
    // graph view wrapper
    <div className="h-[calc(100vh-60px)] w-[calc(100vw-300px)] ">
      {/* graph view section container*/}
      <div
        className="border-b-[1px]"
        style={{ borderColor: themeOptions.borderColor }}
      >
        <InfoNav
          gameName={gameName}
          setIsDateTabCollapsed={setIsDateTabCollapsed}
          isDateTabCollapsed={isDateTabCollapsed}
          themeOptions={themeOptions}
          selectedDate={selectedDate}
          availableFilePaths={availableFilePaths}
          handleDateSelection={handleDateSelection}
          setSelectedDate={setSelectedDate}
        />

        {/* section nav */}
        <nav className="h-[40px] flex flex-col justify-center items-start gap-4">
          <GraphType
            themeOptions={themeOptions}
            gameName={gameName}
            availableFilePaths={availableFilePaths}
          />

          <FilterBtns
            themeOptions={themeOptions}
            gameName={gameName}
            availableFilePaths={availableFilePaths}
            graphFilterType={graphFilterType}
            handleFilterClick={handleFilterClick}
          />
        </nav>

        {/* graph view container */}
        <div className="h-[750px] w-[calc(100vw-350px)] flex justify-center items-end">
          <div className="w-full h-full">
            {/* Conditionally render either SkeletonGraph or the selected graph */}
            {selectedFile && graphFilterType ? (
              <Outlet context={{ selectedFile, graphFilterType }} />
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
