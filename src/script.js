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
