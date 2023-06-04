import requests
import json

def fetch_weather_data(city):
    """
    Fetches weather data from the OpenWeatherMap API for the specified city.
    """
    api_key = "YOUR_API_KEY"  # Replace with your OpenWeatherMap API key
    base_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    response = requests.get(base_url)
    data = json.loads(response.text)
    return data

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

def get_weather_forecast(city):
    """
    Retrieves the weather forecast for the given city and displays the information.
    """
    data = fetch_weather_data(city)
    
    try:
        temperature, humidity, wind_speed = parse_weather_data(data)
        
        # Display the weather forecast to the user
        print(f"Weather Forecast for {city}:")
        print(f"Temperature: {temperature}°C")
        print(f"Humidity: {humidity}%")
        print(f"Wind Speed: {wind_speed} m/s")
        # Add more weather information as per requirements
    except ValueError as e:
        print(str(e))

# Accept user input for the city
city = input("Enter the city name: ")

# Call the function to get weather forecast
get_weather_forecast(city)
