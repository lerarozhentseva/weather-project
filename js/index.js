const htmlBody = document.querySelector("body")

function curentDate(time){
  const date = new Date(time)
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString()
  return `${day}.${month}.${year}`
}

function dateInHtml(date){
  htmlBody.insertAdjacentHTML("beforeend", `
  <h1 class="date">
    Today: ${date}
  </h1>
  `)
}

dateInHtml(curentDate(Date.now()))


function getSerchPanel(){
  return `
  <div class="container error-conteiner">
    <div class="input-container">
      <input class="input" placeholder="Enter city or country name" type="text" />
      <button class="button button-search">Search</button>
      <button class="button button-geolocation">
        <img src="./images/map.svg" alt="Geolocation">
      </button>
    </div>
  </div>
`
}

function searchPanelInHtml(){
  htmlBody.insertAdjacentHTML("beforeend", getSerchPanel())
}

searchPanelInHtml()


const searchBtn = document.querySelector(".button-search")
const geoBtn = document.querySelector(".button-geolocation")
const inputForm = document.querySelector(".input")
const celsius = "metric";
const fahrenheit = "imperial";

import {getCurrentApiUrl, request} from "./api-service.js"
import {locationNavigator} from "./geolocation.js"

searchBtn.addEventListener("click", () => {
  if(document.querySelector(".container-main")){
  document.querySelector(".container-main").remove()
  }
  if(document.querySelector(".container-forecast")){
    document.querySelector(".container-forecast").remove()
  }
  btnsDisability(true)
  loader("container-main")
  loader("container-forecast")
  request(getCurrentApiUrl(inputForm.value, celsius))
})


export function btnsDisability(bool){
  if(bool){
    searchBtn.setAttribute("disabled", "disabled");
    geoBtn.setAttribute("disabled", "disabled");
    inputForm.setAttribute("disabled", "disabled");
  }else{
    searchBtn.removeAttribute("disabled");
    geoBtn.removeAttribute("disabled");
    inputForm.removeAttribute("disabled");
  }
}


function loader(place){
  htmlBody.insertAdjacentHTML("beforeend", `
    <div class="container ${place}">
      <img src="./images/loading.svg" class="loader"></img>
    </div>
  `)
}

export function tempBtns(){
  const celsiusBtn = document.querySelector(".celsius")
  const fahrenheitBtn = document.querySelector(".fahrenheit")
  const city = document.querySelector(".city-name").innerText
  fahrenheitBtn.addEventListener("click",() => {
    if(document.querySelector(".container-main")){
      document.querySelector(".container-main").remove()
    }
    if(document.querySelector(".container-forecast")){
      document.querySelector(".container-forecast").remove()
    }
    btnsDisability(true)
    loader("container-main")
    loader("container-forecast")
    request(getCurrentApiUrl(city, fahrenheit)).then(() => {
      document.querySelector(".fahrenheit").classList.add("temp-type-active")
      document.querySelector(".celsius").classList.remove("temp-type-active")
    })
  })
  celsiusBtn.addEventListener("click", () => {
    if(document.querySelector(".container-main")){
      document.querySelector(".container-main").remove()
    }
    if(document.querySelector(".container-forecast")){
      document.querySelector(".container-forecast").remove()
    }
    btnsDisability(true)
    loader("container-main")
    loader("container-forecast")
    request(getCurrentApiUrl(city, celsius)).then(() => {
      fahrenheitBtn.classList.remove("temp-type-active") 
      celsiusBtn.classList.add("temp-type-active")
    })
  })
}

geoBtn.addEventListener("click", () => {
  if(document.querySelector(".container-main")){
    document.querySelector(".container-main").remove()
  }
  if(document.querySelector(".container-forecast")){
    document.querySelector(".container-forecast").remove()
  }
  btnsDisability(true)
  loader("container-main")
  loader("container-forecast")
  locationNavigator()
})
