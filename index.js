const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/indexRouter");

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

app.use("/", indexRouter);

app.get("*", (req, res) => {
   res.render("404");
})

app.listen(3000, () => {
   console.log("Listening to port 3000");
});