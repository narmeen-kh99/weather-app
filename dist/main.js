const apiManager = new APIManager();
const render = new Renderer();
apiManager.getCitiesWeather();
$("#search").on("click", () => {
  if ($("#cityName-input").val() != "") {
    apiManager.getCityWeather();
  } else {
    apiManager.getCitiesWeather();
  }
});
/*$(".cities").on("click", () => {
  console.log("saveeeed");
  let res = apiManager.insertDataToDB();
  console.log(res);
});*/
$(".cities").on("click", "#save", function () {
  console.log("saveeeed");
  apiManager.insertDataToDB();
});
$("#delete").on("click", () => {
  apiManager.deleteCityfromDB();
});
