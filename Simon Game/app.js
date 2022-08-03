"use strict";

const btnColors = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let level = 0;
let isStarted = false;

const playSound = function (name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play;
};

const fadeIn = function (id) {
  const fade = document.getElementById(id);
  let opacity = 0;
  let intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.5;
      fade.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  isStarted = false;
};

const nextSequence = function () {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;

  let randomNumber = Math.trunc(Math.random() * 4);
  let randomColorChosen = btnColors[randomNumber];
  gamePattern.push(randomColorChosen);
  let randomColorID = document.getElementById(randomColorChosen).id;
  fadeIn(randomColorID);
  playSound(randomColorID);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").textContent =
      "Game Over, Press Any Key to Restart";
    startOver();
  }
}

let classObj = document.getElementsByClassName("btn");
for (let i = 0; i < classObj.length; i++) {
  classObj[i].addEventListener("click", function (e) {
    let elementId = e.target.id;
    userClickedPattern.push(elementId);
    fadeIn(elementId);
    playSound(elementId);
    checkAnswer(userClickedPattern.length - 1);
  });
}

document.onkeypress = function () {
  if (!isStarted) {
    document.getElementById("level-title").textContent = `Level ${level}`;
    nextSequence();
    isStarted = true;
  }
};
