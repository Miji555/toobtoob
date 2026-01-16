const leftBlock = document.querySelector(".left");
const rightBlock = document.querySelector(".right");
const energyBar = document.getElementById("energy-bar");

let energy = 100;
let speed = 1.5;
let y = -60;
let correctSide = "left";

function newQuestion() {
  const ops = ["+", "-", "*", "/"];
  let a = Math.floor(Math.random() * 9) + 1;
  let b = Math.floor(Math.random() * 9) + 1;
  let op = ops[Math.floor(Math.random() * ops.length)];
  if (op === "/") a = a * b;

  const correct = eval(a + op + b);
  let wrong;
  do {
    wrong = correct + Math.floor(Math.random() * 6) - 3;
  } while (wrong === correct || wrong < 0);

  correctSide = Math.random() > 0.5 ? "left" : "right";

  leftBlock.innerText = correctSide === "left" ? correct : wrong;
  rightBlock.innerText = correctSide === "right" ? correct : wrong;

  leftBlock.dataset.q = `${a} ${op} ${b}`;
  rightBlock.dataset.q = `${a} ${op} ${b}`;

  y = -60;
}

function update() {
  y += speed;
  leftBlock.style.top = y + "px";
  rightBlock.style.top = y + "px";

  energy -= 0.05;
  energyBar.style.width = energy + "%";

  if (energy <= 0 || y > innerHeight - 120) {
    gameOver();
    return;
  }

  requestAnimationFrame(update);
}

function hit(side) {
  if (side === correctSide) {
    energy = Math.min(100, energy + 15);
    speed += 0.05;
    newQuestion();
  } else {
    gameOver();
  }
}

function gameOver() {
  alert("เกมจบ");
  location.reload();
}

leftBlock.onclick = () => hit("left");
rightBlock.onclick = () => hit("right");

newQuestion();
update();
