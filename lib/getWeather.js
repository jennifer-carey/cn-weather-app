const fetch = require("node-fetch");
require("dotenv").config();

const getWeather = async() => {
   let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=${units}&appid=${process.env.APPID}`);
   return await data.json();
}

module.exports = getWeather;