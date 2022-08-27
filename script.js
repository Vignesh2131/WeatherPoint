let lat;
let lon;

const API_KEY = "176498bfe205211ad90dfaae98a5e060";
const kelvin = +273.15;
const container = document.querySelector(".weather");
const input = document.getElementById("city_name");
const btn_info = document.querySelector(".get_info");
const close_btn = document.querySelector(".close");
const city_container = document.querySelector(".city_data");

//Used to fimd the current coordinates
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findWeather);
    //returns position
  } else {
    console.log("Geolocation is not supported");
  }
}

function findWeather(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  //Using fetch API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const markUp = `
      <section id="info">
      <div id="details">
  
        <div class="city-name"><span>City</span> : ${data.name}</div>
        <div class="humidity"><span>Humidity</span> : ${
          data.main.humidity
        }%</div>
        <div class="Cloudiness"><span>Cloudiness</span> : ${
          data.weather[0].description
        }</div>
      </div>
      <div class="temp-container">${Math.ceil(+data.main.temp - kelvin)}°C</div>
    </section>
    <div class="more-info">
      <div class="feels-like">Feels like : ${Math.ceil(
        +data.main.feels_like - kelvin
      )}°C</div>
      <div class="pressure">Pressure : ${data.main.pressure} hPa</div>
     
    </div>`;

      container.insertAdjacentHTML("beforeend", markUp);
    });
}

// //Getting current location of data after loading the window
window.addEventListener("load", getLocation);

////For city
function getLocation2() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findWeather2);
    //returns position
  } else {
    console.log("Geolocation is not supported");
  }
}

function findWeather2(position) {
  if (!input.value) alert("enter the city name");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const markUp = `
      <div class="forecast">
      <div class="temp">Temperature <img src="/images/temperature.png"class="temp_logo" alt="temp_logo" srcset="" /> : ${Math.ceil(
        +data.main.temp - kelvin
      )}°C</div>
      <div class="city_name">City  <img src="/images/architecture-and-city (1).png" alt="city_name" /> : ${
        data.name
      }</div>
      <div class="humidity">Humidity   <img src="/images/humidity.png" alt="humidity_logo" /> : ${
        data.main.humidity
      }%</div>
      <div class="cloudiness">Cloudiness <img src="/images/clouds.png" alt="clouds_logo" /> : ${
        data.weather[0].description
      }</div>
    </div>`;
      console.log(data);
      city_container.insertAdjacentHTML("beforeend", markUp);
    });
}
//Event listener for btn
btn_info.addEventListener("click", function () {
  getLocation2();
  btn_info.classList.add("hidden");
  close_btn.classList.remove("hidden");
  close_btn.addEventListener("click", function () {
    city_container.innerHTML = "";
    input.value = "";
    close_btn.classList.add("hidden");
    btn_info.classList.remove("hidden");
  });
});
