// Current Day
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.querySelector("#day").innerHTML = days[currentTime.getDay()];

document.querySelector("#month").innerHTML = months[currentTime.getMonth()];

document.querySelector("#today").innerHTML = currentTime.getDate();

document.querySelector("#year").innerHTML = currentTime.getFullYear();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

// Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="card">
          <div class="card-body card-style">
            <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              class="card-img-top card-img"
              alt=""
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )}° </span>/
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
            </div>
          </div>
        </div>
      </div>;`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// Week 5
function displayTemperature(response) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timeNow = document.querySelector("#current-time");
  timeNow.innerHTML = `${currentTime.getHours()}:${minutes}`;

  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
  let newTemperature = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.main.temp;
  newTemperature.innerHTML = Math.round(celsiusTemperature);
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentCondition = document.querySelector(".weather-condition");
  currentCondition.innerHTML = response.data.weather[0].description;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#exampleInputEmail1").value;
  let city = document.querySelector("#location");
  city.innerHTML = citySearch;
  searchCity(citySearch);
}
// Current position
function retrievePosition(position) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

// Unit conversion
function showFahrenheit(event) {
  event.preventDefault();
  let newTemperature = document.querySelector("#current-temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let degree = (celsiusTemperature * 9) / 5 + 32;
  newTemperature.innerHTML = Math.round(degree);
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let newTemperature = document.querySelector("#current-temperature");
  newTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let form = document.querySelector("form");
form.addEventListener("submit", enterCity);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

searchCity("Dnipro");
displayForecast();
