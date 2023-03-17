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
      console.log(result);
      this.SaveDataArray(result);
      console.log(this.data);
      render.RenderWeatherData(result);
    });
  }
  getCityWeather() {
    this.inputCityName();
    return $.get(`http://localhost:4200/city/${this.cityName}`).then(
      (result) => {
        this.data.push(result.res);
        render.RenderWeatherData(this.data);
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

  SaveDataArray = function (arr) {
    for (let city of arr) {
      this.data.push(city);
    }
    return true;
  };
}
