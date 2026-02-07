"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, Droplets, Thermometer, Loader2 } from "lucide-react";
import { useWeatherStore } from "@/stores/weather-store";

export function WeatherWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { weather, isLoading, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (isLoading || !weather) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline">Cargando...</span>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Main inline display */}
      <div className="flex items-center gap-2 text-sm text-white/70 hover:text-spng-accent transition-colors cursor-pointer">
        <div className="relative">
          <Sun className="w-4 h-4 absolute text-yellow-400" />
          <Cloud className="w-4 h-4 relative text-white/90" />
        </div>
        <span className="font-semibold text-white">{weather.temp}°C</span>
        <span className="hidden sm:inline">{weather.city}</span>
      </div>

      {/* Expanded details tooltip */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl p-4 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-3">
            {/* City and condition */}
            <div>
              <div className="font-semibold text-white text-base mb-1">
                {weather.city}
              </div>
              <div className="text-sm text-white/60">
                {weather.condition}
              </div>
            </div>

            {/* Temperature */}
            <div className="flex items-center gap-2 text-white/80">
              <Thermometer className="w-4 h-4 text-spng-accent" />
              <span className="text-sm">
                Temperatura: <span className="font-semibold text-white">{weather.temp}°C</span>
              </span>
            </div>

            {/* Humidity */}
            <div className="flex items-center gap-2 text-white/80">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-sm">
                Humedad: <span className="font-semibold text-white">{weather.humidity}%</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
