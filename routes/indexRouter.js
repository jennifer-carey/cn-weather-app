const express = require("express");
const router = express.Router();

const getWeather = require("../lib/getWeather");

router.get("/", async(req, res) => {
   let data = await getWeather(`${process.env.CITY}`, `${process.env.CODE}`);
   let city = data.name;
   let country = data.sys.country;
   let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
   let temp = data.main.temp;
   let description = data.weather[0].description;
   let feelsLike = data.main.feels_like;
   res.render("index", {
      city, 
      country, 
      icon,
      data: {temp, description, feelsLike}, 
      listExists: true
   });
});

router.post("/", async(req, res) => {
   let location = req.body.location;
   let code = req.body.countryCode;
   let data = await getWeather(location, code);
   if (data.cod == "404") {
      res.render("index", {
         err: `We can't find that location, please try again.`
      });
      return;
   }
   let city = data.name;
   let country = data.sys.country;
   let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
   let temp = data.main.temp;
   let description = data.weather[0].description;
   let feelsLike = data.main.feels_like;
   res.render("index", {
      city, 
      country, 
      icon,
      data: {temp, description, feelsLike}, 
      listExists: true
   });
});

module.exports = router;