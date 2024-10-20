import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { calculateDailySummary, checkAlertThresholds } from '../utils/WeatherUtils';
import { WeatherData, DailySummary, AlertConfig } from '../types/WeatherTypes';
import WeatherChart from './WeatherChart';
import { Sun, CloudRain, Snowflake, Wind } from 'lucide-react';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    highTempThreshold: 35,
    lowTempThreshold: 10,
    consecutiveUpdates: 2,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();
        if (data.length === 0) {
          setError('No weather data available. Please check your API key and network connection.');
          return;
        }
        setError(null);
        setWeatherData(prevData => [...data, ...prevData]);

        const latestSummary = calculateDailySummary(data);
        setDailySummaries(prevSummaries => {
          const existingIndex = prevSummaries.findIndex(s => s.date === latestSummary.date);
          if (existingIndex !== -1) {
            const updatedSummaries = [...prevSummaries];
            updatedSummaries[existingIndex] = latestSummary;
            return updatedSummaries;
          }
          return [latestSummary, ...prevSummaries];
        });

        data.forEach(cityData => {
          const alert = checkAlertThresholds(cityData, weatherData, alertConfig);
          if (alert) setAlerts(prevAlerts => [alert, ...prevAlerts]);
        });
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please check your API key and try again.');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, [alertConfig]);

  // ... rest of the component code remains the same

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Monitoring Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* ... rest of the JSX remains the same */}
    </div>
  );
};

export default WeatherDashboard;