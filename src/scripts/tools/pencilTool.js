export class PencilTool extends DefaultTool {
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
