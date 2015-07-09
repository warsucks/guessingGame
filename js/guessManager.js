$(document).ready(function()
{
	console.log("Document loaded");
	var guess=[];
	var submitButton = document.querySelector('#submitGuess');
	submitButton.addEventListener('click',processInput);
});

function processInput(e)
{
	console.log("button clicked");
	e.preventDefault();
	var input = +$(this).closest('.form-inline').find('#guess').val();
	console.log("Input: "+input);

	if(validGuess(input))
	{
		printGuess(input);
	}
}

function printGuess(guess)
{
	var guessNode = $('<li> guessed: '+guess+'</li>');
	$('#pastGuesses').prepend(guessNode);
	console.log("Tried to print guess: "+guess);
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