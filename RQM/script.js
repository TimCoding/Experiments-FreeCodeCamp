$(document).ready(function(){
  
  getQuote();
  $('#newQuote').click(function(){
    //alert("Done");
    getQuote();
  });
});

function getQuote(){
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(response){
    //alert(JSON.stringify(response));
    $('#quote').html('"' + response.quoteText + '"');
    $('#author').html("<br></br>- " + response.quoteAuthor);
  });
};
