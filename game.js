var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on("keydown", function() {
  if (started === false) {
    $("#level-title").text("Level " + level)
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  // Add random color to gamePattern array
  gamePattern.push(randomChosenColor);

  // Flash the random color button
  $("#" + randomChosenColor).fadeOut(80).fadeIn(80);

  // Play the random color sound
  playSound(randomChosenColor);

  // Increase the level by 1
  level += 1;
  $("#level-title").text("Level " + level)
}


$(".btn").on("click", function() {
  // Get the id (color) of the clicked button
  var userChosenColor = this.id;

  // Add color to userClickedPattern array
  userClickedPattern.push(userChosenColor);

  // Play the selected button sound
  playSound(userChosenColor);

  // Add a pressed class
  animatePress(userChosenColor);

  // Check answer
  var curentUserIndex = userClickedPattern.length - 1;

  checkAnswer(curentUserIndex)
});


function checkAnswer (currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === (gamePattern.length - 1)) {

      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);

    }
  } else {
    
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  console.log("In start Over");
}


function playSound(name) {
  // Function that plays the sound of a desired color
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(currentColor) {
  // Adds the pressed class to the button of the color tha was passed and deletes it after 100ms
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
