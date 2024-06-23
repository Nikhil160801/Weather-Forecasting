const apiKey = '8f897ba89d6f58f0e8e3f98863108668'; // Replace with your OpenWeatherMap API key

// Getting information of updated weather of a required city 
async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (city) {
        try {
            const currentWeather = await fetchCurrentWeather(city);
            const forecast = await fetchForecast(city);
            displayCurrentWeather(currentWeather);
            displayForecast(forecast);
        } catch (error) {
            alert('An error occurred while fetching the weather data. Please check the city name and try again.');
            console.error(error);
        }
    } else {
        alert('Please enter a city name.');
    }
}


// Fetching the information regarding the weather using an API call
async function fetchCurrentWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch current weather');
    }
    const data = await response.json();
    return data;
}

// Fetching the information regarding the weather forecasting using an API call
async function fetchForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

// This function is used to display the current weather information in the HTML page
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    if (!data || !data.weather || data.weather.length === 0) {
        currentWeatherDiv.innerHTML = `<p>Weather data is unavailable for the specified location.</p>`;
        return;
    }
    
    currentWeatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind speed: ${data.wind.speed} m/s</p>
    <p>Country: ${data.sys.country} </p>
    <p>Date : ${Date()}</p>
    `;
}


// This function is used to update the HTML page of the upcoming weather information(Forecast information)
function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';

    const forecastList = data.list.filter(item => item.dt_txt.endsWith('12:00:00'));
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <span>${day}</span>
                <span>${item.weather[0].description}</span>
                <span>${item.main.temp}°C</span>
            </div>
        `;
    });
}


// --------------------------------------------JSON OBJECT IN data VARIABLE---------------------------------------------------
// {
//     "coord": {
//       "lon": -0.1257,
//       "lat": 51.5085
//     },
//     "weather": [
//       {
//         "id": 800,
//         "main": "Clear",
//         "description": "clear sky",
//         "icon": "01d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 15.0,
//       "feels_like": 14.5,
//       "temp_min": 14.0,
//       "temp_max": 16.0,
//       "pressure": 1023,
//       "humidity": 72
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 3.09,
//       "deg": 240
//     },
//     "clouds": {
//       "all": 0
//     },
//     "dt": 1625212800,
//     "sys": {
//       "type": 2,
//       "id": 2019646,
//       "country": "GB",
//       "sunrise": 1625195554,
//       "sunset": 1625252408
//     },
//     "timezone": 3600,
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
//
//   }
  