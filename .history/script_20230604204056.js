function getWeatherForecast() {
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    const requestData = {
        location: location,
        start_date: startDate,
        end_date: endDate
    };

    fetch("/weather_forecast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";

        data.forEach(forecast => {
            const forecastBox = document.createElement("div");
            forecastBox.className = "forecast-box";

            const date = document.createElement("div");
            date.className = "forecast-date";
            date.textContent = forecast.date;

            const temperature = document.createElement("div");
            temperature.className = "forecast-info";
            temperature.textContent = "Temperature: " + forecast.temperature + "°C";

            const humidity = document.createElement("div");
            humidity.className = "forecast-info";
            humidity.textContent = "Humidity: " + forecast.humidity + "%";

            const windSpeed = document.createElement("div");
            windSpeed.className = "forecast-info";
            windSpeed.textContent = "Wind Speed: " + forecast.wind_speed + " m/s";

            forecastBox.appendChild(date);
            forecastBox.appendChild(temperature);
            forecastBox.appendChild(humidity);
            forecastBox.appendChild(windSpeed);

            forecastContainer.appendChild(forecastBox);
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("get-forecast-btn").addEventListener("click", getWeatherForecast);
