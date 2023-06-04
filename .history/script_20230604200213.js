function getWeatherForecast() {
    const city = document.getElementById("city-input").value;
    const startDate = document.getElementById("start-date-input").value;
    const endDate = document.getElementById("end-date-input").value;

    const requestData = {
        city: city,
        start_date: startDate,
        end_date: endDate
    };

    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        const weatherInfoContainer = document.getElementById("weather-info-container");
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = "";

        data.forEach(weather => {
            weatherInfo.innerHTML += `<div>Date: ${weather.date}</div>
                                        <div>Temperature: ${weather.temperature}°C</div>
                                        <div>Humidity: ${weather.humidity}%</div>
                                        <div>Wind Speed: ${weather.wind_speed} m/s</div>`;
        });

        weatherInfoContainer.style.display = "block";
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("submit-btn").addEventListener("click", getWeatherForecast);
