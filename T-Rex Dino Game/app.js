const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isStarted = false;
const start = document
  .querySelector("#level-title-btn")
  .addEventListener("click", function () {
    document.querySelector(".title").classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
    isStarted = true;
  });
if ((isStarted = true)) {
  function jump() {
    if (dino.classList != "jump") {
      dino.classList.add("jump");

      setTimeout(function () {
        dino.classList.remove("jump");
      }, 300);
    }
  }

  let isAlive = setInterval(function () {
    // get current dino Y position
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    // get current cactus X position
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    // detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
      // collision
      isStarted = false;
      document.querySelector(".title").classList.remove("hidden");
      document.querySelector(".game").classList.add("hidden");
    }
  }, 10);

  document.addEventListener("keydown", function (event) {
    jump();
  });
}
