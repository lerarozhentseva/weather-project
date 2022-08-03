
const htmlBody = document.querySelector("body")

export function getCurentForecast(data){
  const temp = Math.round(data.main.temp)
  const tempMax = Math.round(data.main.temp_max)
  const tempMin = Math.round(data.main.temp_min)
  const visibility = Math.round(data.visibility / 1000)
  return`
    <div class="container container-main">
      <div class="main-body">
        <div class="main-info">
          <div class="city">
            <span class="uppercase city-name">${data.name}</span> 
            <span class="type">${data.weather[0].description}</span>
          </div>
          <img class="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
          <div class="temp">
            <div class="temp-value">
            <div>${temp}</div> 
              <div class="temp-controls"> 
                <button class="temp-type temp-type-active celsius">°C</button>
                <span>|</span>
                <button class="temp-type fahrenheit">°F</button>
              </div>
            </div>
            <div>(min. ${tempMin} °C / max. ${tempMax} °C)</div> 
          </div>
        </div>
        <div class="info">
        <div class="info-row">
            <div class="info-row-label">Wind</div>
            <div class="info-row-value">${data.wind.speed} m/s</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Humidity</div>
            <div class="info-row-value">${data.main.humidity}%</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Pressure</div>
            <div class="info-row-value">${data.main.pressure} mb</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Clound</div>
            <div class="info-row-value">${data.clouds.all}%</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Sunrise</div>
            <div class="info-row-value">${sunDate(data.sys.sunrise)}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Sunset</div>
            <div class="info-row-value">${sunDate(data.sys.sunset)}</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Visibility</div>
            <div class="info-row-value">${visibility} km</div>
          </div>
          <div class="info-row">
            <div class="info-row-label">Precipitation</div>
            <div class="info-row-value">${(data?.rain?.['1h']) ||  (data?.snow?.['1h']) || "0"} mm</div>
          </div>
        </div>
      </div>
    </div>
  ` 
}

function sunDate(sec){
  const date = new Date(sec * 1000)
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`
}

export function curentForecastInHTML(html){
  htmlBody.insertAdjacentHTML("beforeend", html)
}

export function hoursForecastInHTML(data, count){
  htmlBody.insertAdjacentHTML("beforeend", `
    <div class="container container-forecast" data-component="">
      <div class="container-title">24-Hour Forecast</div>
      <div class="forecast"></div>
    </div>
  `)
  const hoursForecastConteiner = document.querySelector(".forecast")
  for(let i = 0; i < count; i++){
    const time = inHours(data.hourly[i].dt)
    const date = curentDate(new Date(data.hourly[i].dt * 1000) + Date.now())
    const description = data.hourly[i].weather[0].description;
    const icon = data.hourly[i].weather[0].icon;
    const temp = Math.round(data.hourly[i].temp)
    hoursForecastConteiner.insertAdjacentHTML("beforeend", `
      <div class="forecast-item">
        <div class="fotecast-item-type fotecast-item-date">${date}</div>
        </hr>
        <div class="fotecast-item-date">${time}</div>
        <div class="fotecast-item-type">${description}</div>
        <img class="forecast-item-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
        <div class="forecast-item-temp">${temp} °C</div>
      </div>
    `)
  }
}
  
function inHours(sec){
  const date = new Date(sec * 1000)
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:00`
}

function curentDate(time){
  const date = new Date(time)
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString()
  return `${day}.${month}.${year}`
}