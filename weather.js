(function () {
"use strict";

var weatherText = {
0: "Clear sky",
1: "Mostly clear",
2: "Partly cloudy",
3: "Overcast",
45: "Fog",
48: "Fog",
51: "Light drizzle",
53: "Moderate drizzle",
55: "Dense drizzle",
61: "Light rain",
63: "Moderate rain",
65: "Heavy rain",
71: "Light snow",
73: "Moderate snow",
75: "Heavy snow",
80: "Rain showers",
81: "Moderate rain showers",
82: "Heavy rain showers",
95: "Thunderstorm",
96: "Thunderstorm with hail",
99: "Thunderstorm with heavy hail"
};

var destinations = {
almora: ["Almora", 29.5971, 79.6591],
auli: ["Auli", 30.5286, 79.5660],
badrinath: ["Badrinath", 30.7433, 79.4938],
chopta: ["Chopta", 30.4880, 79.2130],
ganga: ["Gangotri", 30.9940, 78.9398],
gangotri: ["Gangotri", 30.9940, 78.9398],
haridwar: ["Haridwar", 29.9457, 78.1642],
kedarnath: ["Kedarnath", 30.7346, 79.0669],
mukteshwar: ["Mukteshwar", 29.4722, 79.6479],
nainital: ["Nainital", 29.3803, 79.4636],
ranikhet: ["Ranikhet", 29.6434, 79.4322],
roopkund: ["Roopkund", 30.2610, 79.7320],
tehri: ["Tehri", 30.3780, 78.4800]
};

function loadWeather(place, output) {
if (!place || !output) return;


output.textContent = "Loading weather...";

var url =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=" + place[1] +
  "&longitude=" + place[2] +
  "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
  "&timezone=auto&forecast_days=7";

fetch(url)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Weather service error");
    }
    return response.json();
  })
  .then(function (data) {
    if (!data.current || !data.daily) {
      throw new Error("Weather data unavailable");
    }

    var c = data.current;
    var d = data.daily;

    var html =
      "<h3>" + place[0] + " Weather</h3>" +
      "<h2>" + c.temperature_2m + "°C</h2>" +
      "<p>" + (weatherText[c.weather_code] || "Weather unavailable") + "</p>" +
      "<p>Feels like: " + c.apparent_temperature + "°C</p>" +
      "<p>Humidity: " + c.relative_humidity_2m + "%</p>" +
      "<p>Wind: " + c.wind_speed_10m + " km/h</p>" +
      "<h3>7-Day Forecast</h3>";

    for (var i = 0; i < d.time.length; i++) {
      html +=
        "<div class='gk-day-card'>" +
        "<strong>" + d.time[i] + "</strong><br>" +
        "<span>" + (weatherText[d.weather_code[i]] || "Weather unavailable") + "</span><br>" +
        "<b>" + d.temperature_2m_max[i] + "°C / " +
        d.temperature_2m_min[i] + "°C</b>" +
        "</div>";
    }

    html +=
      "<p class='gk-weather-note'>" +
      "Mountain weather can change quickly. Check local conditions before travelling." +
      "</p>" +
      "<p class='gk-weather-note'>Weather data: Open-Meteo</p>";

    output.innerHTML = html;
  })
  .catch(function () {
    output.textContent =
      "Weather load nahi ho paya. Internet check karke page refresh karein.";
  });


}

var fileName = window.location.pathname
.toLowerCase()
.split("/")
.pop()
.replace(/.html$/, "");

var place = destinations[fileName];

if (place) {
var output = document.getElementById(fileName + "WeatherResult");


if (!output) {
  var section = document.createElement("section");
  section.className = "card gk-destination-weather";

  var heading = document.createElement("h2");
  heading.textContent = place[0] + " Weather";

  output = document.createElement("div");
  output.id = fileName + "WeatherResult";
  output.setAttribute("aria-live", "polite");

  section.appendChild(heading);
  section.appendChild(output);
  document.body.appendChild(section);
}

loadWeather(place, output);


}

var destination = document.getElementById("gkDestination");
var button = document.getElementById("gkWeatherBtn");
var result = document.getElementById("gkWeatherResult");

if (destination && result) {
function loadSelectedDestination() {
var parts = destination.value.split(",");
if (parts.length >= 2) {
loadWeather(
[destination.options[destination.selectedIndex].text,
Number(parts[0]), Number(parts[1])],
result
);
}
}


destination.addEventListener("change", loadSelectedDestination);

if (button) {
  button.addEventListener("click", loadSelectedDestination);
}


}
})();



  


