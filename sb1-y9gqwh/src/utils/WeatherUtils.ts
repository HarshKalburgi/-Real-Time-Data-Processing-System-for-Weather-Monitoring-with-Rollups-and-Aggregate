import { WeatherData, DailySummary, AlertConfig } from '../types/WeatherTypes';
import { format } from 'date-fns';

export const calculateDailySummary = (weatherData: WeatherData[]): DailySummary => {
  const temps = weatherData.map(data => data.temp);
  const conditions = weatherData.map(data => data.main);

  return {
    date: format(new Date(weatherData[0].dt * 1000), 'yyyy-MM-dd'),
    avgTemp: parseFloat((temps.reduce((sum, temp) => sum + temp, 0) / temps.length).toFixed(1)),
    maxTemp: Math.max(...temps),
    minTemp: Math.min(...temps),
    dominantCondition: getDominantCondition(conditions),
  };
};

const getDominantCondition = (conditions: string[]): string => {
  const conditionCounts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(conditionCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

export const checkAlertThresholds = (
  latestData: WeatherData,
  previousData: WeatherData[],
  alertConfig: AlertConfig
): string | null => {
  const { highTempThreshold, lowTempThreshold, consecutiveUpdates } = alertConfig;
  const recentData = [latestData, ...previousData.slice(0, consecutiveUpdates - 1)];

  if (recentData.length < consecutiveUpdates) return null;

  const highTempAlert = recentData.every(data => data.temp > highTempThreshold);
  const lowTempAlert = recentData.every(data => data.temp < lowTempThreshold);

  if (highTempAlert) {
    return `High temperature alert: ${latestData.city} has exceeded ${highTempThreshold}°C for ${consecutiveUpdates} consecutive updates.`;
  } else if (lowTempAlert) {
    return `Low temperature alert: ${latestData.city} has fallen below ${lowTempThreshold}°C for ${consecutiveUpdates} consecutive updates.`;
  }

  return null;
};