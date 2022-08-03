import {getCurentForecast, curentForecastInHTML, hoursForecastInHTML} from "./codeInHTML.js"
import {btnsDisability, tempBtns} from "./index.js"

const inputForm = document.querySelector(".input")
const errorConteiner = document.querySelector(".error-conteiner")
const API_KEY = "adc6ba2de67ce70d2067f92b9b283afc";
const celsius = "metric";

export function getCurrentApiUrl(city, units) {
  return ` http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
}

export async function geolocationTownReqest(url){
  let requestTown;
  try{
    const response = await fetch(url); 
    if(!response.ok){
      throw new Error(`${response.status}`);
    }
    const data = await response.json()
    requestTown = data[0].name
  }catch{
    errorConteiner.insertAdjacentHTML("beforeend", `
      <div class="error">${err}</div>
    `)
    const errorDiv = document.querySelector(".error")
    inputForm.addEventListener("focus", () => { errorDiv.remove() })
  }
  return requestTown
}

export async function request(url){
  try{
    const response = await fetch(url); 
    const data = await response.json()
    if(!response.ok){
      throw new Error(`${response.status}`);
    }
    hoursRequest(getsHoursUrl(data.coord.lat, data.coord.lon))
    curentForecastInHTML(getCurentForecast(data))
    tempBtns()
  }catch(err) {
    errorConteiner.insertAdjacentHTML("beforeend", `
      <div class="error">${err}</div>
    `)
    const errorDiv = document.querySelector(".error")
    inputForm.addEventListener("focus", () => {
      errorDiv.remove()
    })
    document.querySelector(".container-forecast").remove()
  }finally{
    document.querySelector(".container-main").remove()
    btnsDisability(false)
    document.querySelector(".input").value = ""
  }
}

function getsHoursUrl(lat, lon){
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API_KEY}&units=${celsius}`
}
    
    
async function hoursRequest(url){
  try{
    const response = await fetch(url); 
    const data = await response.json()
    if(!response.ok){
      throw new Error(`${response.status}`);
    }
    hoursForecastInHTML(data, 24)
  }catch(err) {
    document.querySelector(".error-conteiner").insertAdjacentHTML("beforeend", `
      <div class="error">${err}</div>
    `)
    const errorDiv = document.querySelector(".error")
    document.querySelector(".input").addEventListener("focus", () => {
      errorDiv.remove()
    })
  }finally{
    document.querySelector(".container-forecast").remove()
    btnsDisability(false)
  }
}