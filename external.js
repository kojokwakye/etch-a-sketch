const container = document.getElementById("container");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}

// variable to track if drawing is allowed or not
let isDrawing = false;

// buttons
const setGrid = document.getElementById("set-grid");
const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");
const rgbButton = document.getElementById("rgb-shade");

// draw on boxes
const shadeBoxes = document.querySelectorAll(".squares");
function draw() {
  shadeBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check if drawing is allowed
      if (isDrawing) {
        squares.style.backgroundColor = "black";
      }
    });
  });
}

drawButton.addEventListener("click", () => {
  isDrawing = true;
  draw();
});

// stop drawing when clicking on the grid
container.addEventListener("click", () => {
  isDrawing = false;
});

// erase boxes
const eraseBoxes = document.querySelectorAll(".squares");
function eraser() {
  eraseBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check erasing
      if (isDrawing) {
        squares.style.backgroundColor = "";
      }
    });
  });
}
// stop erasing when clicking on the grid
eraseButton.addEventListener("click", () => {
  isDrawing = true;
  eraser();
});

// rainbow-shade
const rainbowShade = document.querySelectorAll(".squares");
function rgbShade() {
  rainbowShade.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check drawing
      if (isDrawing) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        squares.style.backgroundColor = rgbColor;
      }
    });
  });
}
// stop drawing when clicking on the grid
rgbButton.addEventListener("click", () => {
  isDrawing = true;
  rgbShade();
});
