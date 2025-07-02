
var randomNumber1  = Math.floor(Math.random()*6+1);
var obj1 = document.getElementById('img1');
var img1 = "images/dice"+randomNumber1+".png";
obj1.setAttribute("src",img1);

var randomNumber2  = Math.floor(Math.random()*6+1);
var obj2 = document.getElementById('img2');
var img2 = "images/dice"+randomNumber2+".png";
obj2.setAttribute("src",img2);

if (randomNumber1 > randomNumber2) {
	document.querySelector("h1").innerHTML = "&#128681; Play 1 Wins!";
  }
  else if (randomNumber2 > randomNumber1) {
	document.querySelector("h1").innerHTML = "Player 2 Wins! &#128681;";
  }
  else {
	document.querySelector("h1").innerHTML = "Draw!";
  }