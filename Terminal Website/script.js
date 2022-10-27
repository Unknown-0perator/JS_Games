function $(elid) {
  return document.getElementById(elid);
}

let cursor;
window.onload = init;

function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}

function nl2br(txt) {
  return txt.replace(/\n/g, "");
}

function typeIt(from, e) {
  e = e || window.event;
  let w = $("typer");
  let tw = from.value;
  if (!pw) {
    w.innerHTML = nl2br(tw);
  }
}

function moveIt(count, e) {
  e = e || window.event;
  let keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= 0 - (count - 1) * 10) {
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}

function alert(txt) {
  console.log(txt);
}

let linkedin = "https://www.linkedin.com/in/ahmadrashidakhtar/";
let github = "https://github.com/Unknown-0perator/";

about = [
  "<br>",
  "Hello, World",
  "I am Ahmad Rashid Akhtar, a software engineer",
  "<br>",
];

social = [
  "<br>",
  'linkedin       <a href="' +
    linkedin +
    '" target="_blank">linkedin/ahmadrashidakhtar' +
    "</a>",
  'github         <a href="' +
    github +
    '" target="_blank">github/Unknown-0perator' +
    "</a>",
  "<br>",
];

secret = [
  "<br>",
  '<span class="command">sudo</span>           Only use if you\'re admin',
  "<br>",
];

projects = ["<br>", "<a href='https://grocygo.in/'>GrocyGo</a>", "<br>"];

help = [
  "<br>",
  '<span class="command">about</span>          About me',
  '<span class="command">github</span>         GitHub Account',
  '<span class="command">linkedIn</span>       LinkedIn Account',
  '<span class="command">projects</span>       My Projects',
  '<span class="command">history</span>        Commands History',
  '<span class="command">help</span>           Help',
  '<span class="command">clear</span>          Clear Terminal',
  "<br>",
];

let before = document.getElementById("before");
const liner = document.getElementById("liner");
const command = document.getElementById("typer");
const textarea = document.getElementById("texter");
const terminal = document.getElementById("terminal");

let git = 0;
let pw = false;
let commands = [];

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine("Unknown-0perator: " + command.innerHTML, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color__secondary margin", 80);
      break;
    case "about":
      loopLines(about, "color__secondary margin", 80);
      break;
    case "projects":
      loopLines(projects, "color__secondary margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color__secondary", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    // socials

    case "linkedin":
      addLine("Opening LinkedIn...", "color__secondary", 0);
      newTab(linkedin);
      break;

    case "github":
      addLine("Opening GitHub...", "color__secondary", 0);
      newTab(github);
      break;
    default:
      addLine(
        '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
        "error",
        100
      );
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  let t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    let next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}
