let score = 0;
let correctSide = "left";

function randomQuestion() {
  const ops = ["+", "-", "*", "/"];
  let a = Math.floor(Math.random() * 9) + 1;
  let b = Math.floor(Math.random() * 9) + 1;
  let op = ops[Math.floor(Math.random() * ops.length)];

  if (op === "/") a = a * b;

  const correct = eval(a + op + b);
  let wrong;

  do {
    wrong = correct + Math.floor(Math.random() * 5) - 2;
  } while (wrong === correct || wrong < 0);

  correctSide = Math.random() > 0.5 ? "left" : "right";

  document.getElementById("question").innerText = `${a} ${op} ${b}`;

  document.querySelector(".left").innerText =
    correctSide === "left" ? correct : wrong;

  document.querySelector(".right").innerText =
    correctSide === "right" ? correct : wrong;
}

function choose(side) {
  if (side === correctSide) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    randomQuestion(); // ไปบล็อกถัดไป (ไม่สิ้นสุด)
  } else {
    alert("เกมจบ! คะแนน: " + score);
    location.reload();
  }
}

randomQuestion();
