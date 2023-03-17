class APIManager {
  constructor() {
    this.data = [];
    this.cityName = "";
  }
  inputCityName() {
    this.cityName = $("#cityName-input").val();
  }
  getCitiesWeather() {
    console.log("i am here 1");
    return $.get(`http://localhost:4200/city`).then((result) => {
      console.log(result.res);
      this.data.push(result.res);
      render.RenderWeatherData(result.res);
    });
  }
  getCityWeather() {
    return $.get(`http://localhost:4200/city/${this.cityName}`).then(
      (result) => {
        this.data.push(result);
        render.RenderWeatherData(result);
      }
    );
  }
  insertDataToDB() {
    let cityData = getCitiesWeather();
    return $.post(`http://localhost:4200/city`, {
      name: cityData.cityName,
      temperature: cityData.temperature,
      condition: cityData.condition,
      conditionPic: cityData.conditionPic,
    }).then((result) => {
      render.RenderWeatherData(result);
    });
  }
  deleteCityfromDB() {
    return $.removeData(`http://localhost:4200/city/${this.cityName}`).then(
      (result) => {
        render.RenderWeatherData(result);
      }
    );
  }
}
