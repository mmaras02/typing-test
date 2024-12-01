import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Graph = ({ performanceData }) => {
    console.log("performance data",performanceData);
  const data = {
    labels: performanceData.map((data) => data.time),
    datasets: [
      {
        label: "WPM",
        data: performanceData.map((data) => data.wpm),
        borderColor: "rgb(111, 59, 231)",
        borderWidth: 4,
      },
      {
        label: "Accuracy (%)",
        data: performanceData.map((data) => data.accuracy),
        borderColor: "rgb(100, 94, 94)",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (s)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Performance",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
