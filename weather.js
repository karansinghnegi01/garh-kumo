
(function () {
  const destination = document.getElementById("gkDestination");
  const button = document.getElementById("gkWeatherBtn");
  const result = document.getElementById("gkWeatherResult");
  const panel = document.getElementById("gkWeatherPanel");
  const toggle = document.getElementById("gkWeatherToggle");
  const close = document.getElementById("gkWeatherClose");

  if (!destination || !button || !result) return;

  const weatherText = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail"
  };

  function showPanel() {
    if (panel) panel.hidden = false;
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function hidePanel() {
    if (panel) panel.hidden = true;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle) toggle.addEventListener("click", showPanel);
  if (close) close.addEventListener("click", hidePanel);

  function safeNumber(value, suffix = "") {
    return Number.isFinite(value) ? `${value}${suffix}` : "Unavailable";
  }

  function formatTime(value) {
    if (!value) return "Unavailable";
    return value.slice(11, 16);
  }

  async function loadWeather() {
    const [latitude, longitude] = destination.value.split(",").map(Number);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      result.textContent = "Please select a valid destination.";
      return;
    }

    button.disabled = true;
    result.innerHTML = "<p>Loading weather data...</p>";

    try {
      const params = new URLSearchParams({
        latitude,
        longitude,
        elevation: "3549",
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "is_day",
          "precipitation",
          "weather_code",
          "cloud_cover",
          "pressure_msl",
          "wind_speed_10m",
          "wind_direction_10m"
        ].join(","),
        hourly: [
          "temperature_2m",
          "precipitation_probability",
          "weather_code",
          "relative_humidity_2m",
          "uv_index",
          "visibility"
        ].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "sunrise",
          "sunset",
          "uv_index_max",
          "precipitation_probability_max",
          "wind_speed_10m_max"
        ].join(","),
        timezone: "auto",
        forecast_days: "7",
        forecast_hours: "24"
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );

      if (!response.ok) {
        throw new Error("Weather service unavailable");
      }

      const data = await response.json();

      if (!data.current || !data.hourly || !data.daily) {
        throw new Error("Incomplete weather data");
      }

      const current = data.current;
      const hourly = data.hourly;
      const daily = data.daily;

      const currentCondition =
        weatherText[current.weather_code] || "Condition unavailable";

      const hourlyCards = hourly.time.slice(0, 12).map((time, i) => `
        <div class="gk-hour-card">
          <strong>${formatTime(time)}</strong>
          <span>${weatherText[hourly.weather_code[i]] || "—"}</span>
          <b>${safeNumber(hourly.temperature_2m[i], "°C")}</b>
          <small>Rain: ${safeNumber(hourly.precipitation_probability[i], "%")}</small>
        </div>
      `).join("");

      const dailyCards = daily.time.map((date, i) => `
        <div class="gk-day-card">
          <strong>${date.slice(5)}</strong>
          <span>${weatherText[daily.weather_code[i]] || "—"}</span>
          <b>${safeNumber(daily.temperature_2m_max[i], "°")} /
              ${safeNumber(daily.temperature_2m_min[i], "°C")}</b>
          <small>Rain: ${safeNumber(daily.precipitation_probability_max[i], "%")}</small>
        </div>
      `).join("");

      result.innerHTML = `
        <div class="gk-current-weather">
          <p class="gk-weather-location">${destination.options[destination.selectedIndex].text}</p>
          <div class="gk-weather-temp">${safeNumber(current.temperature_2m, "°C")}</div>
          <h3>${currentCondition}</h3>
          <p>Feels like ${safeNumber(current.apparent_temperature, "°C")}</p>
          <p>${current.is_day === 1 ? "Daytime" : "Nighttime"} · Updated ${formatTime(current.time)}</p>
        </div>

        <div class="gk-weather-details">
          <div><span>Humidity</span><strong>${safeNumber(current.relative_humidity_2m, "%")}</strong></div>
          <div><span>Wind</span><strong>${safeNumber(current.wind_speed_10m, " km/h")}</strong></div>
          <div><span>Wind direction</span><strong>${safeNumber(current.wind_direction_10m, "°")}</strong></div>
          <div><span>Precipitation</span><strong>${safeNumber(current.precipitation, " mm")}</strong></div>
          <div><span>Cloud cover</span><strong>${safeNumber(current.cloud_cover, "%")}</strong></div>
          <div><span>Pressure</span><strong>${safeNumber(current.pressure_msl, " hPa")}</strong></div>
        </div>

        <h3>Next 12 Hours</h3>
        <div class="gk-hourly-list">${hourlyCards}</div>

        <h3>7-Day Forecast</h3>
        <div class="gk-daily-list">${dailyCards}</div>

        <h3>Sun & UV Details</h3>
        <div class="gk-weather-details">
          <div><span>Sunrise</span><strong>${formatTime(daily.sunrise[0])}</strong></div>
          <div><span>Sunset</span><strong>${formatTime(daily.sunset[0])}</strong></div>
          <div><span>Maximum UV index</span><strong>${safeNumber(daily.uv_index_max[0])}</strong></div>
          <div><span>Maximum wind</span><strong>${safeNumber(daily.wind_speed_10m_max[0], " km/h")}</strong></div>
          <div><span>Hourly UV index</span><strong>${safeNumber(hourly.uv_index[0])}</strong></div>
          <div><span>Visibility</span><strong>${safeNumber(hourly.visibility[0], " m")}</strong></div>
        </div>

        <p class="gk-weather-note">
          Forecasts are estimates and may differ from conditions at the exact location,
          especially in mountainous areas.
        </p>
        <p class="gk-weather-note">Weather data: Open-Meteo</p>
      `;
    } catch (error) {
      result.textContent =
        "Weather could not be loaded. Check your internet connection and try again.";
    } finally {
      button.disabled = false;
    }
  }

  button.addEventListener("click", loadWeather);
  destination.addEventListener("change", loadWeather);
})();
