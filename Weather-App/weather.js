
var currTemp;


$(document).ready(function(){
  //Automatically display user's data
  userWeather();
  //This will search weather if Get Weather is clicked
  $('#button-weather').click(function(event){
    event.preventDefault();
    var city = $('#weather-search').val().toLowerCase();
    if(city === ""){
      alert("Please insert a city name");
    } else {
      executeWeatherSearch(city);
    }
  });
  //This will search if you press enter in the input bar
  $('#weather-search').keypress(function(e){
    if(e.which == 13){
      var city = $('#weather-search').val().toLowerCase();
      if(city === ""){
      alert("Please insert a city name");
      } else {
      executeWeatherSearch(city);
      }
      return false;
    }
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

function executeWeatherSearch(city){
  var website = "http://api.openweathermap.org/data/2.5/weather?q=";
    //API only accepts lower case input so...
    //Will use toLowerCase();
    //var city = $('#weather-search').val().toLowerCase();
    var cityAppend = "?";
    var apiID = "id=524901&APPID=";
    var id = "091cd4a66afe76205aca39cc41f07de1";
 
   
    $.getJSON(website+city+cityAppend+apiID+id, function(data){
      currTemp = data.main.temp;
      var conditions = data.weather[0].main;
      //javascript for weather icon, getting weather type
      var weatherName = weatherIcon(data.weather[0].icon);
      //City name display
      $('#city').html("<div class = 'text-center' <h1>" + correctName(city) + "</h1></div>");
      //Temperature display based on query
      $('#temp').html("<div class = 'text-center' <h1>" + fahrenheit(currTemp) + "</h1></div>");
      //Current Weather Condition
      $('#conditions').html("<div class ='text-center' <h1>" + conditions + "</h1></div>");
      //Weather icon
      $('#icon').html("<canvas id = " + weatherName + " height = '45' width = '45'></canvas>");
      
     //Create weather icons
      createWeatherIcon();
      
    });
}

//Get user's current weather 
function userWeather(){
 
  $.getJSON('http://ipinfo.io', function(info){
    //alert(info.city);
    var city = info.city;
    executeWeatherSearch(city);
  });
  
}

//Create the weather icons to be displayed
function createWeatherIcon(){
  //javascript for icons
      var icons = new Skycons({"color":"rgba(255, 255, 255, 1)"}),
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
}

//Switch cases to determine what kind of weather icon should be placed on the page 
function weatherIcon(type){
  var weatherName; 
  switch(type){
    case "01d":
      weatherName = "clear-day";
      break;
    case "01n":
      weatherName = "clear-night";
      break;
    case "02d":
    case "03d":
      weatherName = "partly-cloudy-day";
      break;
    case "02n":
    case "03n":
      weatherName = "partly-cloudy-night";
      break;
    case "04d":
    case "04n":
      weatherName = "cloudy";
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      weatherName = "rain";
      break;
    case "013d":
    case "013n":
      weatherName = "snow";
      break;
    case "50d":
    case "50n":
      weatherName = "fog";
      break;
    default:
      weatherName = "cloudy";
  }
  return weatherName;
}

