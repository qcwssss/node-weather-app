const request = require('request');
// const constants = require('../config');

const weatherData = (address, callback) => {
    const url = process.env.BASE_URL + encodeURIComponent(address) +"&units=metric"+ '&appid=' + process.env.SECRET_KEY;
    request({url, json:true}, (error, {body})=> {
        console.log(body);

        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        } else {
            callback(undefined, {

                temperature: body.main.temp,
                description: body.weather[0].description,
                weather_icon: body.weather[0].icon,
                cityName: body.name
                // fectch icon
                // and more
            });

        }
    })
}

module.exports = weatherData;