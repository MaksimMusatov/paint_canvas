let undoButton = document.getElementById("undo"),
    redoButton = document.getElementById("redo"),
    undoSteps = [],
    redoSteps = [];


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
  image.onload = function() {
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
