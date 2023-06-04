function getWeatherForecast() {
    const city = document.getElementById("location-input").value;
    const startDate = document.getElementById("from-date-input").value;
    const endDate = document.getElementById("to-date-input").value;

    const requestData = {
        city: city,
        start_date: startDate,
        end_date: endDate
    };

    fetch('http://127.0.0.1:8000/weather_forecast', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("get-forecast-btn").addEventListener("click", function() {
    getWeatherForecast();
});
