const express = require("express");
const hbs = require("express-handlebars");
// const path = require("path");
const getWeather = require("./lib/getWeather");

const app = express();

app.engine("hbs", hbs({
   defaultLayout: "layout",
   extname: ".hbs"
}));

// app.set("views", path.join(__dirname, "views"));

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
   res.render("index");
});

app.post("/", (req, res) => {
   let data = getWeather();
   res.render()
})

app.get("*", (req, res) => {
   res.render("404");
})

app.listen(3000, () => {
   console.log("Listening to port 3000");
});