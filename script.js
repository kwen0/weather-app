const location = document.querySelector('#location')
const cityname = document.querySelector('#cityname')
const currenttemp = document.querySelector('#currenttemp')
const icon = document.querySelector('#icon')
const condition = document.querySelector('#condition')
const high = document.querySelector('#high')
const low = document.querySelector('#low')


async function getData(location, unit) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=10f76607761969e3dd7bf41fb74404f6`)
        let data = await response.json()
        console.log(data)
    } catch //throw error
}

getData("brooklyn", "imperial")