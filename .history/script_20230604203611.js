function getWeatherForecast() {
    const locationInput = document.getElementById("location-input");
    const location = locationInput.value;

    fetch(`/weather_forecast?location=${location}`)
        .then(response => response.json())
        .then(data => {
            const dateContainer = document.getElementById("date-container");
            const weatherInfo = document.getElementById("weather-info");

            dateContainer.innerHTML = "";
            weatherInfo.innerHTML = "";

            if (data.error) {
                weatherInfo.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                data.forEach(weather => {
                    dateContainer.innerHTML += `<p>${weather.date}</p>`;
                    weatherInfo.innerHTML += `<p>Temperature: ${weather.temperature}°C</p>
                                               <p>Humidity: ${weather.humidity}%</p>
                                               <p>Wind Speed: ${weather.wind_speed} m/s</p>`;
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const getForecastButton = document.getElementById("get-forecast-btn");
getForecastButton.addEventListener("click", getWeatherForecast);
