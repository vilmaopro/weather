"use client"; // Add this line at the top if using the App Router

import { useState } from "react";
import { fetchWeather } from "@/utils/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      if (err instanceof Error){
        console.error(err.message);
        setWeather(null);
      }
    } finally {
      setLoading(false);
    }
  };
interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Weather Forecast</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {weather && (
          <div className="text-center bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">{weather.name}, {weather.sys.country}</h2>
            <p className="text-4xl font-bold my-2 text-blue-900">{Math.round(weather.main.temp)}°C</p>
            <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </main>
  );
}