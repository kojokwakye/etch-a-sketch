const sheet = document.getElementById("sheet");
const pickerButton = document.getElementById("picker");
const slider = document.querySelector(".sliderClass");

let isDrawing = false;

sheet.addEventListener("mousedown", () => {
  isDrawing = true;
});

sheet.addEventListener("mouseup", () => {
  isDrawing = false;
  sheet.style.cursor = "default";
});

sheet.addEventListener("mousemove", () => {
  if (isDrawing) {
    const color = pickerButton.value;
    const brushSize = parseInt(slider.value); // Get the brush size from the
    const x = event.clientX - sheet.getBoundingClientRect().left;
    const y = event.clientY - sheet.getBoundingClientRect().top;
    slider;
    const dot = document.createElement("div");
    dot.style.width = brushSize + "px";
    dot.style.height = brushSize + "px";
    dot.style.backgroundColor = color;
    dot.style.borderRadius = "50%";
    dot.style.position = "absolute";
    dot.style.left = x - brushSize / 2 + "px";
    dot.style.top = y - brushSize / 2 + "px";

    sheet.appendChild(dot);
    sheet.style.cursor = "crosshair";
  }
});
