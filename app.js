//3.2 Saving Image

const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option')); //Array.from() is a method that creates a new array from an array-like or iterable object.
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value; //This only happens once.
ctx.lineCap = "round";

ctx.color = color.value;

let isPainting = false;

let isFilling = false;

function onMove(event){

    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }

    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function finishPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    // ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    // console.dir(event.target.dataset.color); // dir will show us the object.

    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){

    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill"; 
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "#ffffff";
    isFilling = false;
    modeBtn.innerText = "Draw";

}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();    //This is same as <img src=""/> in HTML
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;

    }
}

function onDoubleClick(event){
    const text = textInput.value;

    if(text !== ""){

    ctx.save(); // Saves the current state (colour style etc) of the ctx.
    ctx.lineWidth = 1;
    ctx.font = "70px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore(); //Put it back to the previous version.
    }
}

function onSaveClick(){
    // canvas.toDataURL();
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}



canvas.onmousemove = function(){

}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', finishPainting);
canvas.addEventListener('mouseleave', finishPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);

color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// function(color) {
//     color.addEventListener("click", onColorClick));
// }

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);