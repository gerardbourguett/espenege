import { NextResponse } from "next/server";

interface WeatherResponse {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  icon: string;
}

// Cache weather data for 30 minutes
let cachedWeather: WeatherResponse | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 min

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cachedWeather && now - cacheTimestamp < CACHE_DURATION) {
    return NextResponse.json(cachedWeather);
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const city = process.env.WEATHER_CITY || "Santiago";
  const country = process.env.WEATHER_COUNTRY || "CL";

  if (!apiKey) {
    // Return mock data when no API key is configured
    return NextResponse.json({
      city,
      temp: 22,
      condition: "Parcialmente nublado",
      humidity: 55,
      icon: "02d",
    });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=es&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    );

    if (!res.ok) {
      throw new Error(`OpenWeatherMap API error: ${res.status}`);
    }

    const data = await res.json();

    cachedWeather = {
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0]?.description || "Desconocido",
      humidity: data.main.humidity,
      icon: data.weather[0]?.icon || "01d",
    };
    cacheTimestamp = now;

    return NextResponse.json(cachedWeather);
  } catch (error) {
    console.error("Weather API error:", error);
    // Return mock data on error
    return NextResponse.json({
      city,
      temp: 22,
      condition: "Parcialmente nublado",
      humidity: 55,
      icon: "02d",
    });
  }
}
