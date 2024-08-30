import React from "react";

export const FilterBtns = ({
  themeOptions,
  graphFilterType,
  handleFilterClick,
}) => {
  return (
    <>
      {/* Filter type btns   */}
      <ul className="w-full flex justify-start items-center gap-4 px-8 py-1 text-sm ">
        <li>Filters:</li>
        <li
          className={`px-2 rounded-t-[6px] cursor-pointer hoverMode ${
            graphFilterType.isRaw ? "active" : ""
          }`}
          onClick={() => handleFilterClick("raw")}
        >
          Raw
        </li>
        <li
          className="border-[1px] h-full"
          style={{ borderColor: themeOptions.graphBorderColor }}
        ></li>
        <li
          className={`px-2 rounded-t-[6px] cursor-pointer hoverMode ${
            graphFilterType.isAverage ? "active" : ""
          }`}
          onClick={() => handleFilterClick("average")}
        >
          Moving Average
        </li>
        <li
          className="border-[1px] h-full"
          style={{ borderColor: themeOptions.graphBorderColor }}
        ></li>
        <li
          className={`px-2 rounded-t-[6px] cursor-pointer hoverMode ${
            graphFilterType.isRawPlusAverage ? "active" : ""
          }`}
          onClick={() => handleFilterClick("rawPlusAverage")}
        >
          Moving Avg + Raw
        </li>
      </ul>
    </>
  );
};
