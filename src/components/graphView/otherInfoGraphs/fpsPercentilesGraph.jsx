import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from "../../../lib/themeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

function TestFpsPercentilesGraph({ fpsData }) {
  const { themeOptions } = useTheme();

  const percentileChartData = useMemo(() => ({
    labels: [
      "P95",
      "Average",
      "P5",
      "P1",
      "1% Low AVG",
      "P0.2",
      "P0.1",
      "0.1% Low AVG",
    ],
    datasets: [
      {
        label: "Values",
        data: [
          fpsData.percentile95,
          fpsData.average,
          fpsData.percentile5,
          fpsData.percentile1,
          fpsData.lowAverage1,
          fpsData.percentile0_2,
          fpsData.percentile0_1,
          fpsData.lowAverage0_1,
        ],
        backgroundColor: themeOptions.graphMainColor,
        borderColor: themeOptions.graphMainColor,
        borderWidth: 1,
      },
    ],
  }), [fpsData, themeOptions.graphMainColor]);

  const options = useMemo(() => ({
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
        labels: {
          color: themeOptions.graphTextColor,
        },
      },
      title: {
        display: true,
        text: "Data Percentiles and Averages",
        color: themeOptions.graphTextColor,
      },
      datalabels: {
        display: true,
        align: 'right',
        anchor: 'end',
        color: themeOptions.graphTextColor,
        formatter: (value) => value.toFixed(2),
      },
    },
    scales: {
      x: {
        ticks: {
          color: themeOptions.graphTextColor,
          callback: (value) => value.toFixed(2),
        },
      },
      y: {
        ticks: {
          color: themeOptions.graphTextColor,
        },
      },
    },
  }), [themeOptions.graphTextColor]);

  return <Bar data={percentileChartData} options={options} />;
}

export default TestFpsPercentilesGraph;