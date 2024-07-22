//#2.2 Line Width

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;

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

function stopPainting(){
    isPainting = false;
    ctx.beginPath();

}


function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
// console.log(event.target.value);
}


canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);

lineWidth.addEventListener('change', onLineWidthChange);