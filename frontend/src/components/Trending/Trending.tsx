import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { trendingQuery } from '../../pages/home/homeQueries';

function Trending() {

  const queryData = trendingQuery()

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
          color: "white"
        },
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        ticks: {
          color: "white"
        }
      },
      x: {
        ticks: {
          color: "white"
        }
      }
    }
  };
  
  const labels = queryData.map((element) => element.name);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Desired',
        data: queryData.map((element) => element.wants),
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }
    ],
  };

  return (
    <div className='flex justify-center items-center w-3/5 text-text'>
      <Bar options={options} data={data}/>
    </div>
  )
}

export default Trending