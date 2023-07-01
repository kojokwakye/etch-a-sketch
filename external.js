const container = document.getElementById("container");
const colorPicker = document.getElementById("picker");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}

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
const eraseButton = document.getElementById("erase");

// color picker
const chooseColor = document.querySelectorAll(".squares");
function chosenShade() {
  chooseColor.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check drawing
      if (stopPencil && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = colorPicker.value;
      }
    });
  });
}
pickerButton.addEventListener("click", () => {
  stopPencil = true;
  checkRGB = false;
  chosenShade();
});

// rainbow-shade
const rainbowShade = document.querySelectorAll(".squares");
function rgbShade() {
  rainbowShade.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // check drawing
      if (stopPencil && checkRGB && squares.style.backgroundColor === "") {
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
});

// eraser
const eraseBox = document.querySelectorAll(".squares");
function eraseSquare() {
  eraseBox.forEach((squares) => {
    squares.addEventListener("mouseenter", () => {
      // erase squares
      if (stopPencil && squares.style.backgroundColor === "") {
        squares.style.backgroundColor = "";
      }
    });
  });
}
eraseButton.addEventListener("click", eraseSquare);

// reset boxes
function clearGrid() {
  // const resetGrid = document.querySelectorAll(".squares");
  // resetGrid.forEach((squares) => (squares.style.backgroundColor = ""));
  location.reload();
}
resetButton.addEventListener("click", clearGrid);
