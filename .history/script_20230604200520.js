function getWeatherForecast() {
    const city = document.getElementById("city-input").value;
    const startDate = document.getElementById("start-date-input").value;
    const endDate = document.getElementById("end-date-input").value;

    const requestData = {
        city: city,
        start_date: startDate,
        end_date: endDate
    };

    fetch("http://127.0.0.1:8000/weather_forecast, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        const weatherContainer = document.getElementById("weather-container");
        weatherContainer.classList.add("show-results");

        const dateContainer = document.getElementById("date-container");
        const weatherInfo = document.getElementById("weather-info");
        dateContainer.innerHTML = "";
        weatherInfo.innerHTML = "";

        data.forEach(weather => {
            dateContainer.innerHTML += `<div>${weather.date}</div>`;
            weatherInfo.innerHTML += `<div>Temperature: ${weather.temperature}°C</div>
                                        <div>Humidity: ${weather.humidity}%</div>
                                        <div>Wind Speed: ${weather.wind_speed} m/s</div>`;
        });

        const weatherInfoContainer = document.getElementById("weather-info-container");
        weatherInfoContainer.scrollTop = 0; // Scroll to top of the results container
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("get-forecast-btn").addEventListener("click", function() {
    getWeatherForecast();
});
