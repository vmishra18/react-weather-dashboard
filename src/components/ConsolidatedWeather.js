import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default function ConsolidatedWeather({
  temp,
  maxtemp,
  mintemp,
  date,
  status,
  humidity
}) {
  const dayLabel = DAYS[new Date(date).getDay()];
  const icon = getWeatherIcon(status);

  return (
    <div className="forecast-card">
      <div className="forecast-card__top">
        <div>
          <h3>{dayLabel}</h3>
          <span className="status-pill">{status}</span>
        </div>
        <img src={icon} alt={status} />
      </div>
      <div className="forecast-card__temps">
        <span>
          <strong>{Math.round(temp)}°C</strong> now
        </span>
        <span>{Math.round(maxtemp)}°C high</span>
        <span>{Math.round(mintemp)}°C low</span>
      </div>
      <div className="forecast-card__meta">
        <span>Humidity</span>
        <span>{humidity}%</span>
      </div>
    </div>
  );
}
