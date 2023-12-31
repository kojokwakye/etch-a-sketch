"use strict";

const container = document.getElementById("container");
const outputs = document.querySelectorAll("output");
const input = document.querySelector(".sliderClass");

const body = (document.body.ondragstart = (event) => {
  event.preventDefault(); // don't drag anything on the page
});

// variable to track if drawing is allowed or not
let stopPencil = true; // so drawing doesn't start without holding down the mouse
let checkRGB = true;
// a variable to track whether the eraser is active or not
let eraseMode = false;

// stop drawing when clicking on the grid
container.addEventListener("click", () => {
  stopPencil = true;
  // checkRGB = true;
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
  attachEventListeners();
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

function attachEventListeners() {
  const chooseColor = document.querySelectorAll(".squares");
  const rainbowShade = document.querySelectorAll(".squares");
  const eraseBox = document.querySelectorAll(".squares");

  document.addEventListener("mousedown", () => {
    stopPencil = false;
  });

  document.addEventListener("mouseup", () => {
    stopPencil = true;
    // checkRGB = true;
  });

  chooseColor.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (!stopPencil && !checkRGB && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = pickerButton.value;
      }
    });
  });

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

  eraseBox.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (!stopPencil && !checkRGB && eraseMode) {
        squares.style.backgroundColor = "";
      } else if (
        !stopPencil &&
        !checkRGB &&
        squares.style.backgroundColor === ""
      ) {
        squares.style.backgroundColor = pickerButton.value;
      }
    });
  });
}

// color picker
pickerButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = false;
  eraseMode = false; // Disable erase mode when the color picker button is clicked
  console.log("color-picker button");
});

// rainbow-shade
rgbButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = true;
  console.log("rgb");
});

eraserButton.addEventListener("click", () => {
  eraseMode = !eraseMode;
  checkRGB = false;
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
