export interface WeatherData {
  city: string;
  main: string;
  temp: number;
  feels_like: number;
  dt: number;
}

export interface DailySummary {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
}

export interface AlertConfig {
  highTempThreshold: number;
  lowTempThreshold: number;
  consecutiveUpdates: number;
}