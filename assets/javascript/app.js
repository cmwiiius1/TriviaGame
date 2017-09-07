// Advanced Trivia Game Javascript Engine

// begin document.ready function
$(document).ready(function() {

// ====================
// FIRST COME VARIABLES
// ====================

// define questions objects
// each contains the question, possible answers,
// index of correct answer within possible answers (beginning
// with 0 index), location of media for correct response, and
// location of media for incorrect response
var question0 = {
	question: "Where does “It’s a Wonderful Life” take place?",
	answers: ["Bedford Hills", "Bedford Falls", "Bedford Lake", "Bedford City"],
	correctAnswer: 1,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question1 = {
	question: "In “The Godfather,” who was murdered in the causeway?",
	answers: ["Luca Brasi", "Moe Greene", "Sonny", "Paulie"],
	correctAnswer: 2,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question2 = {
	question: "In which of the following films did Robert Duvall NOT appear?",
	answers: ["To Kill a Mockingbird", "The Godfather", "Tender Mercies", "One Flew Over the Cuckoo’s Nest"],
	correctAnswer: 3,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question3 = {
	question: "Who was Scarlett O’Hara’s second husband?",
	answers: ["Charles Hamilton", "Frank Kennedy", "Rhett Butler", "Ashley Wilkes"],
	correctAnswer: 1,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question4 = {
	question: "On what national memorial did Cary Grant end up in “North by Northwest?",
	answers: ["Mount Rushmore", "Washington Monument", "Grant’s Tomb", "Lincoln Memorial"],
	correctAnswer: 0,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question5 = {
	question: "What does E.T. tell Elliot when he leaves Earth?",
	answers: ["E.T. phone home", "Me like Reeses Pieces", "I’ll be right back", "I’ll be right here"],
	correctAnswer: 3,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question6 = {
	question: "What are the names of the rival gangs in “West Side Story?",
	answers: ["Sharks and Tigers", "Jets and Tigers", "Sharks and Jets", "Lions and Panthers"],
	correctAnswer: 2,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

var question7 = {
	question: "Where was Forest Gump shot in Vietnam?",
	answers: ["The bottom", "The pinkie toe", "The ear lobe", "The knee"],
	correctAnswer: 0,
	correctMedia: "assets/images/right.gif",
	incorrectMedia: "assets/images/wrong.gif"
}

// define array of all the question objects
var allQuestionsArray = [question0, question1, question2, question3, question4, question5, question6, question7];

// define object containing ongoing game variables 
var gameVariables = {
	answeredCorrectly: 0,
	answeredIncorrectly: 0,
	unanswered: 0,
	currentQuestion: 0
}

// =====================
// SECOND COME FUNCTIONS
// =====================

// function to reset game variables
function resetVariables() {
	console.log("resetVariables function reached");
	gameVariables.answeredCorrectly = 0;
	gameVariables.answeredIncorrectly = 0;
	gameVariables.unanswered = 0;
	gameVariables.currentQuestion = 0;
}

// function that runs a timer countdown
function startTimer() {
	// set timeout to 31 seconds so display begins with 30 seconds
	// because first display comes after initial interval of 1 sec
	var timeout = 20;
	function run() {
		counter = setInterval(decrement, 1000);
	}
	function decrement() {
		timeout--;
		// $("#timer").show();
		$("#timerDiv").html("<h2>Time Remaining: " + timeout + "</h2>");

		if (timeout == 0) {
			// if time runs out, stop the timer, display time's up and ...
			$("#timerDiv").html("&nbsp;");
			clearInterval(counter);
			// ... and also run the timesUp function
			timesUp();
		}
	}
	run();
}

// playGame function that controls flow of game
function displayQuestion() {
	console.log("playGame function reached");

	// when user is guessing start music playing
	audio = new Audio("assets/sounds/centuryfox.wav");
	audio.play();

	// hide startButton and startOverButton and checkAnswer div
	$("#startButton").hide();
	$("#startOverButton").hide();
	$("#checkAnswer").hide();

	// check if all questions have been used and if they have then move to
	// final results tabulation
	if (gameVariables.currentQuestion > allQuestionsArray.length-1) {
		finalResults();
	// if they haven't all been used, then play the question
	} else if (gameVariables.currentQuestion <= allQuestionsArray.length) {

		// display timer and start it up
		$("#timerDiv").show();
		startTimer();

		// set up questionAsked board and show it
		$("#questionAsked").show();
		// populate theQuestion div with the question
		$("#theQuestion").html("<h3>" + allQuestionsArray[gameVariables.currentQuestion].question + "</h3>");
		// populate the text of the four buttons for possible responses
		$("#button0").text(allQuestionsArray[gameVariables.currentQuestion].answers[0]);
		$("#button1").text(allQuestionsArray[gameVariables.currentQuestion].answers[1]);
		$("#button2").text(allQuestionsArray[gameVariables.currentQuestion].answers[2]);
		$("#button3").text(allQuestionsArray[gameVariables.currentQuestion].answers[3]);
	} else {
		console.log("error caught - question counting problem");
	}
}

// function to run when player selects an answer
function checkSelection() {
	console.log("check selection function reached");
	
	// hide the questionAsked board and stop the timer
	$("#questionAsked").hide();
	clearInterval(counter);
	$("#timerDiv").html("&nbsp;");

	// if answer was right
	if (userGuess.data("value") == allQuestionsArray[gameVariables.currentQuestion].correctAnswer) {
		console.log(userGuess.data("value"));
		console.log("correct");
		// run the correctAnswer function
		correctAnswer();
	}
	// else if answer was wrong
	else {
		console.log(userGuess.data("value"));
		console.log("incorrect");
		// run the incorrectAnswer function
		incorrectAnswer();
	}

}

// function that is run when player has selected the right answer
function correctAnswer() {
	console.log("correctAnswer function reached");

	// hide the questionAsked Board and display the checkAnswer board
	$("#questionAsked").hide();
	$("#checkAnswer").show();

	// increment answeredCorrectly which holds running tally of correct
	// guesses, and then display the results
	gameVariables.answeredCorrectly++;
	$("#checkAnswer").html("<h2><p>Correct!</p></h2><img src='" + allQuestionsArray[gameVariables.currentQuestion].correctMedia + "' alt='correct'>");
	console.log(gameVariables);

	// wait 5 seconds to show gif and also increase currentQuestion by 1 so
	// that next round the subsequent question is played,
	// then resume playing the game
	gameVariables.currentQuestion++;
	setTimeout (function() {
		displayQuestion();
	}, 5000);
}

// function that is run when player has selected the wrong answer
function incorrectAnswer() {
	console.log("incorrectAnswer function reached");

	// hide the questionAsked Board and display the checkAnswer board
	$("#questionAsked").hide();
	$("#checkAnswer").show();

	// increment answeredIncorrectly which holds running tally of wrong
	// guesses, and then display the results
	gameVariables.answeredIncorrectly++;
	$("#checkAnswer").html("<h2><p>Incorrect!</p><p>Correct answer was: " + allQuestionsArray[gameVariables.currentQuestion].answers[allQuestionsArray[gameVariables.currentQuestion].correctAnswer] + "</p></h2><img src='" + allQuestionsArray[gameVariables.currentQuestion].incorrectMedia + "' alt='incorrect'>");
	console.log(gameVariables);

	// wait 5 seconds to show gif and also increase currentQuestion by 1 so
	// that next round the subsequent question is played,
	// then resume playing the game
	gameVariables.currentQuestion++;
	setTimeout (function() {
		displayQuestion();
	}, 5000);
}

// function that is run if user fails to guess within time
function timesUp() {
	console.log("timesUp function reached");
	
	// hide the questionAsked Board and display the checkAnswer board
	$("#questionAsked").hide();
	$("#checkAnswer").show();

	// increment unanswered questions then display the results
	gameVariables.unanswered++;
	$("#checkAnswer").html("<h2><p>Time's up!</p><p>Correct answer was: " + allQuestionsArray[gameVariables.currentQuestion].answers[allQuestionsArray[gameVariables.currentQuestion].correctAnswer] + "</p></h2><img src='assets/images/unanswered.gif' alt='unanswered'>");
	console.log(gameVariables);

	// wait 5 seconds to show gif and also increase currentQuestion by 1 so
	// that next round the subsequent question is played,
	// then resume playing the game
	gameVariables.currentQuestion++;
	setTimeout (function() {
		displayQuestion();
	}, 5000);
}

function finalResults() {
	console.log("finalResults function reached");

	// show the checkAnswer div as that is where we will put results
	// and also show the startOverButton and hide the timerDiv
	$("#timerDiv").hide();
	$("#checkAnswer").show();
	$("#startOverButton").show();

	// populate results in checkAnswer div
	console.log(gameVariables);
	$("#checkAnswer").html("<h2><p>All done! Here's how you did!</p><p>Correct: " + gameVariables.answeredCorrectly + "</p><p>Incorrect: " + gameVariables.answeredIncorrectly + "</p><p>Unanswered: " + gameVariables.unanswered + "</p></h2>");
}

// ===================
// THIRD COMES THE APP
// ===================

// begin by resetting variables
resetVariables();

$("#startButton").on("click", function() {
	resetVariables();
	displayQuestion();
});

$("#startOverButton").on("click", function() {
	resetVariables();
	audio.pause();
	displayQuestion();
});

$(".options").on("click", function() {
	userGuess = $(this);
	audio.pause();
	checkSelection();
});

// end document.ready function
});