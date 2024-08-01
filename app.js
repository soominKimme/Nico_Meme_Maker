// 2.4 Paint Colour

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option')); //Array.from() is a method that creates a new array from an array-like or iterable object.


canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
ctx.color = color.value;

let isPainting = false;

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


canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', finishPainting);
canvas.addEventListener('mouseleave', finishPainting);

lineWidth.addEventListener('change', onLineWidthChange);

color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// function(color) {
//     color.addEventListener("click", onColorClick));
// }