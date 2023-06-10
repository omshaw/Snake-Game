class Fruit {
    constructor() {
        this.X;
        this.Y;
        this.picklocation = function () {
            this.X = Math.floor(Math.random() * 20) * 20;
            this.Y = Math.floor(Math.random() * 20) * 20;
        };
        this.Draw = function () {
            ctx.fillStyle = "red";
            ctx.strokestyle = "black";
            ctx.fillRect(this.X, this.Y, box, box);
            ctx.strokeRect(this.X, this.Y, box, box);
        };
    }
}
