const container = document.getElementById("container");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}

const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");
const rgbButton = document.getElementById("rgb-shade");

// draw on boxes
const shadeBoxes = document.querySelectorAll(".squares");
function draw() {
  shadeBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      squares.style.backgroundColor = "black";
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

// rainbow-shade
const rainbowShade = document.querySelectorAll(".squares");
function rgbShade() {
  rainbowShade.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      squares.style.backgroundColor = "red";
    });
  });
}

rgbButton.addEventListener("click", rgbShade);
