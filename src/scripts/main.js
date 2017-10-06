"use strict";
import filters from './filters';
import initUndoRedo from './undo_redo';
import {PencilTool, EraserTool, ImageMoverTool} from './tools';



let canvasF = document.getElementById("canvas-front"),
    canvasB = document.getElementById("canvas-back"),
    cxf = canvasF.getContext("2d"),
    cxb = canvasB.getContext("2d"),
    clearCanvas = document.getElementById("canvasClear"),
    getLineWidth = document.getElementById("line-width"),
    lineWidth = getLineWidth.value,

    // myColor = "#ff4dff",
    fileLoad = document.getElementById("file"),
    prop = document.getElementById("prop"),
    imgWid = document.getElementById("img-width"),
    imgHei = document.getElementById("img-height"),
    startX = 0,
    startY = 0,
    canvasMousePosition,
    mouseX,
    mouseY,
    mouseXl = document.getElementById("mouseX"),
    mouseYl = document.getElementById("mouseY"),
    arrTools = [];

//-----------find mouse position----------//
window.onload = () => {
    canvasMousePosition = canvasB.getBoundingClientRect();
};
canvasF.onmousemove = e => {
    mouseX = e.clientX - canvasMousePosition.left;
    mouseY = e.clientY - canvasMousePosition.top;
    mouseXl.innerText = Math.round(mouseX);
    mouseYl.innerText = Math.round(mouseY);
};

//----------clear canvas---------//
clearCanvas.onclick = () => {
    canvasB.width = canvasB.width;
    canvasF.width = canvasF.width;
    console.log('clear');
};

//-----------pick tools--------------//
arrTools.pencil = document.getElementById("pencil");
arrTools.eraser = document.getElementById("eraser");
arrTools.move = document.getElementById("move");

addAllHandlers(arrTools, "toolsActive");

function addHandler(element, arr, className) {
    return function () {
        removeAllClasses(arr);
        element.setAttribute("class", className);
    };
}

function removeAllClasses(arr) {
    for (let item in arr) {
        arr[item].removeAttribute("class");
    }
}

function addAllHandlers(arr, className) {
    for (let item in arr) {
        arr[item].onmousedown = addHandler(arr[item], arr, className);
    }
}

//------pick line width----///
getLineWidth.oninput = () => {
    lineWidth = getLineWidth.value;
    console.log(lineWidth);
};

//--------drawing----------//

arrTools.pencil.onclick = () => {
    currentTool = pencilTool;
    canvasF.style.cursor = "url('../img/pencil_cursor.png'), auto";
    console.log('PENCIL');
};

arrTools.eraser.onclick = () => {
    currentTool = eraserTool;
    canvasF.style.cursor = "url('../img/eraser_cursor.png'), auto";
    console.log('ERASER');
};
arrTools.move.onclick = () => {
    currentTool = imageMoverTool;
    canvasF.style.cursor = "move";
    console.log('MOVE');
};

let pencilTool = new PencilTool(canvasF);
let eraserTool = new EraserTool(canvasF);
let imageMoverTool = new ImageMoverTool(canvasF);

let currentTool = pencilTool;

canvasF.addEventListener("mousedown", event => currentTool.mousedown(event));
canvasF.addEventListener("mouseup", event => currentTool.mouseup(event));
canvasF.addEventListener("mousemove", event => currentTool.mousemove(event));

let img;

fileLoad.onchange = () => {
    let file = fileLoad.files[0];
    let reader = new FileReader();
    reader.onload = e => {
        let dataUri = e.target.result;
        img = new Image();
        img.onload = () => {
            cxf.strokeRect(startX, startY, img.width, img.height);
            cxf.drawImage(img, startX, startY);
        };
        img.src = dataUri;
        prop.style.display = "block";
        imgWid.value = img.width;
        imgHei.value = img.height;
    };
    reader.readAsDataURL(file);
};

imgWid.addEventListener("change", changeSize);
imgHei.addEventListener("change", changeSize);

function changeSize() {
    canvasF.width = canvasF.width;
    cxf.strokeRect(startX, startY, imgWid.value, imgHei.value);
    cxf.drawImage(img, startX, startY, imgWid.value, imgHei.value);
}

initUndoRedo(canvasF);
filters();