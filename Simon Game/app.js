"use strict";

const gamePattern = [];
const btnColors = ["red", "blue", "green", "yellow"];
const userClickedPattern = [];

const playSound = function (name) {
  var audio = new Audio(`sounds/${name}.mp3`);
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

let classObj = document.getElementsByClassName("btn");
for (let i = 0; i < classObj.length; i++) {
  classObj[i].addEventListener("click", function (e) {
    let elementId = e.target.id;
    userClickedPattern.push(elementId);
    fadeIn(elementId);
    playSound(elementId);
  });
}

const nextSequence = function () {
  let randomNumber = Math.trunc(Math.random() * 4);
  let randomColorChosen = btnColors[randomNumber];
  gamePattern.push(randomColorChosen);
  let randomColorID = document.getElementById(randomColorChosen).id;
  fadeIn(randomColorID);
  playSound(randomColorID);
};

nextSequence();
