//date
let now = new Date();
function formatDate(date) {
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
      "February",
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
   let year = date.getFullYear();
   let day = days[date.getDay()];
   let month = months[date.getMonth()];
   let number = date.getDate();

   let today = `${day} ${month} ${number}, ${year}`;

   return today;
}
let calendar = document.querySelector("#calendar");
calendar.innerHTML = formatDate(now);
//time
function pad(minute) {
   if (minute < 10) {
      return `0` + minute;
   } else {
      return minute;
   }
}
let hour = pad(now.getHours());
let minute = pad(now.getMinutes());
let time = document.querySelector("#time");
time.innerHTML = `${hour}:${minute}`;

//Weather API
function getForecast(coordinates) {
   let apiKey = `c4e498a3faf187722534t4baf80f1o62`;
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
   axios.get(apiUrl).then(displayForecast);
}

function searchWeather(response) {
   let tempResponse = Math.round(response.data.temperature.current);
   let nowTemp = document.querySelector("#now-temp");
   let icon = document.querySelector("#now-icon");

   fahrenheitTemp = response.data.temperature.current;

   document.querySelector("h1").innerHTML = response.data.city;
   document.querySelector("#humidity").innerHTML = Math.round(
      response.data.temperature.humidity
   );
   document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.wind.speed
   );
   document.querySelector("#description").innerHTML =
      response.data.condition.description;
   nowTemp.innerHTML = tempResponse;
   icon.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
   );
   icon.setAttribute("alt", response.data.condition.icon);

   getForecast(response.data.coordinates);
}

function search(city) {
   let apiUrl = `https://api.shecodes.io/weather/v1/current?`;
   let apiKey = `c4e498a3faf187722534t4baf80f1o62`;
   axios
      .get(`${apiUrl}query=${city}&key=${apiKey}&units=imperial`)
      .then(searchWeather);
}
function handleSubmit(event) {
   event.preventDefault();
   let city = document.querySelector("#city-input").value;
   search(city);
}
//search bar
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

//

function currentGeo(position) {
   let lat = position.coords.latitude;
   let lon = position.coords.longitude;
   let apiUrl = `https://api.shecodes.io/weather/v1/current?`;
   let apiKey = `c4e498a3faf187722534t4baf80f1o62`;
   axios
      .get(`${apiUrl}&lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`)
      .then(searchWeather);
}
function activateGeo(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(currentGeo);
}
//current location button
let currentButton = document.querySelector("#current-location");
currentButton = currentButton.addEventListener("click", activateGeo);

//Temp conversion cel to fah
function celConversion(event) {
   event.preventDefault();
   celcius.classList.add("active");
   fahrenheit.classList.remove("active");
   let nowTemp = document.querySelector("#now-temp");
   let celciusTemp = (fahrenheitTemp - 32) * (5 / 9);

   nowTemp.innerHTML = Math.round(celciusTemp);
}

function fahConversion(event) {
   event.preventDefault();
   celcius.classList.remove("active");
   fahrenheit.classList.add("active");
   let nowTemp = document.querySelector("#now-temp");
   nowTemp.innerHTML = Math.round(fahrenheitTemp);
}

//

function displayForecast(response) {
   let forecast = response.data.daily;
   let forecastElement = document.querySelector("#forecast");
   let day = ["Mon", "Tues", "Wed", "Thurs"];
   let forecastHTML = `<div class="row">`;
   day.forEach(function (day) {
      forecastHTML =
         forecastHTML +
         `<div class="col-3">
         <span class="forecastDay">${day}</span>
         <p class="col forecastTemp"><i class="fa-solid fa-sun fa-beat"></i> <span id="max"> 55°</span>  <span id="min">50°</span></p>
         </div>`;
   });
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
}

let fahrenheitTemp = null;
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", celConversion);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahConversion);

search("San-Diego");
displayForecast();
