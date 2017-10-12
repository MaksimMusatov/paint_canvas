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

