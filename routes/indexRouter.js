const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");

const processWeatherData = async (city, code) => {
   const data = await getWeather(`${process.env.CITY}`, `${process.env.CODE}`);

   if (data.cod == "404") {
      return {err: `We can't find that location, please try again.`}
   }
   
   const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
   const tempData = {
      temp: Math.round(data.main.temp), 
      description: data.weather[0].description, 
      windSpeed: Math.round(data.wind.speed), 
      feelsLike: Math.round(data.main.feels_like)
   };
   
   return {city: data.name, country: data.sys.country, icon, data: tempData, listExists: true};
}

router.get("/", async(req, res) => {
   res.render("index", await processWeatherData(`${process.env.CITY}`, `${process.env.CODE}`));
});

router.post("/", async(req, res) => {
   res.render("index", await processWeatherData(req.body.location, req.body.countryCode));
});

module.exports = router;