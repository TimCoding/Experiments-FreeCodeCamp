$(document).ready(function(){
  getQuote();
  $('#newQuote').click(function(){
    //alert("Done");
    getQuote();
  });
  $('#tweet').click(function(){
    actionTweet();
  });
});

function getQuote(){
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(response){
    //alert(JSON.stringify(response));
    $('#quote').html('"' + response.quoteText + '"');
    $('#author').html("- " + response.quoteAuthor);
  });
};

function actionTweet(){
  var twitterLink = 'https://twitter.com/intent/tweet?text=';
  //alert(twitterLink);
  var text = $('#quote').html() + " " + $('#author').html();
  //alert(text);
  //alert(text);
  window.open(twitterLink + text, "_blank");
}

var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var numStars = 3000;

$('document').ready(function() {
  
  // Calculate the screen size
	screenH = $(window).height();
	screenW = $(window).width();
	
	// Get the canvas
	canvas = $('#space');
	
	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');
	
	// Create all the stars
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 2;
		var opacity = Math.random();
		
		// Create a new star and draw
		var star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
	}
	
	setInterval(animate, .000005);
});

/**
 * Animate the canvas
 */
function animate() {
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function() {
		this.draw(context);
	})
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
	context.rotate((Math.PI * 1 / 10));
	
	// Save the context
	context.save();
	
	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);
	
	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		
		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
  }	
	this.opacity += this.increment * this.factor;
	context.beginPath()
	context.arc(this.x, this.y, this.length, 0, 2 * Math.PI);
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
	context.shadowBlur = 5;
	context.shadowColor = '#ffff33';
	context.fill();
	context.restore();
}


