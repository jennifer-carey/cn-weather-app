const fetch = require("node-fetch");
require("dotenv").config();

const getWeather = async(location, code, units="metric") => {
   let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location},${code}&units=${units}&appid=${process.env.APIKEY}`);
   return await data.json();
};

module.exports = getWeather;