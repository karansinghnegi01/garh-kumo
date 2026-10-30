
(function () {
  "use strict";

  // Prevent duplicate loading
  if (window.__garhKumoWeatherLoaded) return;
  window.__garhKumoWeatherLoaded = true;

  // Homepage only
  var path = window.location.pathname;
  var isHome =
    path === "/" ||
    /\/index\.(html|php)$/i.test(path);

  if (!isHome) return;

  var style = document.createElement("style");

  style.textContent = `
    #gkw-button {
      position: fixed;
      right: 25px;
      bottom: 25px;
      z-index: 99999;
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 50px;
      padding: 14px 21px;
      background: linear-gradient(135deg,#102d46,#087f8c);
      color: white;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 35px rgba(0,0,0,.3);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #gkw-button:hover {
      transform: translateY(-3px);
    }

    #gkw-panel {
      position: fixed;
      right: 25px;
      bottom: 90px;
      width: 365px;
      max-width: calc(100vw - 30px);
      max-height: 78vh;
      overflow-y: auto;
      z-index: 99999;
      display: none;
      background: #0c1928;
      color: white;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 22px;
      box-shadow: 0 20px 70px rgba(0,0,0,.45);
      padding: 20px;
      font-family: Arial,sans-serif;
    }

    #gkw-panel * { box-sizing: border-box; }

    .gkw-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:18px;
    }

    .gkw-title {
      font-size:19px;
      font-weight:800;
    }

    .gkw-subtitle {
      font-size:11px;
      color:#9aafc3;
      margin-top:5px;
    }

    #gkw-close {
      border:0;
      background:#1b3045;
      color:white;
      width:32px;
      height:32px;
      border-radius:50%;
      cursor:pointer;
      font-size:18px;
    }

    .gkw-search {
      display:flex;
      gap:8px;
      margin-bottom:10px;
    }

    #gkw-input {
      width:100%;
      min-width:0;
      padding:12px;
      border:1px solid #31465b;
      border-radius:11px;
      background:#14283c;
      color:white;
      outline:none;
      font-size:13px;
    }

    #gkw-search-btn,#gkw-location-btn {
      border:0;
      border-radius:10px;
      padding:11px 13px;
      background:#087f8c;
      color:white;
      font-weight:700;
      cursor:pointer;
      white-space:nowrap;
    }

    #gkw-location-btn {
      width:100%;
      margin-bottom:15px;
      background:#1c344a;
    }

    .gkw-chips {
      display:flex;
      gap:7px;
      overflow-x:auto;
      padding-bottom:13px;
    }

    .gkw-chip {
      background:#1a3044;
      color:#c8d9e8;
      border:1px solid #30475d;
      border-radius:20px;
      padding:7px 11px;
      white-space:nowrap;
      cursor:pointer;
      font-size:11px;
    }

    .gkw-current {
      background:linear-gradient(135deg,#087f8c,#164b76);
      border-radius:17px;
      padding:18px;
      margin-top:5px;
    }

    .gkw-place {
      font-size:14px;
      font-weight:700;
    }

    .gkw-main {
      display:flex;
      align-items:center;
      justify-content:space-between;
      margin:14px 0;
    }

    .gkw-temp {
      font-size:48px;
      font-weight:800;
    }

    .gkw-icon {
      font-size:48px;
    }

    .gkw-condition {
      font-size:13px;
      opacity:.9;
    }

    .gkw-grid {
      display:grid;
      grid-template-columns:repeat(2,1fr);
      gap:9px;
      margin:14px 0;
    }

    .gkw-stat {
      background:#14283c;
      border:1px solid #263e54;
      border-radius:12px;
      padding:12px;
    }

    .gkw-stat small {
      display:block;
      color:#94aabd;
      font-size:11px;
      margin-bottom:7px;
    }

    .gkw-stat strong {
      font-size:15px;
    }

    .gkw-hour-title {
      font-size:15px;
      font-weight:800;
      margin:20px 0 12px;
    }

    .gkw-hours {
      display:flex;
      gap:9px;
      overflow-x:auto;
      padding-bottom:12px;
    }

    .gkw-hour {
      min-width:76px;
      text-align:center;
      background:#14283c;
      border:1px solid #2a4055;
      border-radius:13px;
      padding:12px 8px;
    }

    .gkw-hour-time {
      font-size:11px;
      color:#9db1c4;
    }

    .gkw-hour-icon {
      font-size:23px;
      margin:10px 0;
    }

    .gkw-hour-temp {
      font-size:15px;
      font-weight:800;
    }

    .gkw-hour-rain {
      font-size:10px;
      color:#75c9e9;
      margin-top:7px;
    }

    .gkw-footer {
      color:#7f97ad;
      font-size:10px;
      text-align:center;
      margin-top:15px;
    }

    #gkw-message {
      color:#9db1c4;
      font-size:12px;
      padding:12px 2px;
      line-height:1.5;
    }

    @media(max-width:480px) {
      #gkw-panel {
        right:10px;
        bottom:85px;
        width:calc(100vw - 20px);
      }
      #gkw-button {
        right:15px;
        bottom:15px;
      }
    }
  `;

  document.head.appendChild(style);

  // Floating button
  var button = document.createElement("button");
  button.id = "gkw-button";
  button.innerHTML = "🌤️ Weather Explorer";
  document.body.appendChild(button);

  // Weather panel
  var panel = document.createElement("div");
  panel.id = "gkw-panel";

  panel.innerHTML = `
    <div class="gkw-header">
      <div>
        <div class="gkw-title">🌦️ Weather Explorer</div>
        <div class="gkw-subtitle">Explore weather across destinations</div>
      </div>
      <button id="gkw-close">×</button>
    </div>

    <div class="gkw-search">
      <input id="gkw-input"
        placeholder="Search city or destination..."
        type="text">
      <button id="gkw-search-btn">Search</button>
    </div>

    <button id="gkw-location-btn">
      📍 Use My Current Location
    </button>

    <div class="gkw-chips">
      ${[
        "Dehradun","Mussoorie","Nainital",
        "Rishikesh","Haridwar","Auli",
        "Kedarnath","Badrinath","Almora"
      ].map(function(city) {
        return '<button class="gkw-chip" data-city="' +
          city + '">' + city + '</button>';
      }).join("")}
    </div>

    <div id="gkw-message">
      Search for a destination to see its weather.
    </div>

    <div id="gkw-result"></div>

    <div class="gkw-footer">
      Hourly forecast · Source: Open-Meteo
    </div>
  `;

  document.body.appendChild(panel);

  var result = document.getElementById("gkw-result");
  var message = document.getElementById("gkw-message");
  var input = document.getElementById("gkw-input");

  button.addEventListener("click", function () {
    panel.style.display =
      panel.style.display === "block" ? "none" : "block";
  });

  document.getElementById("gkw-close").onclick = function () {
    panel.style.display = "none";
  };

  // Weather codes
  function weatherInfo(code) {
    if (code === 0) return ["Clear Sky","☀️"];
    if (code === 1) return ["Mainly Clear","🌤️"];
    if (code === 2) return ["Partly Cloudy","⛅"];
    if (code === 3) return ["Overcast","☁️"];
    if (code === 45 || code === 48) return ["Fog","🌫️"];
    if (code >= 51 && code <= 57) return ["Drizzle","🌦️"];
    if (code >= 61 && code <= 67) return ["Rain","🌧️"];
    if (code >= 71 && code <= 77) return ["Snow","❄️"];
    if (code >= 80 && code <= 82) return ["Rain Showers","🌧️"];
    if (code >= 85 && code <= 86) return ["Snow Showers","🌨️"];
    if (code >= 95) return ["Thunderstorm","⛈️"];

    return ["Cloudy","☁️"];
  }

  function formatHour(time) {
    return new Date(time).toLocaleTimeString("en-IN", {
      hour: "numeric",
      hour12: true
    });
  }

  // Get weather by coordinates
  async function getWeather(latitude, longitude, place) {
    message.textContent = "Getting latest weather information...";
    result.innerHTML = "";

    try {
      var url =
        "https://api.open-meteo.com/v1/forecast?" +
        "latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m" +
        "&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m" +
        "&daily=sunrise,sunset" +
        "&forecast_hours=24" +
        "&timezone=auto";

      var response = await fetch(url);

      if (!response.ok) throw new Error("Weather service unavailable");

      var data = await response.json();

      if (!data.current || !data.hourly) {
        throw new Error("Weather data unavailable");
      }

      var current = data.current;
      var info = weatherInfo(current.weather_code);

      var sunrise = data.daily.sunrise[0];
      var sunset = data.daily.sunset[0];

      function timeOnly(value) {
        return value ? formatHour(value) : "--";
      }

      var html = `
        <div class="gkw-current">
          <div class="gkw-place">📍 ${place}</div>

          <div class="gkw-main">
            <div>
              <div class="gkw-temp">
                ${Math.round(current.temperature_2m)}°
              </div>
              <div class="gkw-condition">${info[0]}</div>
            </div>
            <div class="gkw-icon">${info[1]}</div>
          </div>

          <div style="font-size:12px;opacity:.85">
            Feels like ${Math.round(current.apparent_temperature)}°C
          </div>
        </div>

        <div class="gkw-grid">
          <div class="gkw-stat">
            <small>💧 Humidity</small>
            <strong>${current.relative_humidity_2m}%</strong>
          </div>
          <div class="gkw-stat">
            <small>💨 Wind Speed</small>
            <strong>${current.wind_speed_10m} km/h</strong>
          </div>
          <div class="gkw-stat">
            <small>🌧️ Precipitation</small>
            <strong>${current.precipitation} mm</strong>
          </div>
          <div class="gkw-stat">
            <small>🌅 Sunrise</small>
            <strong>${timeOnly(sunrise)}</strong>
          </div>
          <div class="gkw-stat">
            <small>🌇 Sunset</small>
            <strong>${timeOnly(sunset)}</strong>
          </div>
          <div class="gkw-stat">
            <small>🌡️ Feels Like</small>
            <strong>${Math.round(current.apparent_temperature)}°C</strong>
          </div>
        </div>

        <div class="gkw-hour-title">🕒 Next 24 Hours</div>
        <div class="gkw-hours">
      `;

      // Hourly forecast: next 24 hours from current hour
      var times = data.hourly.time;
      var now = new Date(current.time).getTime();
      var startIndex = times.findIndex(function (time) {
        return new Date(time).getTime() >= now;
      });

      if (startIndex < 0) startIndex = 0;

      var endIndex = Math.min(startIndex + 24, times.length);

      for (var i = startIndex; i < endIndex; i++) {
        var hourlyInfo = weatherInfo(data.hourly.weather_code[i]);

        html += `
          <div class="gkw-hour">
            <div class="gkw-hour-time">
              ${formatHour(times[i])}
            </div>
            <div class="gkw-hour-icon">
              ${hourlyInfo[1]}
            </div>
            <div class="gkw-hour-temp">
              ${Math.round(data.hourly.temperature_2m[i])}°
            </div>
            <div class="gkw-hour-rain">
              🌧️ ${data.hourly.precipitation_probability[i] ?? 0}%
            </div>
          </div>
        `;
      }

      html += `
        </div>
        <div style="font-size:11px;color:#91a8bd">
          Hourly temperatures and rain probability for the next 24 hours.
        </div>
      `;

      result.innerHTML = html;
      message.textContent =
        "Updated: " + new Date().toLocaleTimeString("en-IN");

    } catch (error) {
      message.textContent =
        "Weather could not be loaded. Please try again.";
      console.error("Garh Kumo Weather:", error);
    }
  }

  // Search city using Open-Meteo geocoding
  async function searchCity(city) {
    if (!city.trim()) {
      message.textContent = "Please enter a city or destination.";
      return;
    }

    message.textContent = "Searching destination...";
    result.innerHTML = "";

    try {
      var url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=1&language=en&format=json";

      var response = await fetch(url);
      var data = await response.json();

      if (!data.results || !data.results.length) {
        message.textContent = "Destination not found. Try another name.";
        return;
      }

      var location = data.results[0];

      var place = location.name;
      if (location.admin1) place += ", " + location.admin1;
      if (location.country) place += ", " + location.country;

      getWeather(
        location.latitude,
        location.longitude,
        place
      );

    } catch (error) {
      message.textContent = "Search failed. Please try again.";
    }
  }

  document.getElementById("gkw-search-btn").onclick = function () {
    searchCity(input.value);
  };

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") searchCity(input.value);
  });

  // Popular destinations
  document.querySelectorAll(".gkw-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      input.value = chip.dataset.city;
      searchCity(chip.dataset.city);
    });
  });

  // Current location
  document.getElementById("gkw-location-btn").onclick = function () {
    if (!navigator.geolocation) {
      message.textContent = "Your browser does not support location.";
      return;
    }

    message.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
      function (position) {
        getWeather(
          position.coords.latitude,
          position.coords.longitude,
          "Your Current Location"
        );
      },
      function () {
        message.textContent =
          "Location permission denied. Please allow location access or search a city.";
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  };

  // Automatically refresh displayed weather every 15 minutes
  var lastLocation = null;
  var originalGetWeather = getWeather;

  getWeather = async function (latitude, longitude, place) {
    lastLocation = {
      latitude: latitude,
      longitude: longitude,
      place: place
    };
    return originalGetWeather(latitude, longitude, place);
  };

  setInterval(function () {
    if (
      panel.style.display === "block" &&
      lastLocation
    ) {
      originalGetWeather(
        lastLocation.latitude,
        lastLocation.longitude,
        lastLocation.place
      );
    }
  }, 15 * 60 * 1000);

})();
