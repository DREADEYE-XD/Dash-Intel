import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "../../../lib/themeContext";

export const DateDropDown = ({
  setIsDateTabCollapsed,
  availableFilePaths,
  handleDateSelection,
  setSelectedDate,
  initialSelectedDate,
}) => {
  const { themeOptions } = useTheme();
  const [activeDate, setActiveDate] = useState("");

  // Utility function to format date as dd-mm-yy@hh:mm:ss
  const formatDate = useCallback((dateString) => {
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const hours = timePart.slice(0, 2);
    const minutes = timePart.slice(2, 4);
    const seconds = timePart.slice(4, 6);

    return `${day}-${month}-${year.slice(-2)} @ ${hours}:${minutes}:${seconds}`;
  }, []);

  // Extract unique dates from file paths
  const dates = availableFilePaths
    .map((file) => {
      const match = file.match(/(\d{4}-\d{2}-\d{2}T\d+)/);
      return match ? match[0] : null;
    })
    .filter(Boolean);

  const handleActiveDate = useCallback(
    (date) => {
      setActiveDate(date);
      handleDateSelection(date);
      setSelectedDate(formatDate(date));
    },
    [handleDateSelection, setSelectedDate, formatDate]
  );

  useEffect(() => {
    if (dates.length > 0) {
      if (initialSelectedDate) {
        // If there's an initial selected date, use it
        const matchingDate = dates.find(date => formatDate(date) === initialSelectedDate);
        if (matchingDate) {
          handleActiveDate(matchingDate);
        } else {
          handleActiveDate(dates[0]);
        }
      } else if (!activeDate) {
        // If no date is active, set the most recent date
        handleActiveDate(dates[0]);
      }
    }
  }, [dates, activeDate, handleActiveDate, initialSelectedDate, formatDate]);

  return (
    <div
      className="h-auto w-[200px] mt-[32px] absolute z-10 flex flex-col justify-start text-center p-4 rounded-md gap-1 overflow-auto"
      style={{
        backgroundColor: themeOptions.dateDropDownBgColor,
        color: themeOptions.dateDropDownTextColor,
      }}
    >
      {dates.map((date, index) => (
        <div
          key={index}
          className={`hoverMode rounded-sm w-full cursor-pointer ${
            activeDate === date ? "tabActive" : ""
          }`}
          onClick={() => {
            handleActiveDate(date);
            setIsDateTabCollapsed(false);
          }}
        >
          {formatDate(date)}
        </div>
      ))}
    </div>
  );
};

