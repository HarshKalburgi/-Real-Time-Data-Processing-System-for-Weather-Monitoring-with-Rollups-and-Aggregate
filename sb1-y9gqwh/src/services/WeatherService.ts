import axios from 'axios';
import { WeatherData } from '../types/WeatherTypes';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

export const fetchWeatherData = async (): Promise<WeatherData[]> => {
  console.log('API Key:', API_KEY); // Temporary log to check if API key is loaded

  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is not set. Please set the VITE_OPENWEATHERMAP_API_KEY environment variable.');
  }

  const weatherPromises = cities.map(async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city},IN&appid=${API_KEY}&units=metric`);
      const { main, weather, dt } = response.data;
      return {
        city,
        main: weather[0].main,
        temp: main.temp,
        feels_like: main.feels_like,
        dt,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid or expired API key. Please check your OpenWeatherMap API key.');
        }
        console.error(`Error fetching weather data for ${city}:`, error.response?.data || error.message);
      } else {
        console.error(`Error fetching weather data for ${city}:`, error instanceof Error ? error.message : 'Unknown error');
      }
      return null;
    }
  });

  const weatherData = await Promise.all(weatherPromises);
  return weatherData.filter((data): data is WeatherData => data !== null);
};