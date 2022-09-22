//---------------Date and Time---------------//
let now = new Date();
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
timeInHours = timeInHours ? timeInHours: 12;
console.log(timeInHours);
let timeInMinutes = now.getMinutes();
let dateAndTime = document.querySelector("#dateTime");
if (timeInMinutes < 10) {
  dateAndTime.innerHTML = `${days[today]},  ${timeInHours}:0${timeInMinutes} ${amOrpm}`;
} else {
  dateAndTime.innerHTML = `${days[today]},  ${timeInHours}:${timeInMinutes} ${amOrpm}`;
}
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
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}
function searchPlace(event) {
  event.preventDefault();
  let placeName = document.querySelector("#SearchBar");
  let city = placeName.value.trim().toLowerCase();
  let apiKey = "86e5936d48065a1715f44996856cb061";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  
}
function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "86e5936d48065a1715f44996856cb061";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let celTemp = null;
let geoLocation = navigator.geolocation.getCurrentPosition(searchPosition);
let searchButton = document.querySelector(".submit");
searchButton.addEventListener("click", searchPlace);

//--------------------unit conversion-----------//
function farhenheitScale(event) {
  event.preventDefault();
  document.querySelector("#celsius").style.color = "#03045e";
  document.querySelector("#farhenheit").style.color="#03045e";
  farTemp =((celTemp * 9) / 5 + 32);
  console.log(farTemp);
  document.querySelector("#temperature").innerHTML = Math.round(farTemp);
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", celsiusScale);
}
function celsiusScale(event) {
  event.preventDefault();
  document.querySelector("#farhenheit").style.color = "#09a0be";
  document.querySelector("#celsius").style.color = "#03045e";
  let cTemp = Math.round(((farTemp - 32) * 5) / 9);
  console.log(cTemp);
  document.querySelector("#temperature").innerHTML=cTemp;
}
let farTemp = null;
let farhenheit = document.querySelector("#farhenheit");
farhenheit.addEventListener("click", farhenheitScale);

