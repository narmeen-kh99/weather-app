const apiManager = new APIManager();
const render = new Renderer();
window.onload = async function () {
  const weatherData = await apiManager.getCitiesWeather();
  render.RenderWeatherDataDB(weatherData);
};
$("#search").on("click", async function () {
  const weatherData = await apiManager.getCityWeather();
  render.RenderWeatherData(weatherData);
});

$(document).on("click", ".btn-floating-minus", "#delete", async function () {
  let cityName = $(this).closest(".card-content").find("h1").text();
  await apiManager.deleteCityfromDB(cityName);
  await window.onload();
  //render.RenderWeatherData(apiManager.DBdata);
  render.RenderWeatherData(apiManager.unSavedData);
});
$(document).on("click", ".btn-floating-pluse", "#save", async function () {
  let cityName = $(this).closest(".card-content").find("h1").text();
  await apiManager.insertDataToDB(cityName);
  await window.onload();
  render.RenderWeatherData(apiManager.unSavedData);
});

/*$(".cities").on("click", () => {
  console.log("saveeeed");
  let res = apiManager.insertDataToDB();
  console.log(res);
});*/
