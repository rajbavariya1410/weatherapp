// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from './components/Particles';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Rajkot");
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "1a03813996a04da0afa91412251811";

  const fetchWeather = async () => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      setErrorMsg("❌ Missing API key in .env file");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q: city,
            aqi: "no",
          },
        }
      );

      setWeather(response.data);
      setErrorMsg("");
    } catch (err) {
      const message = err.response?.data?.error?.message || "Invalid city!";
      setErrorMsg(message);
      setWeather(null);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 900 });
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center py-6 px-4 md:px-6 relative overflow-hidden">
      {/*BACKGROUND fills the container */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>

      <h1
        className="text-3xl md:text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-8"
        data-aos="fade-down"
      >
        Weather App
      </h1>

      <div
        className="w-full max-w-lg bg-white/30 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/40"
        data-aos="fade-up"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter city name"
            className="flex-1 px-4 py-3 rounded-xl border bg-white shadow focus:ring-2 focus:ring-indigo-400 outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            onClick={fetchWeather}
            className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {errorMsg && (
          <p className="text-red-600 mt-3 text-center font-medium">
            {errorMsg}
          </p>
        )}
      </div>

      {weather && (
        <div
          className="w-full max-w-md mt-10 p-6 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-2xl"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl font-bold text-indigo-800 text-center">
            {weather.location.name}
          </h2>

          <p className="text-lg mt-2 text-gray-700 text-center">
            {weather.current.temp_c}°C — {weather.current.condition.text}
          </p>

          <img
            src={weather.current.condition.icon}
            className="w-28 mx-auto my-6 rounded-3xl p-4 bg-white/20 backdrop-blur-xl shadow border"
            alt="Weather"
          />

          <div className="grid grid-cols-2 gap-4 text-center mt-4">
            <div className="p-3 bg-white/70 rounded-xl shadow">
              <p className="text-lg font-semibold">{weather.current.humidity}%</p>
              <span className="text-gray-600 text-sm">Humidity</span>
            </div>

            <div className="p-3 bg-white/70 rounded-xl shadow">
              <p className="text-lg font-semibold">
                {weather.current.wind_kph} km/h
              </p>
              <span className="text-gray-600 text-sm">Wind Speed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
