//javascript for icons
 var icons = new Skycons({"color":"rgba(0, 0, 0)"}),
          list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],
          i;

      for(i = list.length; i--; ){
        icons.set(list[i], list[i]);
      }
      icons.play();
//javascript for weather icons ends




$(document).ready(function(){
  var currTemp;
  $('#button-weather').click(function(event){
    event.preventDefault();
    var website = "http://api.openweathermap.org/data/2.5/weather?q=";
    //API only accepts lower case input so...
    //Will use toLowerCase();
    var city = $('#weather-search').val().toLowerCase();
    var cityAppend = "?";
    var apiID = "id=524901&APPID=";
    var id = "091cd4a66afe76205aca39cc41f07de1";
 
   
    $.getJSON(website+city+cityAppend+apiID+id, function(data){
      currTemp = data.main.temp;
      var conditions = data.weather[0].main;
      
      
      //City name display
      $('#city').html("<div class = 'text-center' <h1>" + correctName(city) + "</h1></div>");
      //Temperature display based on query
      $('#temp').html("<div class = 'text-center' <h1>" + fahrenheit(currTemp) + "</h1></div>");
      //Current Weather Condition
      $('#conditions').html("<div class ='text-center' <h1>" + conditions + "</h1></div>");
    });
  });
  
  //Convert between fahrenheit and celsius
  $('#fahrenheit').click(function(){
    $('#temp').html("<div class = 'text-center' <h1>" + fahrenheit(currTemp) + "</h1></div>");
  });
  
  $('#celsius').click(function(){
    $('#temp').html("<div class = 'text-center' <h1>" + celsius(currTemp) + "</h1></div>");
  });
});

function celsius(tempInKelvin){
  return Math.ceil((tempInKelvin - 273.15)) + " °C";
}

function fahrenheit(tempInKelvin){
  var C = tempInKelvin - 273.15;
  //Converting from celsius to fahrenheit
  return Math.ceil(((9.0/5.0) * C + 32)) + " °F";
}

//capitalizes the first letter of the name
function correctName(name){
  if(name !== null && name.length > 0){
    //Updated for names with multiple words
    //Splits name up into an array based on spacing
    var nameArray = name.split(" ");
    //Loops through the array and capitalizes the first letter in each word of the name
    for(var index = 0; index < nameArray.length; index++){
      var currString = nameArray[index];
      var firstLetter = currString.charAt(0).toUpperCase();
      var restLetters = currString.substring(1, currString.length);
      nameArray[index] = firstLetter + restLetters;
    }
    return nameArray.join(" ");
  } else {
    return name;
  }
}
