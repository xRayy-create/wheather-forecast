const cityInput = document.querySelector(".header__search-input")
const currentTime = document.querySelector(".current_wrapper__day-info")
const currentDay = document.querySelector(".day")
const currentData = document.querySelector(".date")
const cityLocation = document.querySelector(".location-field__text")
const temp = document.querySelector(".temp-main")
const tempFeelsLike = document.querySelector(".temp-feels")
const weatherSummaryImg = document.querySelector(".current_weather__icon")
const apiKey = "18969bcfacab596978d9d62378c78b5f"

cityInput.addEventListener('keydown', async (event) => {
    if (
        event.key == "Enter" && 
        cityInput.value.trim() != ""
        
    ) {
    const data = await getWeatherData(cityInput.value)
    getCurrentWeatherDate(data)
    cityLocation.textContent = cityInput.value.toLowerCase().replace(/^./, char => char.toUpperCase());
    }
})

async function getWeatherData(cityName) {
    const weatherCoords = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
    const responseNumberOne = await weatherCoords.json()

    const {lat, lon} = responseNumberOne[0]

    const currnetWeather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const responseNumberThree = await currnetWeather.json()

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const responseNumberTwo = await weatherRes.json()
    return {responseNumberOne, responseNumberTwo, responseNumberThree}; 
}

function getCurrentTime() {
    const currentDate = new Date()
    const options = {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }
    currentDay.textContent = currentDate.toLocaleDateString("en-GB", {weekday: "long"})
    currentData.textContent = currentDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short",  year: "numeric"})
}
getCurrentTime()

function getWeatherIcon (imgId) {
    // console.log(imgId.responseNumberThree.weather[0].id);
    if (imgId <= 202) return "thunderstorm.svg"
    if (imgId <= 321) return "drizzle.svg"
    if (imgId <= 503) return "rain.svg"
    if (imgId <= 622) return "snow.svg"
    if (imgId <= 741) return "atmosphere.svg"
    if (imgId <= 800) return "sunning.svg"
    if (imgId <= 801) return "clear.svg"
    return "clouds.svg"
}

function getCurrentWeatherDate(data) {
    temp.textContent = Math.round(data.responseNumberThree.main.temp) + "°C"
    tempFeelsLike.textContent = "Feels like " + Math.round(data.responseNumberThree.main.feels_like) + "°"
    const imgId = data.responseNumberThree.weather[0].id;
    console.log(weatherSummaryImg);
    weatherSummaryImg.src = `./icons/${getWeatherIcon(imgId)}`;
} 