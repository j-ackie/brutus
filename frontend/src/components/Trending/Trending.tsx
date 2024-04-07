import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { trendingQuery } from "../../pages/home/homeQueries";
import { useQuery } from "react-query";

function Trending() {
  const {
    data: trendingData,
    isLoading,
    isError,
  } = useQuery("trending", trendingQuery);

  console.log(trendingData);

  if (isLoading) return null;

  if (!trendingData) return null;

  const queryData = trendingData;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            // Get the absolute (positive) value of the data point
            console.log(tooltipItem);
            const value = Math.abs(tooltipItem.raw);

            // Construct the tooltip label to display the positive value
            return `${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
        stacked: true,
      },
      x: {
        ticks: {
          color: "white",
        },
        stacked: true,
      },
    },
  };

  const labels = queryData.map((element: any) => element.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Desired",
        data: queryData.map((element: any) => -1 * element.wants),
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        label: "Offered",
        data: queryData.map((element: any) => element.gives),
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="flex justify-center items-center w-3/5 text-text">
      <Bar options={options} data={data} />
    </div>
  );
}

export default Trending;
