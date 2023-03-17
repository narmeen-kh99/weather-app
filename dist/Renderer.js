class Renderer {
  RenderWeatherData = function (data) {
    $(".AllCitiesWheather").empty();
    let source = $("#citieaData-template").html();
    const template = Handlebars.compile(source);
    const arrCityData = {
      DataRE: data,
    };
    let newHTML = template(arrCityData);
    $(".AllCitiesWheather").append(newHTML);
  };
}
