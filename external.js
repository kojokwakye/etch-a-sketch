const container = document.getElementById("container");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}
const shadeBoxes = document.querySelectorAll(".squares");
const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");

// mouse enter
function draw() {
  shadeBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      squares.style.backgroundColor = "green";
    });
  });
}
drawButton.addEventListener("click", draw);

// erase boxes
const eraseBoxes = document.querySelectorAll(".squares");

function eraser() {
  eraseBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      squares.style.backgroundColor = "";
    });
  });
}
eraseButton.addEventListener("click", eraser);
