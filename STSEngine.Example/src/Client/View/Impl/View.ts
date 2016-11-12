namespace STSEngine.Example {

    export class View extends STSEngine.View {

        protected worldAttributeList: WorldAttributeList;

        protected cellSize: number;
        protected m: number;

        constructor(rootElement: HTMLDivElement, worldServiceList: IWorldServiceList) {
            super(rootElement, worldServiceList);
            this.cellSize = 8;
            this.m = 100;
        }


        protected refresh(): void {
            this.clearCanvas();
            this.drawGrid();

            var iterator = this.objectListService.getIterator();
            for (let o of iterator) {
                if (o instanceof ObjectRectangle) {
                    this.drawObjectPlayer(o);
                }
            }
        }

        protected getDrawPoint(p: number): number {
            return Math.floor(p / this.m);
        }


        protected drawObjectPlayer(o: ObjectRectangle): void {
            let position = o.getPosition();
            let size = o.getSize();
            let cellSize = this.cellSize;
            let objectWidth = Math.floor(size[0] / this.m);
            let objectHeight = Math.floor(size[1] / this.m);
            let x = this.getDrawPoint(position[0]);
            let y = this.getDrawPoint(position[1]);

            this.context

            this.context.beginPath();
            this.context.rect((x) * cellSize, (y) * cellSize, objectWidth * cellSize, objectHeight * cellSize);
            this.context.fillStyle = "#FF0000";
            this.context.globalAlpha = 1;
            this.context.fill();
            this.context.closePath();
        }

        protected setCanvasSize(): void {
            var width = this.worldAttributeList.getWorldSize()[0] * this.cellSize / this.m;
            var height = this.worldAttributeList.getWorldSize()[1] * this.cellSize / this.m;
            this.canvas.width = width;
            this.canvas.height = height;
        }

        protected drawGrid(): void {
            let cellSize = this.cellSize;
                var x = 0;
                var y = 0;
                while (x < this.canvas.width) {
                    this.context.beginPath();
                    this.context.globalAlpha = 1;
                    this.context.lineWidth = 0.15;
                    this.context.moveTo(x, 0);
                    this.context.lineTo(x, this.canvas.height);
                    this.context.stroke();
                    this.context.closePath();
                    x += cellSize;
                }
                while (y < this.canvas.height) {
                    this.context.beginPath();
                    this.context.globalAlpha = 1;
                    this.context.lineWidth = 0.1;
                    this.context.moveTo(0, y);
                    this.context.lineTo(this.canvas.width, y);
                    this.context.stroke();
                    this.context.closePath();
                    y += cellSize;
                }
            }

    }
}