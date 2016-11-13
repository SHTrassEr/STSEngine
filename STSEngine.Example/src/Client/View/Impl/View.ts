namespace STSEngine.Example {

    export class View extends STSEngine.View {

        protected worldAttributeList: WorldAttributeList;

        protected width: number;
        protected height: number;

        protected renderer: PIXI.SystemRenderer;
        protected stage: PIXI.Container;
        protected playerObjectSprite: PIXI.Graphics;
        protected objectMap: Map<number, PIXI.Graphics>;
        protected cellSize: number;

        protected stepNumber: number;

        constructor(rootElement: HTMLDivElement, world: IWorld) {
            super(rootElement, world);

            this.cellSize = 8;
            this.width = this.worldAttributeList.getWorldSize()[0] * this.cellSize;
            this.height = this.worldAttributeList.getWorldSize()[1] * this.cellSize;
            
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
            this.renderer.roundPixels = true;
            this.rootElement.appendChild(this.renderer.view);

            this.objectMap = new Map<number, PIXI.Graphics>();

            this.stage = new PIXI.Container();

            var grid = this.drawGrid();
            this.stage.addChild(grid);
            this.stepNumber = -1;
        }


        protected drawObjectRectangle(o: ObjectRectangle): PIXI.Graphics {
            let position = o.getPosition();
            let size = o.getSize();
            let cellSize = this.cellSize;
            let objectWidth = Math.floor(size[0]);
            let objectHeight = Math.floor(size[1]);

            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xFFFF00);
            graphics.lineStyle(2, 0x770000);
            graphics.drawRect(0, 0, objectWidth * cellSize, objectHeight * cellSize);

            graphics.filters = [new PIXI.filters. BlurFilter()];

            return graphics;
        }

        protected getObjectSprite(o: ObjectRectangle): PIXI.Graphics {

            var objectSprite: PIXI.Graphics = this.objectMap.get(o.getId());
            if (!objectSprite) {
                objectSprite = this.drawObjectRectangle(o);
                this.objectMap.set(o.getId(), objectSprite);
                this.stage.addChild(objectSprite);
            }

            return objectSprite;
        }

        protected clearStage(): void {
            for (var id of this.objectMap.keys()) {
                if (!this.objectListService.has(id)) {
                    var child = this.objectMap.get(id);
                    this.stage.removeChild(child);
                    child.destroy();
                    this.objectMap.delete(id);
                }
            }
        }


        protected refresh(): void {
            let iterator = this.objectListService.getIterator();

            if (this.world.getStepNumber() == this.stepNumber) { 
                return;
            }

            this.stepNumber = this.world.getStepNumber();

            this.clearStage();

            for (let o of iterator) {
                if (o instanceof ObjectRectangle) {
                    let objectSprite = this.getObjectSprite(o);
                    let x = this.getDrawPoint(o.getPosition(0));
                    let y = this.getDrawPoint(o.getPosition(1));

                    (<PIXI.filters.BlurFilter>(objectSprite.filters[0])).blurX = Math.abs(objectSprite.position.x - x) / 8;
                    (<PIXI.filters.BlurFilter>(objectSprite.filters[0])).blurY = Math.abs(objectSprite.position.y - y) / 8;

                    objectSprite.position.x = x;
                    objectSprite.position.y = y;
                }
            }

            this.renderer.render(this.stage);
        }

        protected getDrawPoint(p: number): number {
            return Math.floor(p) * this.cellSize;
        }

        protected drawGrid(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            graphics.beginFill(0xFFFFFF);
            graphics.lineStyle(0);
            graphics.drawRect(0, 0, this.width, this.height);

            graphics.lineStyle(1, 0xCCCCCC, 0.5);
            let cellSize = this.cellSize;
            var x = 0;
            var y = 0;
            while (x < this.width) {
                graphics.moveTo(x, 0);
                graphics.lineTo(x, this.height);
                x += cellSize;
            }
            while (y < this.height) {
                graphics.moveTo(0, y);
                graphics.lineTo(this.width, y);
                y += cellSize;
            }

            var noiseFilter = new PIXI.filters.NoiseFilter();
            noiseFilter.noise = 0.1;

            graphics.filters = [noiseFilter];

            return graphics;
        }
       
    }
}