import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCityData } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GrowthChart = ({ city }) => {
  const [growthData, setGrowthData] = useState(null);

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        const data = await getCityData(city);
        if (data) {
          setGrowthData({
            '1-Year': data.growth_1yr || 0,
            '5-Year': data.growth_5yr || 0
          });
        }
      };
      fetchData();
    }
  }, [city]);

  if (!growthData) return null;

  const data = {
    labels: Object.keys(growthData),
    datasets: [
      {
        label: 'Growth Rate (%)',
        data: Object.values(growthData),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rental Price Growth Rates',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Growth Rate (%)'
        }
      }
    }
  };

  return (
    <div className="card growth-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GrowthChart;