const container = document.getElementById("container");

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    container.appendChild(squares);
  }
}
