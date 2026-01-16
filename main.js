import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 2, 6);

// แสง
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

// เสา
const trunk = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 6),
  new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
);
scene.add(trunk);

// ตัวละคร
const player = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 1, 0.6),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
player.position.y = -2.2;
scene.add(player);

// ----- บล็อกคณิต -----
let currentBlock;

function createBlock() {
  if (currentBlock) scene.remove(currentBlock.mesh);

  const ops = ["+", "-", "*", "/"];
  let op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 9) + 1;
  let b = Math.floor(Math.random() * 9) + 1;
  if (op === "/") a = a * b;

  const side = Math.random() > 0.5 ? 1 : -1;

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.4, 0.6),
    new THREE.MeshStandardMaterial({ color: 0xffaa00 })
  );
  mesh.position.set(side * 1.2, 1.5, 0);
  scene.add(mesh);

  currentBlock = {
    a, b, op, side,
    answer: eval(a + op + b),
    mesh
  };

  document.title = `${a} ${op} ${b}`;
}

createBlock();

// ----- ควบคุม -----
function hit(side) {
  const input = Number(document.getElementById("answer").value);
  if (!currentBlock) return;

  if (side === currentBlock.side && input === currentBlock.answer) {
    createBlock();
  } else {
    alert("เกมจบ");
    location.reload();
  }
}

document.getElementById("left").onclick = () => hit(-1);
document.getElementById("right").onclick = () => hit(1);

// ----- render -----
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.onresize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};
