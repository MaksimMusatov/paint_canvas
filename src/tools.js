class DefaultTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.processing = false;
  }

  mousedown() {}

  mousemove() {}

  mouseup() {}
}

class PencilTool extends DefaultTool {
  mousedown() {
    this.processing = true;
    this.ctx.beginPath();
    this.ctx.strokeStyle = myColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = "round";
    this.ctx.moveTo(mouseX, mouseY);
    this.ctx.lineTo(mouseX, mouseY);
		this.ctx.stroke();
    console.log("mousedown pencil");
  }

  mousemove() {
    if (this.processing) {
      this.ctx.lineTo(mouseX, mouseY);
      this.ctx.moveTo(mouseX, mouseY);
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

class EraserTool extends DefaultTool {
  mousedown() {
    this.processing = true;
    this.ctx.beginPath();
    this.ctx.clearRect(
      mouseX - lineWidth / 2,
      mouseY - lineWidth / 2,
      lineWidth,
      lineWidth
    );
    console.log("mousedown ERASER");
  }

  mousemove() {
    if (this.processing) {
      this.ctx.clearRect(
        mouseX - lineWidth / 2,
				mouseY - lineWidth / 2,
        lineWidth,
        lineWidth
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

class ImageMoverTool extends DefaultTool {
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
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    if (this.processing) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.putImageData(this.imgData, mouseX-(img.width-mouseX), mouseY-(img.height-mouseY));
    }
  }

  mouseup() {
    this.ctx.putImageData(this.imgData, mouseX-(img.width-mouseX), mouseY-(img.height-mouseY));
    this.processing = false;
  }
}
