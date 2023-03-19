class APIManager {
  constructor() {
    this.DBdata = [];
    this.unSavedData = [];
    this.cityName = "";
  }
  inputCityName() {
    this.cityName = $("#cityName-input").val();
  }
  getCitiesWeather() {
    console.log("i am here 1");
    return $.get(`http://localhost:4200/city`).then((result) => {
      console.log(result);
      return (this.DBdata = [...result]);
    });
  }
  getCityWeather() {
    this.inputCityName();
    return $.get(`http://localhost:4200/city/${this.cityName}`).then(
      (result) => {
        console.log(result);
        this.unSavedData.push(result.res);
        return this.unSavedData;
      }
    );
  }
  insertDataToDB(cityName) {
    let cityData = this.findCity(cityName);

    return $.post(`http://localhost:4200/city`, {
      name: cityData.name,
      temperature: cityData.temperature,
      condition: cityData.condition,
      conditionPic: cityData.conditionPic,
    }).then((result) => {
      this.deleteDataArray(cityName, this.unSavedData);
      this.DBdata.push(result);
      return this.DBdata;
    });
  }
  deleteCityfromDB(cityName) {
    this.cityName = cityName;
    $.ajax({
      url: `http://localhost:4200/delete/${this.cityName}`,
      type: "DELETE",
      success: function (result) {},
    });
    this.deleteDataArray(cityName, this.DBdata);
    return this.getCitiesWeather();
  }

  deleteDataArray = function (cityName, arr) {
    for (let index in arr) {
      if (arr[index].name == cityName) arr.slice(index, 1);
    }
  };
  findCity = function (cityName) {
    for (let city of this.unSavedData) {
      if (cityName == city.name) {
        return city;
      }
    }
  };
}
