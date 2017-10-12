"use strict";
import filters from './filters';
import initUndoRedo from './undo_redo';
import PencilTool from './tools/pencilTool';
import EraserTool from './tools/eraserTool';
import ImageMoverTool from './tools/moverTool';


let canvasF = document.getElementById("canvas-front"),
    canvasB = document.getElementById("canvas-back"),
    cxf = canvasF.getContext("2d"),
    cxb = canvasB.getContext("2d"),
    clearCanvas = document.getElementById("canvasClear"),
    canvasMousePosition,
    mouseX,
    mouseY,
    mouseXl = document.getElementById("mouseX"),
    mouseYl = document.getElementById("mouseY"),
    arrTools = [];

let colorPicker = document.getElementById("color"),
    linePicker = document.getElementById("line-width"),
    myColor = "#ff4dff";

class DefaultTool {
    constructor(canvas) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvasMousePosition = canvas.getBoundingClientRect();
        //------pick line width----///
        linePicker.addEventListener('input', () => {
            this.lineWidth = linePicker.value;
            console.log(this.lineWidth);
        });
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.processing = false;
    }

    mousedown() {
    }

    mousemove(e) {
        this.mouseX = e.clientX - this.canvasMousePosition.left;
        this.mouseY = e.clientY - this.canvasMousePosition.top;
    }

    mouseup() {
    }
}


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


//--------drawing----------//

arrTools.pencil.onclick = () => {
    currentTool = pencilTool;
    canvasF.style.cursor = "url('../src/img/pencil_cursor.png'), auto";
    console.log('PENCIL');
};

arrTools.eraser.onclick = () => {
    currentTool = eraserTool;
    canvasF.style.cursor = "url('../src/img/eraser_cursor.png'), auto";
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


initUndoRedo(canvasF);
filters();