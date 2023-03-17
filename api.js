const express = require("express");
const api = express.Router();
module.exports = api;
const weather = require("./model/weather");
const bodyParser = require("body-parser");
const APIKey = "f83216db6d07e7be0aa248a86ef6b697";

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
const axios = require("axios");
api.get("/city/:cityName", (req, res) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&&units=metric&appid=${APIKey}`
    )
    .then((wheatherOfCity) => {
      let result = wheatherOfCity.data;
      let newRes = FilterData(result);
      console.log(newRes);
      res.send(newRes);
    });
});

api.get("/city", (req, res) => {
  console.log("22");
  weather.find({}).then(function (wheatherOfCity) {
    res.send(wheatherOfCity);
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
FilterData = function (citiesData) {
  let newCity = {};
  newCity["name"] = citiesData.name;
  newCity["temperature"] = citiesData.main.temp;
  newCity["condition"] = citiesData.weather[0].description;
  newCity["conditionPic"] = citiesData.weather[0].icon;
  return newCity;
};
