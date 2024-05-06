document.getElementById('location-form').addEventListener('submit', getWeather);

async function getWeather(e) {
  e.preventDefault(); 
  
  var location = document.getElementById('location-input').value.trim();

  const apiKey = "8bc136a2d34c281e7029491090a86e30";
  
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    

    const data = await res.json();
    displayWeatherData(data);
  } 
  catch(error) 
  {
    displayErrorMessage("Error: City not found");
  }
  finally
  {
    document.getElementById('location-input').value='';
  }
}

function displayErrorMessage(message) {
  var errorMessage = document.getElementById('weather-data');
  
  if(errorMessage) { 
    errorMessage.textContent = message;
  }
}

function displayWeatherData(data) {
  var weatherDataContainer = document.getElementById('weather-data');
  var location = document.getElementById('location-input').value.trim();
  weatherDataContainer.innerHTML = '';

  var cityName = document.createElement('h2');
  cityName.textContent = location;
  var div = document.createElement('div');
  div.append(cityName);
  
  var temperature = document.createElement('p');
  temperature.textContent = `${(data.main.temp-273.15).toFixed(2)}°C`;
  
  var description = document.createElement('p');
  description.textContent = `${data.weather[0].main}`;
  
  weatherDataContainer.appendChild(div);
  
  weatherDataContainer.appendChild(description);
  weatherDataContainer.appendChild(temperature);
}
