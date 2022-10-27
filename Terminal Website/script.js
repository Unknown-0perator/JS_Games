const liner = document.getElementById("liner");
const command = document.getElementById("typer");
const textarea = document.getElementById("textarea");
const terminal = document.getElementById("terminal");

const linkedin = "https://www.linkedin.com/in/ahmadrashidakhtar/";
const github = "https://github.com/Unknown-0perator";

//Commands
about = [
  "<br>",
  "Hello World, I am Ahmad Rashid Akhtar",
  "I'm a software developer",
  "<br>",
];

social = [
  "<br>",
  'linkedin       <a href="' +
    linkedin +
    '">linkedin/ahmadrashidakhtar' +
    "</a>",
  'github         <a href="' + github + '" >github/unknown-0perator' + "</a>",
  "<br>",
];

help = [
  "<br>",
  '<span class="command">about</span>          About me',
  '<span class="command">contact</span>        Contact me',
  '<span class="command">help</span>           Help',
  '<span class="command">clear</span>          Clear terminal',
  "<br>",
];
