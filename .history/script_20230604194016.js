let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
        draggable: true
    });

    google.maps.event.addListener(marker, "dragend", function() {
        const latLng = marker.getPosition();
        const lat = latLng.lat();
        const lng = latLng.lng();

        // Update the latitude and longitude inputs with the selected location
        document.getElementById("latitude-input").value = lat;
        document.getElementById("longitude-input").value = lng;
    });
}

function getWeatherForecast() {
    const latitude = parseFloat(document.getElementById("latitude-input").value);
    const longitude = parseFloat(document.getElementById("longitude-input").value);
    const startDate = document.getElementById("start-date-input").value;
    const endDate = document.getElementById("end-date-input").value;

    const requestData = {
        latitude: latitude,
        longitude: longitude,
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

document.getElementById("select-location-btn").addEventListener("click", function() {
    // Open the map in a new window for location selection
    window.open("map.html", "_blank");
});

document.getElementById("submit-btn").addEventListener("click", getWeatherForecast);
