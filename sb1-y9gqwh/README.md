# Real-Time Weather Monitoring System

This project is a real-time data processing system for monitoring weather conditions in major Indian cities. It provides summarized insights using rollups and aggregates, utilizing data from the OpenWeatherMap API.

## Features

- Real-time weather data retrieval for Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad
- Daily weather summaries with average, maximum, and minimum temperatures
- Dominant weather condition calculation
- Configurable alerting thresholds for temperature extremes
- Visualizations for daily weather summaries and historical trends
- Responsive web interface built with React and TypeScript

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual OpenWeatherMap API key.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Build for Production

To build the application for production, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Design Choices

- **React with TypeScript**: Provides a robust and type-safe foundation for building the user interface.
- **Vite**: Used as the build tool for fast development and optimized production builds.
- **Tailwind CSS**: Utilized for rapid UI development with utility-first CSS.
- **Chart.js with react-chartjs-2**: Chosen for creating interactive and responsive charts for weather data visualization.
- **Axios**: Used for making HTTP requests to the OpenWeatherMap API.
- **date-fns**: Employed for efficient date manipulation and formatting.

## Project Structure

- `src/components`: React components for the UI
- `src/services`: API service for fetching weather data
- `src/types`: TypeScript interfaces for weather data and related types
- `src/utils`: Utility functions for data processing and calculations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).