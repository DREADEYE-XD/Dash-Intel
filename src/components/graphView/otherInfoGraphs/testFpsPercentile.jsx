

// import React, { useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import percentileChartDataLabels from 'chartjs-plugin-datalabels';
// import chartAsJson from "../../../lib/CapFrameX-Cyberpunk2077.exe-2022-09-17T143631.json";
// import { useTheme } from "../../../lib/themeContext";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   percentileChartDataLabels
// );

// function calculatePercentile(data, percentile) {
//   const sortedData = [...data].sort((a, b) => a - b);
//   const index = (percentile / 100) * (sortedData.length - 1);
//   if (Number.isInteger(index)) return sortedData[index];
//   const lowerIndex = Math.floor(index);
//   const upperIndex = Math.ceil(index);
//   const lowerValue = sortedData[lowerIndex];
//   const upperValue = sortedData[upperIndex];
//   const fraction = index - lowerIndex;
//   return lowerValue + (upperValue - lowerValue) * fraction;
// }

// function calculateAverage(data) {
//   return data.reduce((sum, value) => sum + value, 0) / data.length;
// }

// function calculateLowAverage(data, percentage) {
//   const threshold = calculatePercentile(data, percentage);
//   const lowValues = data.filter((value) => value <= threshold);
//   return calculateAverage(lowValues);
// }

// // Implement fps calculating logic below this and replace chartAsJson with the logic
// const msBetweenPresents = chartAsJson.Runs[0].CaptureData.MsBetweenPresents;
// const fpsbetweenPresents = msBetweenPresents.map((item) => {
//   return 1000 / item;
// });

// const percentile95 = calculatePercentile(fpsbetweenPresents, 95);
// const average = calculateAverage(fpsbetweenPresents);
// const percentile5 = calculatePercentile(fpsbetweenPresents, 5);
// const percentile1 = calculatePercentile(fpsbetweenPresents, 1);
// const lowAverage1 = calculateLowAverage(fpsbetweenPresents, 1);
// const percentile0_2 = calculatePercentile(fpsbetweenPresents, 0.2);
// const percentile0_1 = calculatePercentile(fpsbetweenPresents, 0.1);
// const lowAverage0_1 = calculateLowAverage(fpsbetweenPresents, 0.1);

// function FpsPercentilesGraph() {
//   const { themeOptions } = useTheme();
//   // const [percentileChartData, setpercentileChartData] = useState(null);

//   ChartJS.defaults.color = `${themeOptions.graphTextColor}`;
//   ChartJS.defaults.borderColor = `${themeOptions.graphBorderColor}`;

//   const percentileChartData = {
//     labels: [
//       "P95",
//       "Average",
//       "P5",
//       "P1",
//       "1% Low AVG",
//       "P0.2",
//       "P0.1",
//       "0.1% Low AVG",
//     ],
//     datasets: [
//       {
//         label: "Values",
//         data: [
//           percentile95,
//           average,
//           percentile5,
//           percentile1,
//           lowAverage1,
//           percentile0_2,
//           percentile0_1,
//           lowAverage0_1,
//         ],
//         backgroundColor: `${themeOptions.graphMainColor}`,
//         borderColor: `${themeOptions.graphMainColor}`,
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y",
//     elements: {
//       bar: {
//         borderWidth: 2,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         label: {
//           color: themeOptions.graphTextColor,
//         },
//         position: "top",
//       },
//       title: {
//         display: true,
//         color: themeOptions.graphTextColor,
//         text: "Data Percentiles and Averages",
//       },
//       datalabels: {
//         display: true,
//         align: 'right',
//         anchor: 'end',
//         formatter: (value) => value.toFixed(2), // Format to 4 decimal places
//       },
//       scales: {
//         x: {
//           ticks: {
//             color: themeOptions.graphTextColor,
//             callback: (value) => value.toFixed(2), // Format x-axis ticks to 4 decimal places
//           },
//         },
//         y: {
//           label: {
//             color: themeOptions.graphTextColor, // Explicitly set y-axis ticks color
//           },
//         },
//       },
//     },
//   };

//   return <Bar data={percentileChartData} options={options} />;
// }

// export default FpsPercentilesGraph;
