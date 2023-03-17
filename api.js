const express = require("express");
const api = express.Router();
module.exports = api;
const weather = require("./model/weather");
const bodyParser = require("body-parser");
const APIKey = "f83216db6d07e7be0aa248a86ef6b697";

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
const axios = require("axios");
console.log("22222222222222222222");
api.get("/city/:cityName", (req, res) => {
  console.log("3333333333333333");
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&&units=metric&appid=${APIKey}`
    )
    .then((wheatherOfCity) => {
      console.log("44444444444444");
      res.send({ res: wheatherOfCity.data });
    });
});

api.get("/city", (req, res) => {
  console.log("22");
  weather.find({}).then(function (wheatherOfCity) {
    res.send({ res: wheatherOfCity.data });
  });
});

api.post("/city", function (req, res) {
  const newCityWeather = new weather({
    name: req.body.name,
    temperature: req.body.temperature,
    condition: req.body.condition,
    conditionPic: req.body.conditionPic,
  });
  newCityWeather.save();
  res.send(`the weather of the city ${newCityWeather.name} is saved`);
});

api.delete("/delete/:cityName", function (req, res) {
  weather.findOneAndRemove({ name: req.params.cityName }).then(function (city) {
    res.send(`the cite ${city.name} deleted`);
  });
});
