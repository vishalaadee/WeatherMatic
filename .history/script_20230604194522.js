function getWeatherForecast() {
    const city = document.getElementById("city-input").value;
    const startDate = document.getElementById("start-date-input").value;
    const endDate = document.getElementById("end-date-input").value;

    const requestData = {
        city: city,
        start_date: startDate,
        end_date: endDate
    };

    // Send the request to the backend API
    fetch("/weather_forecast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.innerHTML = "";

        data.forEach(weather => {
            weatherInfo.innerHTML += `<div>Date: ${weather.date}</div>
                                        <div>Temperature: ${weather.temperature}°C</div>
                                        <div>Humidity: ${weather.humidity}%</div>
                                        <div>Wind Speed: ${weather.wind_speed} m/s</div>`;
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("submit-btn").addEventListener("click", getWeatherForecast);

function initMap() {
    const mapContainer = document.getElementById("map");
    const selectLocationBtn = document.getElementById("select-location-btn");

    // Initialize the map
    const map = new google.maps.Map(mapContainer, {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    // Add marker functionality
    let marker;

    google.maps.event.addListener(map, "click", function(event) {
        if (marker) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true
        });
    });

    // Handle the "Select Location" button click
    selectLocationBtn.addEventListener("click", function() {
        if (marker) {
            const selectedLocation = marker.getPosition();
            const latitude = selectedLocation.lat();
            const longitude = selectedLocation.lng();

            // Pass the selected location to the backend API
            fetch("/selected_location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ latitude: latitude, longitude: longitude })
            })
            .then(response => {
                if (response.ok) {
                    console.log("Selected location sent to the backend.");
                } else {
                    console.error("Error sending selected location to the backend.");
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    });
}

google.maps.event.addDomListener(window, "load", initMap);
