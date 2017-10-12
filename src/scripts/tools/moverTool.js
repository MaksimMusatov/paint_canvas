export class ImageMoverTool extends DefaultTool {
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
