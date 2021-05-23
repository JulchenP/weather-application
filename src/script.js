// DEFINITIONS

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekdays = document.querySelector("#weekdays");
weekdays.innerHTML = `${day}`;

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Forecast Hourly
function getForecast(coordinates) {
  let apiKey = "8f6580a23970831fa98d32233fed28c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDailyForecast);
  axios.get(apiUrl).then(showHourlyForecast);
}

function formatForecastHour(timestamp) {
  let time = new Date(timestamp);
  return time.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function showHourlyForecast(response) {
  let forecastElement = document.querySelector("#forecastHourly");
  let forecast = response.data.hourly;

  let forecastHTML = `<div class="row forecast-hourly">
`;
  forecast.forEach(function (forecastHour, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
        <div class="hourly col">
         <img class="image "
          src="http://openweathermap.org/img/wn/${
            forecastHour.weather[0].icon
          }@2x.png"
          alt=""
          
        />
              <div class="col weather-now">
                <p class="weatherForecastTemp">${Math.round(
                  forecastHour.temp
                )}°</p>
                <p class="weatherForecastTime">${formatForecastHour(
                  forecastHour.dt * 1000
                )}
               </p>
              </div>
              </div>
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// Forecast Daily

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showDailyForecast(response) {
  console.log(response.data.hourly);
  let forecastElement = document.querySelector("#forecastWeek");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-4">
         <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
         
        />
        </div>
                  <p class="col-4 forecast-next-date">${formatForecastDay(
                    forecastDay.dt
                  )}</p>
                  
                  <div class="col-4 forecast-next-temp" >
                  <p class="tempMax">${Math.round(forecastDay.temp.max)}° </p> 
                  <p class="divider"> | </p>
                  <p class="tempMin">${Math.round(forecastDay.temp.min)}° </p>
                  </div>
           
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// SEARCH BAR (API)

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  let tempElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("h3");
  let humidityElement = document.querySelector("#humidity-level");
  let windElement = document.querySelector("#wind-speed");

  celciusTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let currentWeatherIconElement = document.querySelector("#currentWeatherIcon");
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  cityElement.innerHTML = city;
  tempElement.innerHTML = celciusTemp;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  windElement.innerHTML = `Wind: ${wind} km/h`;

  getForecast(response.data.coord);
}

function searchingCity(city) {
  let apiKey = "8f6580a23970831fa98d32233fed28c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

searchingCity("Münster");

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");
  searchingCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

// CURRENT LOCATION BUTTON (API)

function retrieveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8f6580a23970831fa98d32233fed28c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

// TEMP TOGGLE BUTTON

function convertToF() {
  fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}`;

  fahrenheitLink.innerHTML = "°C";
  tempSymbol.innerHTML = "°F";
}

function convertToC() {
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = `${celciusTemp}`;

  fahrenheitLink.innerHTML = "°F";
  tempSymbol.innerHTML = "°C";
}

function convertsUnityButton(event) {
  event.preventDefault;
  if (fahrenheitLink.innerHTML === "°C") {
    convertToC();
  } else {
    convertToF();
  }
}

let tempSymbol = document.querySelector("#tempAttribute");

let fahrenheitLink = document.querySelector(".btn-fahrenheit");
fahrenheitLink.addEventListener("click", convertsUnityButton);

let celciusLink = document.querySelector(".btn-fahrenheit");
celciusLink.addEventListener("click", convertsUnityButton);

let celciusTemp = null;
let fahrenheitTemp = null;
