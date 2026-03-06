const WEATHER_ICON_BASE = "https://www.metaweather.com/static/img/weather";

const WEATHER_ICON_MAP = {
  Snow: "sn",
  Sleet: "sl",
  Hail: "h",
  Thunderstorm: "t",
  "Heavy Rain": "hr",
  "Light Rain": "lr",
  Showers: "s",
  "Heavy Cloud": "hc",
  "Light Cloud": "lc",
  Clear: "c"
};

export const getWeatherIcon = status => {
  const code = WEATHER_ICON_MAP[status] || "lc";
  return `${WEATHER_ICON_BASE}/${code}.svg`;
};
