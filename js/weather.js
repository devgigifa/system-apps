// weather.js

// Configuração inicial da API Open-Meteo
const apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';
const locationButton = document.querySelector('.location-button');
const weatherTemp = document.querySelector('.weather-temp');
const weatherDesc = document.querySelector('.weather-desc');
const locationElem = document.querySelector('.location');
const dateDayname = document.querySelector('.date-dayname');
const dateDay = document.querySelector('.date-day');
const weatherIcon = document.querySelector('.weather-icon');
const todayInfo = {
  precipitation: document.querySelector('.precipitation .value'),
  humidity: document.querySelector('.humidity .value'),
  wind: document.querySelector('.wind .value'),
};
const weekList = document.querySelector('.week-list');

// Função para buscar clima por localização
async function fetchWeather(city) {
  try {
    // Obter coordenadas da cidade usando a API GeoNames
    const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.results && geocodeData.results.length > 0) {
      const { latitude, longitude, name, country } = geocodeData.results[0];

      // Buscar dados do clima na API Open-Meteo
      const weatherResponse = await fetch(`${apiBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
      const weatherData = await weatherResponse.json();

      updateWeather(weatherData, name, country);
      updateForecast(weatherData.daily);
    } else {
      alert('Localização não encontrada. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do clima:', error);
  }
}

// Atualiza os dados do clima na interface
function updateWeather(data, cityName, countryCode) {
  const { current_weather } = data;
  const date = new Date();

  locationElem.textContent = `${cityName}, ${countryCode}`;
  weatherTemp.textContent = `${Math.round(current_weather.temperature)}°C`;
//   weatherDesc.textContent = mapWeatherDescription(current_weather.weathercode);
  dateDayname.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
  dateDay.textContent = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  weatherIcon.setAttribute('data-feather', mapWeatherIcon(current_weather.weathercode));
  feather.replace();

  todayInfo.precipitation.textContent = `${current_weather.weathercode === 61 ? '50%' : '0%'}`;
  todayInfo.wind.textContent = `${Math.round(current_weather.windspeed)} km/h`;
}

// Atualiza a previsão semanal na interface
function updateForecast(daily) {
  weekList.innerHTML = '';

  daily.time.forEach((date, index) => {
    const listItem = document.createElement('li');
    if (index === 0) listItem.classList.add('active');

    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    const tempMax = Math.round(daily.temperature_2m_max[index]);
    const tempMin = Math.round(daily.temperature_2m_min[index]);

    listItem.innerHTML = `
      <i class="day-icon" data-feather="${mapWeatherIcon(0)}"></i> <!-- Substituir pelo código real se necessário -->
      <span class="day-name">${dayName}</span>
      <span class="day-temp">${tempMax}°C / ${tempMin}°C</span>
    `;

    weekList.appendChild(listItem);
    feather.replace();
  });
}

// Mapeia o código do tempo para uma descrição textual
function mapWeatherDescription(code) {
  const descriptionMap = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light',
    53: 'Drizzle: Moderate',
    55: 'Drizzle: Dense',
    61: 'Rain: Slight',
    63: 'Rain: Moderate',
    65: 'Rain: Heavy',
    71: 'Snow: Slight',
    73: 'Snow: Moderate',
    75: 'Snow: Heavy',
    80: 'Rain showers: Slight',
    81: 'Rain showers: Moderate',
    82: 'Rain showers: Violent',
  };
  return descriptionMap[code] || 'Unknown';
}

// Mapeia o código do tempo para os ícones do Feather
function mapWeatherIcon(code) {
  const iconMap = {
    0: 'sun',
    1: 'sun',
    2: 'cloud-sun',
    3: 'cloud',
    45: 'cloud-drizzle',
    48: 'cloud-drizzle',
    51: 'cloud-drizzle',
    53: 'cloud-drizzle',
    55: 'cloud-drizzle',
    61: 'cloud-rain',
    63: 'cloud-rain',
    65: 'cloud-rain',
    71: 'cloud-snow',
    73: 'cloud-snow',
    75: 'cloud-snow',
    80: 'cloud-rain',
    81: 'cloud-rain',
    82: 'cloud-rain',
  };
  return iconMap[code] || 'sun';
}

// Evento para alterar localização baseado no input
locationButton.addEventListener('click', () => {
    const cityInput = document.querySelector('.location-input');
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
      cityInput.value = ''; // Limpa o input após a busca
    } else {
      alert('Por favor, insira uma cidade.');
    }
  });
  

// Busca inicial com uma localização padrão
fetchWeather('Brasília, Brazil');
