var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

// const weatherIcon = document.querySelector('.weatherIcon i');
const weatherIcon = document.querySelector('.weatherIcon img');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);

beforeSubmit();
function beforeSubmit() {
    const van = "Vancouver"
    // const locationApi = fetchWeather + "?address=" + van;
    // locationElement.textContent = van;

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + van + "')";

}



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                // if(data.description === "rain" || data.description === "fog") {
                //     weatherIcon.className = "wi wi-day-" + data.description
                // } else {
                //     weatherIcon.className = "wi wi-day-cloudy"
                // }

                // add icon image
                weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather_icon + "@4x.png";
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + "°C";
                weatherCondition.textContent = data.description.toUpperCase();
                // change background image
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + locationElement.textContent + "')";
            }
        }) 
    });
})