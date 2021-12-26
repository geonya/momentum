const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const erase = document.getElementById("erase");
const reset = document.getElementById("reset");
const drawRect = document.getElementById("drawRect");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = (document.documentElement.clientWidth * 16) / 100;

// canvas api 가동
let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // Initial color of canvas is white.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

function onHandleClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const brushSize = event.target.value;
  ctx.lineWidth = brushSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("imae/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintjs[export]";
  link.click();
  console.log(link);
}

function handleEraseClick() {
  ctx.strokeStyle = "white";
}
function handleResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleDrawRect() {}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) => color.addEventListener("click", onHandleClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (erase) {
  erase.addEventListener("click", handleEraseClick);
}

if (reset) {
  reset.addEventListener("click", handleResetClick);
}

if (drawRect) {
  drawRect.addEventListener("click", handleDrawRect);
}
