// Feature #1
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
  ];

let day = document.querySelector("#day");
day.innerHTML = days[currentTime.getDay()];

let month = document.querySelector("#month");
month.innerHTML = months[currentTime.getMonth()]; 

let today = document.querySelector("#today");
today.innerHTML = currentTime.getDate();

let year = document.querySelector("#year");
year.innerHTML = currentTime.getFullYear();


// Week 5
function displayTemperature(response) {
  let currentLocation = document.querySelector("#location");
  currentLocation.innerHTML = response.data.name;
  let newTemperature = document.querySelector("#current-temperature")
  newTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentCondition = document.querySelector(".weather-condition");
  currentCondition.innerHTML = Math.round(response.data.weather[0].main);
}

function searchCity(citySearch) {
  let apiKey = "b6ca4253c79c3ef56a82a564e734f0ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#exampleInputEmail1").value;
  let city = document.querySelector("#location")
  city.innerHTML = citySearch;
  searchCity(citySearch);
}
// Current position
function retrievePosition(position) {
  let apiKey = "b6ca4253c79c3ef56a82a564e734f0ee";
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

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

// Feature #3
//function showCelsius() {
    //temperature.innerHTML = "30";
//}

//function showFahrenheit() {
    //let degree = ((30*9)/5+32);
    //temperature.innerHTML = degree;
//}

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", showCelsius);
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", showFahrenheit); 

