"use strict";
const gamePattern = [];
const btnColors = ["red", "blue", "green", "yellow"];

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

const nextSequence = function () {
  let randomNumber = Math.trunc(Math.random() * 4);
  let randomColorChosen = btnColors[randomNumber];
  gamePattern.push(randomColorChosen);
  let randomCOlor = document.getElementById(randomColorChosen).id;
  fadeIn(randomCOlor);
};
nextSequence();
