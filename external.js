const container = document.getElementById("container");

for (let i = 0; i < 32; i++) {
  for (let j = 0; j < 32; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}

// variable to track if drawing is allowed or not
let stopPencil = false;

// buttons
const drawButton = document.getElementById("draw");
const rgbButton = document.getElementById("rgb-shade");
const eraseButton = document.getElementById("erase");

// draw on boxes
const shadeBoxes = document.querySelectorAll(".squares");
function draw() {
  shadeBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check drawing
      if (stopPencil) {
        squares.style.backgroundColor = "black";
      }
    });
  });
}
drawButton.addEventListener("click", () => {
  stopPencil = true;
  draw();
});
// stop drawing when clicking on the grid
container.addEventListener("click", () => {
  stopPencil = false;
});

// erase boxes
const eraseBoxes = document.querySelectorAll(".squares");
function eraser() {
  eraseBoxes.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check erasing
      if (stopPencil) {
        squares.style.backgroundColor = "";
      }
    });
  });
}
// stop erasing when clicking on the grid
eraseButton.addEventListener("click", () => {
  stopPencil = true;
  eraser();
});

// rainbow-shade
const rainbowShade = document.querySelectorAll(".squares");
function rgbShade() {
  rainbowShade.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check drawing
      if (stopPencil) {
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
  stopPencil = true;
  rgbShade();
});
