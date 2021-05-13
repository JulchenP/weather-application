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

// TEMP TOGGLE BUTTON

let tempSymbol = document.querySelector("#tempAttribute");

function convertToF(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temp");
  temperature = Number(temperature);
  if (fahrenheitLink.innerHTML === "°F") {
    temperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
    fahrenheitLink.innerHTML = "°C";
    tempSymbol.innerHTML = "°F";
  } else {
    temperature.innerHTML = temperature;
    fahrenheitLink.innerHTML = "°F";
    tempSymbol.innerHTML = "°C";
  }
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  let temperature = document.querySelector(".current-temp");
  temperatureElement.innerHTML = temperature;
}

let fahrenheitLink = document.querySelector(".btn-fahrenheit");
fahrenheitLink.addEventListener("click", convertToF);

let celciusLink = document.querySelector(".btn-fahrenheit");
celciusLink.addEventListener("click", convertToC);

// SEARCH BAR (API)

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  let tempElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("h3");
  let humidityElement = document.querySelector("#humidity-level");
  let windElement = document.querySelector("#wind-speed");

  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  cityElement.innerHTML = city;
  tempElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
}

function searchingCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  let apiKey = "8f6580a23970831fa98d32233fed28c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", searchingCity);

// CURRENT LOCATION BUTTON (API)

function displayWeather(response) {
  let searchedCity = document.querySelector("h1");
  let descriptionCondition = document.querySelector(".descriptionWeather");
  let temperatureElement = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity-level");
  let windElement = document.querySelector("#wind-speed");
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  searchedCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  descriptionCondition.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
}

function retrieveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8f6580a23970831fa98d32233fed28c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

// DEFAULT WEATHER

function defaultDisplayWeather(response) {
  let cityElement = document.querySelector(".currentCityName");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector(".current-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector(".descriptionWeather");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity-level");
  let windElement = document.querySelector("#wind-speed");
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  let currentWeatherIconElement = document.querySelector("#currentWeatherIcon");
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
}
let apiKey = "8f6580a23970831fa98d32233fed28c8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Muenster&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(defaultDisplayWeather);
