"use strict";

const container = document.getElementById("container");
const input = document.querySelector("input");
const outputs = document.querySelectorAll("output");

const body = (document.body.ondragstart = (event) => {
  event.preventDefault();
});

// variable to track if drawing is allowed or not
let stopPencil = false;
let checkRGB = false;

// stop drawing when clicking on the grid
container.addEventListener("click", () => {
  stopPencil = false;
  checkRGB = false;
});

// buttons
const pickerButton = document.getElementById("picker");
const rgbButton = document.getElementById("rgb-shade");
const resetButton = document.getElementById("reset");
const pencilButton = document.getElementById("black-pencil");
let slider = document.getElementById("gridSize");

function createGrid(col, rows) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < col * rows; i++) {
    const div = document.createElement("div");
    fragment.appendChild(div).classList.add("squares");
  }
  container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.backgroundColor = "#b5d3edbd";
  container.innerHTML = "";
  container.appendChild(fragment);
  attachEventListeners();
}

createGrid(50, 50);

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
  const defaultPencil = document.querySelectorAll(".squares");
  const rainbowShade = document.querySelectorAll(".squares");

  chooseColor.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (stopPencil && !checkRGB && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = pickerButton.value;
      }
    });
  });

  defaultPencil.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      if (stopPencil && checkRGB && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = "black";
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
}

pickerButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = false;
});

pencilButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = true;
});

rgbButton.addEventListener("click", () => {
  stopPencil = false;
  checkRGB = true;
});

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
