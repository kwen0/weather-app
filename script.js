const searchForm = document.querySelector('#searchform')
const city = document.querySelector('#city')
const currentCity = document.querySelector('#currentcity')
const currentTemp = document.querySelector('#currenttemp')
const icon = document.querySelector('#icon')
const condition = document.querySelector('#condition')
const high = document.querySelector('#high')
const low = document.querySelector('#low')
const fahrenheitBtn = document.querySelector('#F')
const celsiusBtn = document.querySelector('#C')


function storeData(currentCity, currentTemp, icon, condition, high, low) {
    return { currentCity, currentTemp, icon, condition, high, low }
}

async function getData(place, unit) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&APPID=10f76607761969e3dd7bf41fb74404f6`)
    let data = await response.json()
    return cityData = storeData(data.name, Math.round(data.main.temp), data.weather[0].icon, data.weather[0].description, Math.round(data.main.temp_max), Math.round(data.main.temp_min))
}

searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    await getData(city.value, "imperial")
    renderData(cityData)
    city.value = null;
})

function renderData(info) {
    currentCity.textContent = info.currentCity
    currentTemp.textContent = `${info.currentTemp}°`
    condition.textContent = info.condition
    high.textContent = `H: ${info.high}°`
    low.textContent = `L: ${info.low}°`
}
