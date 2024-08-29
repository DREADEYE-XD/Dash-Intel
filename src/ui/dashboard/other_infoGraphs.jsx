import React from "react";
import { useTheme } from "../../lib/themeContext";
import FpsPercentilesGraph from "../../components/graphView/otherInfoGraphs/fpsPercentilesGraph";

import {
  percentile95,
  average,
  percentile5,
  percentile1,
  lowAverage1,
  percentile0_2,
  percentile0_1,
  lowAverage0_1,
} from "../../lib/percentileCalculator.js";

export const OtherInfoGraphs = () => {
  const { themeOptions } = useTheme();

  return (
    // oig wrapper
    <div
      className="h-[calc(100vh-921px)] w-full flex"
      style={{ backgroundColor: themeOptions.graphOtherBgColor }}
    >
      {/* oig containers */}
      {/* container 1 */}
      <div
        className="h-full w-[calc(100%/3)] border-r-[1px]"
        style={{ borderColor: themeOptions.graphBorderColor }}
      >
        {/* Could not implement the theme functionality inside the FpsPercentilesGraph*/}
        {/* Therefore had to inject the functions directly to  */}
        <FpsPercentilesGraph
          fpsData={{
            percentile95,
            average,
            percentile5,
            percentile1,
            lowAverage1,
            percentile0_2,
            percentile0_1,
            lowAverage0_1,
          }}
        />
      </div>

      {/* container 2 */}
      <div
        className="h-full w-[calc(100%/3)] border-r-[1px]"
        style={{ borderColor: themeOptions.graphBorderColor }}
      ></div>

      {/* container 3 */}
      <div className="h-full w-[calc(100%/3)]"></div>
    </div>
  );
};


