const apiKey=""
document.getElementById("showWeatherBtn").onclick=function(){
    const city=document.getElementById("city").value.trim()

if(!city){
    alert("Please enter a city name.")
    return;
}

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayhourlyforecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivinfo = document.getElementById("temp-div");
    const weatherinfodiv = document.getElementById("weather-info");
    const weathericon = document.getElementById("weather-icon");

    if (data.cod === '404') {
        weatherinfodiv.innerHTML =`<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;


        const temperatureHTML =`<p>${temperature}°C</p>`;
        const weatherhtml = `<p>${cityName}</p> <p>${description}</p>`;


        tempDivinfo.innerHTML = temperatureHTML;
        weatherinfodiv.innerHTML = weatherhtml;
        weathericon.src = iconUrl;
        weathericon.alt = description;


        showImage();
    }
}


function displayhourlyforecast(hourlydata) {
    const hourlyforecastdiv = document.getElementById('hourly-forecast');
    hourlyforecastdiv.innerHTML = "";
    const next24hours = hourlydata.slice(0, 8);


    next24hours.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const hour = datetime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;


        const hourlyitemhtml = `<div class="hourly-item"><span>${hour}:00</span><img src="${iconUrl}" alt="Hourly Weather Icon"><span>${temperature}°C</span></div>`;


        hourlyforecastdiv.innerHTML += hourlyitemhtml;
    });
}


function showImage() {
    const weathericon = document.getElementById('weather-icon');
    weathericon.style.display = 'block';
}
