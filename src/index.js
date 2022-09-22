//---------------Date and Time---------------//
let now = new Date();
let date = now.getDate();
let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let today = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let timeInHours = now.getHours();
let amOrpm = timeInHours >= 12 ? "pm" : "am";
timeInHours = timeInHours % 12;
console.log(timeInHours);
timeInHours = timeInHours ? timeInHours : 12;
console.log(timeInHours);
let timeInMinutes = now.getMinutes();
let dateAndTime = document.querySelector("#dateTime");
if (timeInMinutes < 10) {
  dateAndTime.innerHTML = `${date} ${months[month]}, ${days[today]},  ${timeInHours}:0${timeInMinutes} ${amOrpm}`;
} else {
  dateAndTime.innerHTML = `${date} ${months[month]}, ${days[today]},  ${timeInHours}:${timeInMinutes} ${amOrpm}`;
}
//----------------forecast------------//
/*
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.list;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.main.temp_max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.main.temp_min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function forecastWeather(coords) {
  let lat = coords.lat;
  let lon = coords.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}*/
//---------------Place----------//

function showWeather(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed * 2.23694);
  celTemp = response.data.main.temp;
  let icon = response.data.weather[0].icon;
  document.querySelector("#city").innerHTML = cityName;
  document.querySelector("#description").innerHTML = weatherDescription;
  document.querySelector("#humidity").innerHTML = `Humidity : ${humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind : ${speed} mph`;
  document.querySelector("#temperature").innerHTML = Math.round(celTemp);
  document
    .querySelector("#icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  //forecastWeather(response.data.coord);
}
function searchPlace(event) {
  event.preventDefault();
  let placeName = document.querySelector("#SearchBar");
  let city = placeName.value.trim().toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let celTemp = null;
let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
let geoLocation = navigator.geolocation.getCurrentPosition(searchPosition);
let searchButton = document.querySelector(".submit");
searchButton.addEventListener("click", searchPlace);

//--------------------unit conversion-----------//
function farhenheitScale(event) {
  event.preventDefault();
  document.querySelector("#celsius").style.color = "#0083a1";
  document.querySelector("#farhenheit").style.color = "#03045e";
  farTemp = (celTemp * 9) / 5 + 32;
  console.log(farTemp);
  document.querySelector("#temperature").innerHTML = Math.round(farTemp);
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", celsiusScale);
}
function celsiusScale(event) {
  event.preventDefault();
  document.querySelector("#farhenheit").style.color = "#0083a1";
  document.querySelector("#celsius").style.color = "#03045e";
  let cTemp = Math.round(((farTemp - 32) * 5) / 9);
  console.log(cTemp);
  document.querySelector("#temperature").innerHTML = cTemp;
}
let farTemp = null;
let farhenheit = document.querySelector("#farhenheit");
farhenheit.addEventListener("click", farhenheitScale);
