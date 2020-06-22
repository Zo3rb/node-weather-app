// Requiring The Axios, Geolocation code Package
const axios = require('axios');

// Declaring The API Secret Key
const API_KEY = "ff07332bf12d3744e1691a3180ed0b97";

const getWeather = async location => {
    try {
        if (location) {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
            const weather = {
                main: response.data.weather[0].main,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                temp_max: response.data.main.temp_max,
                temp_min: response.data.main.temp_min,
                country: response.data.sys.country
            }
            return weather;
        }
        return;
    } catch (error) {
        console.log('Low Level Error');
    }
};

module.exports = getWeather;
