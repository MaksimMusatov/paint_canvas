// If you want to save just a bitmap then you can save it this way:
//
// localStorage.setItem(canvasName, canvas.toDataURL());
// and then load like this:
//
// // var dataURL = localStorage.getItem(canvasName);
// var img = new Image;
// img.src = dataURL;
// img.onload = function () {
//     ctx.drawImage(img, 0, 0);
// };
// I recommend to use canvas.toDataURL() instead of ctx.getImageData() because ctx.getImageData() JSON string size will be just enormous even if canvas is empty.
//
// Second option
//
// If you want to store canvas as lines array then you should store lines coords in some variable and save it`s json:
//
// localStorage.setItem(canvasName, JSON.stringify(linesArray));
// Then you can load lines array and redraw canvas:
//
// var lines = JSON.parse(localStorage.getItem(canvasName));
// lines.forEach(function (line) {
//     ctx.beginPath();
//     ctx.strokeStyle = line.color;
//     ctx.moveTo(line.x1, line.y1);
//     ctx.lineTo(line.x2, line.y2);
//     ctx.stroke();
// });
