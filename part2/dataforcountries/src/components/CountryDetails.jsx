/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Load API key from .env

  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY) {
        console.error("Missing API Key!");
        return;
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    if (country.capital) {
      fetchWeather();
    }
  }, [country.capital, API_KEY]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        width="150"
      />

      {/* Weather Section */}
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>{weather.description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt="Weather icon"
          />
          <p>Wind: {weather.wind} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
