const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/weatherDB", {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

const weatherSchema = new Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String,
});
const weather = mongoose.model("weather", weatherSchema);
module.exports = weather;
