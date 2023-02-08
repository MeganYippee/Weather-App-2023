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
function searchWeather(response) {
   console.log(response);
   let tempResponse = Math.round(response.data.temperature.current);
   let nowTemp = document.querySelector("#now-temp");
   let icon = document.querySelector("#now-icon");
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

search("San-Diego");
//

//Temp conversion cel to fah
function celConversion(event) {
   event.preventDefault();
   let temperature = nowTemp.innerHTML;
   nowTemp.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

function fahConversion(event) {
   event.preventDefault();
   let temperature = nowTemp.innerHTML;
   nowTemp.innerHTML = Math.round((temperature - 32) * (5 / 9));
}
let nowTemp = document.querySelector("#now-temp");
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", celConversion);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahConversion);
