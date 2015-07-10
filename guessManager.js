var submitButton;
var restartButton;
var hintButton;
var bgBlinkTimer;

var guessEntry;
var pastGuesses;
var maxGuesses = 5;
var numGuesses = maxGuesses;

var mysteryNumber;

var gameResultImg;

$(document).ready(function()
{
	pastGuesses = $('#pastGuesses');
	$('#guessTicker').text(numGuesses);

	$('#guessingForm').submit(function()
	{
		return false;
	});

	submitButton = document.querySelector('#submitGuess');
	restartButton = document.querySelector('#restart');
	hintButton = document.querySelector('#hint');
	guessEntry = document.querySelector('#guess');

	submitButton.addEventListener('click',processInput);
	hintButton.addEventListener('click',showHint);
	restartButton.addEventListener('click',gameStart);
	guessEntry.addEventListener('focus',clearInput);

	$(guessEntry).keyup(function(event)
	{
	    if(event.keyCode == 13)
	    {
	        $("#submitGuess").click();
	        clearInput.apply(guessEntry);
	    }
	});

	gameStart();
});

function processInput(e)//unnecessary e
{
	var input = +$(this).closest('.form-inline').find('#guess').val();

	if(validGuess(input))
	{
		$('#guessesTitle').css("visibility","visible");
		numGuesses --;
		$('#guessTicker').text(numGuesses);
		printGuess(input);
		if(input===mysteryNumber)
		{
			victory();
			gameOver();
		}
		else if(numGuesses<1)
		{
			defeat();
			gameOver();
		}
	}
}

function printGuess(guess)
{
	var direction = getDirection(guess);
	var temp;
	var tempString;
	var tempColor;

	setTempPrint(guess);

	var suggestion = "";
	if(direction>0)
	{
		suggestion = "Guess higher";
	}
	if(direction<0)
	{
		suggestion = "Guess lower"
	}

	var guessNode = $('<li><b>'+guess+'</b>: '+tempString+'...'+suggestion+'</li>');
	guessNode.css("color", tempColor);
	pastGuesses.prepend(guessNode);

	function setTempPrint(guess)
	{
		var distance = Math.abs(guess - mysteryNumber);

		if(distance>=50)
		{
			temp= 7;
			tempColor = "#0500ff";
			tempString = "Outer-Space Cold";
		}
		else if(distance>=35)
		{
			temp = 6;
			tempColor = "#0044ff";
			tempString = "Ice Cold";
		}
		else if(distance>=20)
		{
			temp = 5;
			tempColor = "#00e4ff";
			tempString = "Lemonade Cool";
		}
		else if(distance>=10)
		{
			temp = 4;
			tempColor = "#00ffa8";
			tempString = "Room Temperature";
		}
		else if(distance>=6)
		{
			temp = 3;
			tempColor = "#e5c22e";
			tempString = "Warm Like a Sweater";
		}
		else if(distance>=3)
		{
			temp = 2;
			tempColor = "#FFaa00";
			tempString = "Hot Potato";
		}
		else if(distance>=1)
		{
			temp = 1;
			tempColor = "#FF6400";
			tempString = "Almost there!";
		}
		else
		{
			temp = 0;
			tempColor = "#FF0020";
			tempString = "YOU DID IT!!!";
		}
	}
}

function clearInput()
{
	$(this).val('');
}

function validGuess(input)
{
	if(input>=1 && input<=100 && parseInt(input)===input)
	{
		return true;
	}
	else
	{
		console.log("Invalid guess. Guess must be a whole number");
		return false;
	}
}

function victory()
{
	animateBackground();
	$('#gameHeader').text("YOU WIN!!!");
	gameResultImg = $('<img src = "images/fryingEggs.gif" id = "gameResultImg"></img>');
}

function defeat()
{
	$('#gameHeader').text("YOU LOSE :( It was "+mysteryNumber);
	gameResultImg = $('<img src = "images/cryingChild.gif" id = "gameResultImg"></img>');
}

function gameStart()
{
	clearInterval(bgBlinkTimer);
	$(document.body).css("background-color","white");
	if(document.getElementById("gameResultImg"))
	{
		gameResultImg.remove();
	}
	$('#gameHeader').text("Guess the Number! (1-100)");
	$('#gameHeader').css("visibility","visible");
	$('#guessingForm').css("visibility","visible");
	$(hintButton).css("visibility","visible");
	$(restartButton).text("Restart Game");
	$('#guessesTitle').css("visibility","hidden");
	$('#hintDisplay').css("visibility","hidden");
	clearInput.apply(guessEntry);

	$('#guess').empty();
	pastGuesses.empty();
	numGuesses = maxGuesses;
	$('#guessTicker').text(numGuesses);

	mysteryNumber = getMysteryNumber();
}

function gameOver()
{
	$('#guessArea').append(gameResultImg);
	$(hintButton).css("visibility","hidden");
	$('#hintDisplay').css("visibility","hidden");
	$('#guessingForm').css("visibility","hidden");
	$(restartButton).text("Play Again");
}

function animateBackground()
{
	var bgColorStr = "pink";
	$(document.body).css("background-color",bgColorStr);

	var bgColor = 1;
	bgBlinkTimer = setInterval(function(){

		if(bgColor===0)
		{
			bgColorStr = "pink";
		}
		else if(bgColor===1)
		{
			bgColorStr = "orange";
		}
		else if(bgColor===2)
		{
			bgColorStr = "yellow";
		}
		else if(bgColor===3)
		{
			bgColorStr = "lime";
		}
		else if(bgColor===4)
		{
			bgColorStr = "lightskyblue";
		}
		else
		{
			bgColorStr="mediumorchid";
		}

		if(bgColor<5)
		{
			bgColor++;
		}
		else
		{
			bgColor=0;
		}

		$(document.body).css("background-color",bgColorStr);
	},1000);
}

function showHint()
{
	$('#hintDisplay').css("visibility","visible");
	$('#answer').text(mysteryNumber);
}

function getMysteryNumber()
{
	var num = Math.floor(Math.random()*100)+1;
	return num;
}

function getDirection(guess)
{
	var direction = 0;

	if(guess>mysteryNumber)
	{
		direction = -1;
	}
	else if(guess<mysteryNumber)
	{
		direction = 1;
	}

	return direction;
}

