import React, { useState } from "react";
import { useTheme } from "../../../lib/themeContext";

export const DateDropDown = ({
  setIsDateTabCollapsed,
  availableFilePaths,
  handleDateSelection,
  setSelectedDate,
}) => {
  const { themeOptions } = useTheme();
  const [activeDate, setActiveDate] = useState(null);

  // Utility function to format date as dd-mm-yy@hh:mm:ss
  const formatDate = (dateString) => {
    // Manually parse the date string
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const hours = timePart.slice(0, 2);
    const minutes = timePart.slice(2, 4);
    const seconds = timePart.slice(4);

    return `${day}-${month}-${year.slice(-2)} @ ${hours}:${minutes}:${seconds}`;
  };

  // Extract unique dates from file paths
  const dates = availableFilePaths.map((file) => {
    return file.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0];
  });

  return (
    <div
      className="h-auto w-[200px] mt-[32px] absolute z-10 flex flex-col justify-start text-center p-4 rounded-md gap-1 overflow-auto"
      style={{
        backgroundColor: themeOptions.dateDropDownBgColor,
        color: themeOptions.dateDropDownTextColor,
      }}
    >
      {dates.map((date, index) => (
        <span
          key={index}
          className={`hoverMode rounded-sm w-full cursor-pointer ${
            activeDate === date ? "tabActive" : ""
          }`}
          onClick={() => {
            handleDateSelection(date);
            setIsDateTabCollapsed(false);
            setSelectedDate(formatDate(date));
            setActiveDate(date);
          }}
        >
          {formatDate(date)}
        </span>
      ))}
    </div>
  );
};
