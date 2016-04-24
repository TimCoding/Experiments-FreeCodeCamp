$(document).ready(function(){
  $('#button-weather').click(function(event){
    event.preventDefault();
    var website = "api.openweathermap.org/data/2.5/weather?q=";
    var city = "dallas";
    var cityAppend = "?";
    var apiID = "id=524901&APPID=";
    var id = "091cd4a66afe76205aca39cc41f07de1";
    alert("here");
    //$('#display-weather').html("blah");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=dallas?id=524901&APPID=091cd4a66afe76205aca39cc41f07de1", function(data){
      $('#display-weather').html(data.main.temp);
    });
  });
});
