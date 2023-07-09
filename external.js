"use strict";

const container = document.getElementById("container");
const outputs = document.querySelectorAll("output");
const input = document.querySelector(".sliderClass");

const body = (document.body.ondragstart = (event) => {
  event.preventDefault(); // dont drag anything on the page
});

// variable to track if drawing is allowed or not
let stopPencil = true; // so drawing doesn't start without holding down the mouse
let checkRGB = true;

// stop drawing when clicking on the grid
container.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = true;
});

// buttons
const pickerButton = document.getElementById("picker");
const rgbButton = document.getElementById("rgb-shade");
const eraserButton = document.getElementById("eraser");
const resetButton = document.getElementById("reset");
let slider = document.getElementById("gridSize");

function createGrid(col, rows) {
  const bits = document.createDocumentFragment();
  for (let i = 0; i < col * rows; i++) {
    const div = document.createElement("div");
    bits.appendChild(div).classList.add("squares");
  }
  container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.backgroundColor = "#b5d3edbd";
  container.innerHTML = "";
  container.appendChild(bits);
}

createGrid(16, 16);

input.addEventListener("input", () => {
  for (let output of outputs) {
    output.innerText = input.value;
  }
});

function modifyGridSize() {
  let boxes = container.querySelectorAll(".squares");
  boxes.forEach((squares) => squares.remove());
  createGrid(slider.value, slider.value);
  const gridDimensions = document.querySelectorAll(".gridDimension output");
  gridDimensions.forEach((output) => {
    output.textContent = slider.value;
  });
}
slider.addEventListener("mouseup", modifyGridSize);

document.addEventListener("mousedown", () => {
  stopPencil = false;
});

document.addEventListener("mouseup", () => {
  stopPencil = true;
});

// color picker

const chooseColor = document.querySelectorAll(".squares");
function chosenShade() {
  chooseColor.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (!stopPencil && !checkRGB && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = pickerButton.value;
      }
    });
  });
}
pickerButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = false;
  chosenShade();
  console.log("color-picker button");
});

// rainbow-shade
const rainbowShade = document.querySelectorAll(".squares");
function rgbShade() {
  rainbowShade.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (!stopPencil && checkRGB && squares.style.backgroundColor === "") {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        squares.style.backgroundColor = rgbColor;
      }
    });
  });
}
rgbButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = true;
  rgbShade();
  console.log("rgb");
});

// eraser
const eraseBox = document.querySelectorAll(".squares");
function eraseSquare() {
  eraseBox.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (!stopPencil && !checkRGB) {
        squares.style.backgroundColor = "";
      }
    });
  });
}

eraserButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = false;
  eraseSquare();
  console.log("eraser");
});

//// dont touch anything below
// refresh page
function clearGrid() {
  location.reload();
}
resetButton.addEventListener("click", clearGrid);

// screenshot
$("#screenshot").on("click", function () {
  html2canvas(document.querySelector("#container")).then((canvas) => {
    canvas.toBlob(function (blob) {
      window.saveAs(blob, "my_sketch.png");
    });
  });
});
