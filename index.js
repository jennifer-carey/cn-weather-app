const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

const getWeather = require("./lib/getWeather");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.engine("hbs", hbs({
   defaultLayout: "layout",
   extname: ".hbs"
}));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", ".hbs");

app.get("/", async(req, res) => {
   let data = await getWeather(`${process.env.CITY}`, `${process.env.CODE}`);
   let city = data.name;
   let country = data.sys.country;
   let temp = data.main.temp;
   let description = data.weather[0].description;
   let feelsLike = data.main.feels_like;
   res.render("index", {
      city, 
      country, 
      data: {temp, description, feelsLike}, 
      listExists: true
   });
});

app.post("/", async(req, res) => {
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
   let temp = data.main.temp;
   let description = data.weather[0].description;
   let feelsLike = data.main.feels_like;
   res.render("index", {
      city, 
      country, 
      data: {temp, description, feelsLike}, 
      listExists: true
   });
});

app.get("*", (req, res) => {
   res.render("404");
})

app.listen(3000, () => {
   console.log("Listening to port 3000");
});