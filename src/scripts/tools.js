let color = document.getElementById("color"),
    getLineWidth = document.getElementById("line-width"),
    lineWidth = getLineWidth.value;

class DefaultTool {
    constructor(canvas) {
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvasMousePosition = canvas.getBoundingClientRect();
        //------pick line width----///
        getLineWidth.addEventListener('input', () => {
            this.lineWidth = getLineWidth.value;
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

export class PencilTool extends DefaultTool {
    constructor(canvas) {
        super(canvas);
        //-----pick color ----//
        color.addEventListener('change', () => {
            this.myColor = color.value;
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

export class EraserTool extends DefaultTool {
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

export class ImageMoverTool extends DefaultTool {
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
            this.ctx.putImageData(this.imgData, this.mouseX - (img.width - this.mouseX), this.mouseY - (img.height - this.mouseY));
        }
    }

    mouseup() {
        this.ctx.putImageData(this.imgData, this.mouseX - (img.width - this.mouseX), this.mouseY - (img.height - this.mouseY));
        this.processing = false;
    }
}
