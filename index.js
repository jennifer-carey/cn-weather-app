const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const getWeather = require("./lib/getWeather");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("hbs", hbs({
   defaultLayout: "layout",
   extname: ".hbs"
}));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
   res.render("index");
});

// app.post("/", async(req, res) => {
//    let data = await getWeather();
// let city = data.name;
// let country = data.sys.country;
// let temp = data.main.temp;
// let description = data.weather[0].description;
// let feelsLike = data.main.feels_like;
//    if (data.cod == "404") {
//       res.render("/");
//       return;
//    }
//    res.render("index", {city, country, data: {temp, description, feelsLike}, listExists: true});
// })

app.get("*", (req, res) => {
   res.render("404");
})

app.listen(3000, () => {
   console.log("Listening to port 3000");
});