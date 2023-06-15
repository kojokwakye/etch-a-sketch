const container = document.getElementById("container");
// const squares = document.createElement("div");
// squares.classList.add("squares");
// squares.textContent = "squares here";

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares"); // Add CSS class to style the grid cell
    container.appendChild(squares);
  }
}
