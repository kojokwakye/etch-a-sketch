// 16x16 grid of square divs

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    let squares = document.createElement("div");
    squares.className = "squares";
    document.body.appendChild(squares);
  }
  const container = document.querySelector("#container");
  document.body.appendChild(container);
}
