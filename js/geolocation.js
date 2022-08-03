import {geolocationTownReqest, request, getCurrentApiUrl} from "./api-service.js"

const inputForm = document.querySelector(".input")
const errorConteiner = document.querySelector(".error-conteiner")
const celsius = "metric";
const fahrenheit = "imperial";
const API_KEY = "adc6ba2de67ce70d2067f92b9b283afc";

function geoUrl(location){
  const crd = location.coords;
  const lat = crd.latitude
  const lon = crd.longitude 
  return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
}
  
async function success(loc) {
  const city = geolocationTownReqest(geoUrl(loc))
  request(getCurrentApiUrl( await city, celsius))
};
  

function error(err) {
  errorConteiner.insertAdjacentHTML("beforeend", `
    <div class="error">ERROR(${err.code}): ${err.message}</div>
  `)
  const errorDiv = document.querySelector(".error")
  inputForm.addEventListener("focus", () => {
    errorDiv.remove()
  })
};


export function locationNavigator(){
  navigator.geolocation.getCurrentPosition(success, error)
}