
$(document).ready(function(){
  
  var currTemp = 0;
  
  $('#button-weather').click(function(event){
    event.preventDefault();
    var website = "http://api.openweathermap.org/data/2.5/weather?q=";
    //API only accepts lower case input so...
    //Will use toLowerCase();
    var city = $('#weather-search').val().toLowerCase();
    var cityAppend = "?";
    var apiID = "id=524901&APPID=";
    var id = "091cd4a66afe76205aca39cc41f07de1";
    // $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=dallas?id=524901&APPID=091cd4a66afe76205aca39cc41f07de1", function(data){
    //   $('#display-weather').html(data.main.temp);
    // });
    $.getJSON(website+city+cityAppend+apiID+id, function(data){
      currTemp = data.main.temp;
      $('#display-weather').html(fahrenheit(currTemp));
    });
  });
  
  $('#fahrenheit').click(function(){
    $('#display-weather').html(fahrenheit(currTemp));
  });
  
  $('#celsius').click(function(){
    $('#display-weather').html(celsius(currTemp));
  });
});

function celsius(tempInKelvin){
  return (tempInKelvin - 273.15) + " degrees Celsius";
}

function fahrenheit(tempInKelvin){
  var C = tempInKelvin - 273.15;
  //Converting from celsius to fahrenheit
  return ((9.0/5.0) * C + 32) + " degrees Fahrenheit";
}
