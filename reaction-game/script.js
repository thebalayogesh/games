import { ReactionGame } from "./engine.js";

const screen = document.getElementById("screen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const result = document.getElementById("result");

let game = new ReactionGame();
let readyTimeout = null;

function render() {
  screen.className = "screen";
  result.textContent = "";

  if (game.phase === "idle") {
    screen.textContent = "Click Start";
    screen.classList.add("idle");
  }

  if (game.phase === "waiting") {
    screen.textContent = "Wait for green...";
    screen.classList.add("waiting");
  }

  if (game.phase === "ready") {
    screen.textContent = "CLICK NOW!";
    screen.classList.add("ready");
  }

  if (game.phase === "cheated") {
    screen.textContent = "Too early!";
    result.textContent = "❌ You clicked too soon";
  }

  if (game.phase === "reacted") {
    screen.textContent = "Done!";
    result.textContent = `✅ Reaction Time: ${game.reactionTime} ms`;
  }
}

// START
startBtn.addEventListener("click", () => {
  if (readyTimeout) {
    clearTimeout(readyTimeout);
    readyTimeout = null;
  }

  game.start();
  render();

  if (game.phase !== "waiting") return;

  const delay = Math.random() * 3000 + 2000; // 2–5 seconds

  readyTimeout = setTimeout(() => {
    game.markReady(Date.now());
    render();
  }, delay);
});

// SCREEN CLICK
screen.addEventListener("click", () => {
  game.click(Date.now());
  render();
});

// RESTART
restartBtn.addEventListener("click", () => {
  if (readyTimeout) {
    clearTimeout(readyTimeout);
    readyTimeout = null;
  }

  game = new ReactionGame();
  render();
});

// INITIAL RENDER
render();
