/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filters__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__undo_redo__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(3);







let canvasF = document.getElementById("canvas-front"),
    canvasB = document.getElementById("canvas-back"),
    cxf = canvasF.getContext("2d"),
    cxb = canvasB.getContext("2d"),
    clearCanvas = document.getElementById("canvasClear"),
    // myColor = "#ff4dff",
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

let pencilTool = new __WEBPACK_IMPORTED_MODULE_2__tools__["c" /* PencilTool */](canvasF);
let eraserTool = new __WEBPACK_IMPORTED_MODULE_2__tools__["a" /* EraserTool */](canvasF);
let imageMoverTool = new __WEBPACK_IMPORTED_MODULE_2__tools__["b" /* ImageMoverTool */](canvasF);

let currentTool = pencilTool;

canvasF.addEventListener("mousedown", event => currentTool.mousedown(event));
canvasF.addEventListener("mouseup", event => currentTool.mouseup(event));
canvasF.addEventListener("mousemove", event => currentTool.mousemove(event));



Object(__WEBPACK_IMPORTED_MODULE_1__undo_redo__["a" /* default */])(canvasF);
Object(__WEBPACK_IMPORTED_MODULE_0__filters__["a" /* default */])();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filters;
function filters() {
    $(".miniature").click(function () {
        $(".miniature").removeClass("activeF");
        $(this).addClass("activeF");
    });


    $("#normal").click(function () {
        $(".canvases").removeAttr("id", "");
    });

    $("#xpro").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "xpro");
    });

    $("#willow").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "willow");
    });

    $("#walden").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "walden");
    });

    $("#valencia").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "valencia");
    });

    $("#toaster").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "toaster");
    });

    $("#sutro").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "sutro");
    });

    $("#nashville").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "nashville");
    });

    $("#kelvin").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "kelvin");
    });

    $("#brannan").click(function () {
        $(".canvases").removeAttr("id", "");
        $(".canvases").attr("id", "brannan");
    });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initUndoRedo;
function initUndoRedo(canvasF) {


    let undoButton = document.getElementById("undo"),
        redoButton = document.getElementById("redo"),
        undoSteps = [],
        redoSteps = [],
        cxf = canvasF.getContext("2d");


    const key = 'canvas';


    function saveSteps() {
        let saveStep = cxf.getImageData(0, 0, canvasF.width, canvasF.height);
        undoSteps.push(saveStep);
        localStorage.setItem(key, canvasF.toDataURL());
    }

    canvasF.addEventListener("mouseup", saveSteps);
    document.addEventListener("DOMContentLoaded", () => {
        const base64 = localStorage.getItem(key);

        const image = new Image();
        image.onload = function () {
            cxf.drawImage(image, 0, 0);
            saveSteps();
        };

        image.src = base64;
    });

    document.addEventListener("keydown", undoFn);

    function undoFn(e) {
        if (undoSteps.length === 0) {
            return false;
        }
        e = e || document.event;
        if (e.ctrlKey && e.keyCode === 90) {
            undo();
        }
    }

    function undo() {
        let lastChanges = undoSteps.pop();
        if (undoSteps.length > 0) {
            redoSteps.push(lastChanges);
            cxf.putImageData(undoSteps[undoSteps.length - 1], 0, 0);
        }
        console.log('undo');
    }

    function redo() {
        let lastChanges = redoSteps.pop();
        if (lastChanges) {
            undoSteps.push(lastChanges);
            cxf.putImageData(lastChanges, 0, 0);
        }
        console.log('redo');
    }


    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);

}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let colorPicker = document.getElementById("color"),
    linePicker = document.getElementById("line-width");

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

class PencilTool extends DefaultTool {
    constructor(canvas) {
        super(canvas);
        //-----pick color ----//
        colorPicker.addEventListener('change', () => {
            this.myColor = colorPicker.value;
            console.log(this.myColor);
        });
    }

    mousedown() {
        this.processing = true;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.myColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.mouseX, this.mouseY);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.stroke();
        console.log("mousedown pencil");
    }

    mousemove(e) {
        super.mousemove(e);
        if (this.processing) {
            this.ctx.lineTo(this.mouseX, this.mouseY);
            this.ctx.moveTo(this.mouseX, this.mouseY);
            this.ctx.stroke();
            console.log("mousemove pencil");
        }
    }

    mouseup() {
        this.processing = false;
        this.ctx.closePath();
        console.log("mouseup pencil");
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = PencilTool;


class EraserTool extends DefaultTool {
    mousedown() {
        this.processing = true;
        this.ctx.beginPath();
        this.ctx.clearRect(
            this.mouseX - this.lineWidth / 2,
            this.mouseY - this.lineWidth / 2,
            this.lineWidth,
            this.lineWidth
        );
        console.log("mousedown ERASER");
    }

    mousemove(e) {
        super.mousemove(e);
        if (this.processing) {
            this.ctx.clearRect(
                this.mouseX - this.lineWidth / 2,
                this.mouseY - this.lineWidth / 2,
                this.lineWidth,
                this.lineWidth
            );
            this.ctx.stroke();
            console.log("mousemove ERASER");
        }
    }

    mouseup() {
        this.processing = false;
        this.ctx.closePath();
        console.log("mouseup ERASER");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EraserTool;


class ImageMoverTool extends DefaultTool {
    constructor(canvas) {
        super(canvas);
        let fileLoad = document.getElementById("file"),
            imgWid = document.getElementById("img-width"),
            imgHei = document.getElementById("img-height"),
            prop = document.getElementById("prop"),
            startX = 0,
            startY = 0;

        fileLoad.addEventListener('change', () => {
            let file = fileLoad.files[0];
            let reader = new FileReader();
            reader.addEventListener('load', e => {
                let dataUri = e.target.result;
                this.img = new Image();
                this.img.addEventListener('load', () => {
                    this.ctx.strokeRect(startX, startY, this.img.width, this.img.height);
                    this.ctx.drawImage(this.img, startX, startY);
                });
                this.img.src = dataUri;
                prop.style.display = "block";
                imgWid.value = this.img.width;
                imgHei.value = this.img.height;
            });
            reader.readAsDataURL(file);
        });
        imgWid.addEventListener("change", changeSize);
        imgHei.addEventListener("change", changeSize);

        function changeSize() {
            this.canvas.width = this.canvas.width;
            this.ctx.strokeRect(startX, startY, imgWid.value, imgHei.value);
            this.ctx.drawImage(this.img, startX, startY, imgWid.value, imgHei.value);
        }
    }

    mousedown() {
        this.processing = true;
        this.imgData = this.ctx.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    mousemove(event) {
        super.mousemove(event);

        if (this.processing) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.putImageData(this.imgData, this.mouseX - (this.img.width - this.mouseX), this.mouseY - (this.img.height - this.mouseY));
        }
    }

    mouseup() {
        this.ctx.putImageData(this.imgData, this.mouseX - (this.img.width - this.mouseX), this.mouseY - (this.img.height - this.mouseY));
        this.processing = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ImageMoverTool;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map