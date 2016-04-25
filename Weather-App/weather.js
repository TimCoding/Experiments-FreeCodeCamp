$(document).ready(function(){
  $('#button-weather').click(function(event){
    event.preventDefault();
    var website = "http://api.openweathermap.org/data/2.5/weather?q=";
    var city = $('#weather-search').val();
    alert(city);
    var cityAppend = "?";
    var apiID = "id=524901&APPID=";
    var id = "091cd4a66afe76205aca39cc41f07de1";
    // $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=dallas?id=524901&APPID=091cd4a66afe76205aca39cc41f07de1", function(data){
    //   $('#display-weather').html(data.main.temp);
    // });
    $.getJSON(website+city+cityAppend+apiID+id, function(data){
      $('#display-weather').html(data.main.temp);

    });
  });
});
