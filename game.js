var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function() {
  if (level == 0) {
    $('h1').text = "Level 0";
    nextSequence();
  }
});

function nextSequence() {
  level++;
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  flashButton(randomChosenColour);
  playSound(randomChosenColour);
  console.log(gamePattern);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  flashButton(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(buttonColor) {
  var audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();
}

function flashButton(buttonColor) {
  $("#" + buttonColor).addClass('pressed').delay(100).queue(function(next) {
    $(this).removeClass('pressed');
    next();
  });
}

function checkAnswer(checkLevel) {
  if (userClickedPattern[checkLevel] == gamePattern[checkLevel]) {
    console.log("Correct");
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass('game-over').delay(200).queue(function(next) {
      $(this).removeClass('game-over');
      next();
    });
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver();
  }
  if (checkLevel + 1 == level) {
    setTimeout(function() {
      userClickedPattern = [];
      nextSequence();
    }, 1000)
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
