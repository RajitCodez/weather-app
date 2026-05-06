const apiKey = "318c72fc5d2cfced26945ed4373f9e43"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");
const video = document.getElementById("myVideo");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        video.style.display = "none";
        weatherCard.style.display = "block";
        
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3815/3815993.png"; 
        
        document.querySelector('.temp').innerHTML = "Oops!";
        document.querySelector('.city').innerHTML = "City not found";
        document.querySelector('.weather-desc').innerHTML = "Please try again"; 
        document.querySelector('.humidity').innerHTML = "--%";
        document.querySelector('.wind').innerHTML = "-- km/h";
    }
    else {
        let data = await response.json();

        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".weather-desc").innerHTML = data.weather[0].description;
        
        if(data.weather[0].icon){
             weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        }

        const weatherMain = data.weather[0].main;
        const isNight = data.weather[0].icon.includes('n');

        switch (weatherMain) {
            case 'Clear':
                video.src = isNight 
                    ? "assets/Clear-night.mp4" 
                    : "assets/Clear-day.mp4";
                break;
            case 'Clouds':
                video.src = isNight
                    ? "assets/Clouds-night.mp4"
                    : "assets/Clouds-day.mp4";
                break;
            case 'Rain':
            case 'Drizzle':
                video.src = "assets/Rain-Drizzle.mp4";
                break;
            case 'Thunderstorm':
                video.src = "assets/Thnderstorm.mp4";
                break;
            case 'Snow':
                video.src = "assets/Snow.mp4";
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                video.src = "assets/Mist-Fog-Haze.mp4";
                break;
            default:
                video.src = "assets/Clouds-night.mp4";
                break;
        }


        video.style.display = "block";
        video.load();
        video.play();

        weatherCard.style.display = "block";
        errorMsg.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});