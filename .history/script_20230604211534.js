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
        dateContainer.innerHTML = "";

        data.forEach(weather => {
            const dateInfo = document.createElement("div");
            dateInfo.classList.add("date-info");

            const date = document.createElement("div");
            date.textContent = weather.date;
            date.classList.add("date");
            dateInfo.appendChild(date);

            const weatherInfo = document.createElement("div");
            weatherInfo.classList.add("weather-info");
            weatherInfo.innerHTML = `Temperature: ${weather.temperature}°C<br>
                                    Humidity: ${weather.humidity}%<br>
                                    Wind Speed: ${weather.wind_speed} m/s`;

            dateInfo.appendChild(weatherInfo);
            dateContainer.appendChild(dateInfo);
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("get-forecast-btn").addEventListener("click", function() {
    getWeatherForecast();
});
