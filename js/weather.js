const WEATHER_API_KEY = "3238da6bd63d7b84c8b845568b8d93aa";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector(".weather-wrap #country");
      const weatherTemp = document.querySelector(".weather-wrap #temperature");
      const weatherCondition = document.querySelector(".weather-wrap #condition");
      city.innerText = `현재 위치 : ${data.name}`;
      weatherTemp.innerText = `온도 : ${data.main.temp}℃`;
      weatherCondition.innerText = `상태 : ${data.weather[0].main}`;
    });
}

function onGeoError(position) {
  alert("I can't Find you!");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
