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
let weatherIcon = document.querySelector('#weathericon')
const todaycard = document.querySelector("#today-card")

function storeCurrentData(currentCity, currentTemp, icon, condition, high, low) {
    return { currentCity, currentTemp, icon, condition, high, low }
}

async function getCurrentData(city, unit) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=10f76607761969e3dd7bf41fb74404f6`)
        const data = await response.json()
        return currentWeatherData = storeCurrentData(data.name, Math.round(data.main.temp), data.weather[0].icon, data.weather[0].description, Math.round(data.main.temp_max), Math.round(data.main.temp_min))
    } catch (err) {
        return
    }
}

async function getImage(condition) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?query=${condition}&orientation=landscape&client_id=ZjXw3gEFimd3x4Nz8jskJP8NfYJRwelEOrz1cL1X-N8`)
        const photo = await response.json()
        const url = photo.urls.regular
        todaycard.style.backgroundImage = `url('${url}')`
        todaycard.style.backgroundSize = "cover"
    } catch (err) {
        return
    }
}

searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    currentWeatherData = { ...currentWeatherData, icon: "" };
    const selectedUnit = document.querySelector(".selected")
    if (selectedUnit.id === "F") {
        await getCurrentData(city.value, "imperial")
    } else {
        await getCurrentData(city.value, "metric")
    }
    renderCurrentData(currentWeatherData)
    renderBackgoundImage(currentWeatherData)
    city.value = null;
})

function renderCurrentData(data) {
    currentCity.textContent = data.currentCity
    currentTemp.textContent = `${data.currentTemp}°`
    condition.textContent = data.condition
    high.textContent = `H: ${data.high}°`
    low.textContent = `L: ${data.low}°`
}

function renderBackgoundImage(data) {
    if (data.icon === "01d") {
        getImage("sun")
    } else if (data.icon === "01n") {
        getImage("night-sky")
    } else if (data.icon === "02d" || data.icon === "03d" || data.icon === "04d") {
        getImage("clouds")
    } else if (data.icon === "02n" || data.icon === "03n" || data.icon === "04n") {
        getImage("cloudy-night")
    } else if (data.icon === "09d" || data.icon === "10d") {
        getImage("rain")
    } else if (data.icon === "09n" || data.icon === "10n") {
        getImage("night-rain")
    } else if (data.icon === "13d" || data.icon === "13n") {
        getImage("snow")
    } else if (data.icon === "50d" || data.icon === "50n") {
        getImage("mist")
    } else { return }
}

fahrenheitBtn.addEventListener('click', async e => {
    celsiusBtn.classList.remove("selected")
    fahrenheitBtn.classList.add("selected")
    await getCurrentData(currentCity.textContent, "imperial")
    renderCurrentData(currentWeatherData)
})

celsiusBtn.addEventListener('click', async e => {
    fahrenheitBtn.classList.remove("selected")
    celsiusBtn.classList.add("selected")
    await getCurrentData(currentCity.textContent, "metric")
    renderCurrentData(currentWeatherData)
})

// default
async function load() {
    await getCurrentData("New York", "imperial")
    renderCurrentData(currentWeatherData)
    renderBackgoundImage(currentWeatherData)
}

load();
