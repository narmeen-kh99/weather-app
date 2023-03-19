class Renderer {
  RenderWeatherDataDB = function (data) {
    $(".DBData").empty();
    let source = $("#dataBD-template").html();
    const template = Handlebars.compile(source);
    const arrCityData = {
      DataRE: data,
    };
    let newHTML = template(arrCityData);
    $(".DBData").append(newHTML);
  };
  RenderWeatherData = function (data) {
    $(".unSaved").empty();
    let source = $("#unsavedData-template").html();
    const template = Handlebars.compile(source);
    const arrCityData = {
      DataRE: data,
    };
    let newHTML = template(arrCityData);
    $(".unSaved").append(newHTML);
  };
}
