import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useTheme } from "../../../lib/themeContext";

const SkeletonGraph = () => {
  const { themeOptions } = useTheme();

  ChartJS.defaults.color = `${themeOptions.graphTextColor}`;
  ChartJS.defaults.borderColor = `${themeOptions.graphBorderColor}`;

  const chartData = {
    // labels: chartAsJson.Runs[0].CaptureData.TimeInSeconds,
    datasets: [
      {
        label: "Select a graph type",
        data: null,
        borderColor: "rgba(0,0,0, 1)", // More transparent
        borderWidth: 1, // Thinner line
        tension: 0.1,
        yAxisID: "y",
        pointRadius: 0,
        order: 2, // This will be drawn first (bottom layer)
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Time in Seconds",
        },
      },
      y: {
        title: {
          display: true,
          text: "Select a graph type",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SkeletonGraph;
