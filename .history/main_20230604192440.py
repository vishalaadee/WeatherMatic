from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests, datetime
import json

app = FastAPI()

class WeatherForecastRequest(BaseModel):
    city: str
    start_date: str
    end_date: str

class WeatherForecastResponse(BaseModel):
    date: str
    temperature: float
    humidity: int
    wind_speed: float

def fetch_weather_data(city):
    """
    Fetches weather data from the OpenWeatherMap API for the specified city.
    """
    api_key = "YOUR_API_KEY"  # Replace with your OpenWeatherMap API key
    base_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    response = requests.get(base_url)

    if response.status_code == 200:
        data = json.loads(response.text)
        return data
    else:
        raise HTTPException(status_code=400, detail="Error fetching weather data")

def parse_weather_data(data):
    """
    Parses the weather data and extracts relevant information.
    """
    try:
        if 'main' in data and 'temp' in data['main'] and 'humidity' in data['main'] and 'wind' in data and 'speed' in data['wind']:
            temperature = data['main']['temp']
            humidity = data['main']['humidity']
            wind_speed = data['wind']['speed']
            # Add more relevant weather information as per requirements
            return temperature, humidity, wind_speed
        else:
            raise ValueError("Invalid weather data received.")
    except KeyError:
        raise ValueError("Invalid weather data received.")

@app.post("/weather_forecast")
def get_weather_forecast(request: WeatherForecastRequest):
    """
    Retrieves the weather forecast for the given city and duration (dates) and returns the information.
    """
    data = fetch_weather_data(request.city)

    try:
        temperature, humidity, wind_speed = parse_weather_data(data)

        # Prepare the weather forecast response
        response = []
        start_date = datetime.datetime.strptime(request.start_date, "%Y-%m-%d")
        end_date = datetime.datetime.strptime(request.end_date, "%Y-%m-%d")
        delta = end_date - start_date

        for i in range(delta.days + 1):
            date = start_date + datetime.timedelta(days=i)
            weather = WeatherForecastResponse(
                date=date.strftime("%Y-%m-%d"),
                temperature=temperature,
                humidity=humidity,
                wind_speed=wind_speed
            )
            response.append(weather)

        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
