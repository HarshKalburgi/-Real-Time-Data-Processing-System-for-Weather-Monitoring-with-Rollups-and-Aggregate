import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { DailySummary } from '../types/WeatherTypes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  dailySummaries: DailySummary[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ dailySummaries }) => {
  const data = {
    labels: dailySummaries.map(summary => summary.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: dailySummaries.map(summary => summary.avgTemp),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Max Temperature',
        data: dailySummaries.map(summary => summary.maxTemp),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Min Temperature',
        data: dailySummaries.map(summary => summary.minTemp),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Weather Summary',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;