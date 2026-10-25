(function () {
  const destination = document.getElementById("gkDestination");
  const button = document.getElementById("gkWeatherBtn");
  const result = document.getElementById("gkWeatherResult");

  if (!destination || !button || !result) return;

  async function loadWeather() {
    const [latitude, longitude] = destination.value.split(",");

    result.textContent = "Loading weather...";

    try {
     const url =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
  `&longitude=${longitude}` +
  `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
  `&timezone=auto`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Weather unavailable");

      const data = await response.json();
      const weather = data.current;

      const conditions = {
        0: "Clear sky",
        1: "Mostly clear",
        2: "Partly cloudy",
        3: "Cloudy",
        45: "Foggy",
        48: "Foggy",
        51: "Light drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Light snow",
        80: "Rain showers",
        95: "Thunderstorm"
      };

      result.innerHTML = `
        <h3>${weather.temperature_2m}°C</h3>
        <p>${conditions[weather.weather_code] || "Weather conditions"}</p>
        <p>Feels like: ${weather.apparent_temperature}°C</p>
        <p>Humidity: ${weather.relative_humidity_2m}%</p>
        <p>Wind: ${weather.wind_speed_10m} km/h</p>
      `;
    } catch (error) {
      result.textContent =
        "Weather could not be loaded. Please check your internet and try again.";
    }
  }

  button.addEventListener("click", loadWeather);
  destination.addEventListener("change", loadWeather);
})();
