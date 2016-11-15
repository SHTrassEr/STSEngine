namespace STSEngine.Example {

    export class View extends STSEngine.View {

        protected worldAttributeList: WorldAttributeList;


        protected width: number;
        protected height: number;

        protected renderer: PIXI.SystemRenderer;
        protected stage: PIXI.Container;
        protected playerObjectSprite: PIXI.Graphics;
        protected grid: PIXI.Graphics;
        protected worldLimit: PIXI.Graphics;

        protected objectMap: Map<number, PIXI.Graphics>;
        protected cellSize: number;

        protected stepNumber: number;

        constructor(rootElement: HTMLDivElement, world: IWorld) {
            super(rootElement, world);

            this.cellSize = 8;
            this.width = rootElement.clientWidth;
            this.height = 59 * this.cellSize;
            
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
            this.renderer.roundPixels = true;
            this.rootElement.appendChild(this.renderer.view);

            this.objectMap = new Map<number, PIXI.Graphics>();

            this.stage = new PIXI.Container();

            this.grid = this.drawGrid();
            this.worldLimit = this.drawWordLimit();
            this.stage.addChild(this.grid);
            this.stage.addChild(this.worldLimit);
            this.stepNumber = -1;
        }

        protected drawObjectRectangle(o: ItemRectangle): PIXI.Graphics {
            let position = o.getPosition();
            let size = o.getSize();
            let cellSize = this.cellSize;
            let objectWidth = Math.floor(size[0]);
            let objectHeight = Math.floor(size[1]);

            var graphics = new PIXI.Graphics();

            if (o.getPlayerId() == this.playerId) {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x0000AA);
            } else {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x770000);
            }


            graphics.pivot.x = objectWidth * cellSize / 2;
            graphics.pivot.y = objectHeight * cellSize / 2;


            graphics.drawRect(0, 0, objectWidth * cellSize, objectHeight * cellSize);

            graphics.drawRect((objectWidth - 1) * cellSize / 2, 0, 1 * cellSize, 1 * cellSize);

            graphics.pivot.x = objectWidth * cellSize / 2;
            graphics.pivot.y = objectHeight * cellSize / 2;

            
            graphics.filters = [new PIXI.filters.BlurFilter()];

            return graphics;
        }

        protected getObjectSprite(o: ItemRectangle): PIXI.Graphics {

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
                if (!this.itemListService.has(id)) {
                    var child = this.objectMap.get(id);
                    this.stage.removeChild(child);
                    child.destroy();
                    this.objectMap.delete(id);
                }
            }
        }


        protected refresh(): void {
            let iterator = this.itemListService.getIterator();

            if (this.worldAttributeList.getStepNumber() == this.stepNumber) { 
                return;
            }

            this.stepNumber = this.worldAttributeList.getStepNumber();

            this.clearStage();

            for (let o of iterator) {
                if (o instanceof ItemRectangle) {
                    let objectSprite = this.getObjectSprite(o);
                    let x = this.getDrawPoint(o.getPosition(0)) + objectSprite.pivot.x;
                    let y = this.getDrawPoint(o.getPosition(1)) + objectSprite.pivot.y;

                    if (o.getPlayerId() == this.playerId) {
                        this.stage.pivot.set(x - this.width / 2, y - this.height / 2);

                        this.grid.position.set(x - this.width / 2, y - this.height / 2);

                    }

                    (<PIXI.filters.BlurFilter>(objectSprite.filters[0])).blurX = Math.abs(objectSprite.position.x - x) / 10;
                    (<PIXI.filters.BlurFilter>(objectSprite.filters[0])).blurY = Math.abs(objectSprite.position.y - y) / 10;

                    objectSprite.position.x = x;
                    objectSprite.position.y = y;

                    switch (o.getMoveDirection()) {
                        case MoveDirection.Up:
                            objectSprite.rotation = 0;
                            break;
                        case MoveDirection.Right:
                            objectSprite.rotation = Math.PI / 2;
                            break;
                        case MoveDirection.Down:
                            objectSprite.rotation = Math.PI;
                            break;
                        case MoveDirection.Left:
                            objectSprite.rotation = Math.PI / 2 * 3;
                            break;

                    }

                    objectSprite.rotation
                }
            }

            this.renderer.render(this.stage);
        }

        protected getDrawPoint(p: number): number {
            return Math.floor(p) * this.cellSize;
        }

        protected drawWordLimit(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            var size = this.worldAttributeList.getWorldSize();

            graphics.lineStyle(2, 0x000000);
            graphics.drawRect(0, 0, size[0] * this.cellSize, size[1] * this.cellSize);

            return graphics;
        }

        protected drawGrid(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            graphics.beginFill(0xFFFFFF);
            graphics.lineStyle(0);
            graphics.drawRect(0, 0, this.width, this.height);

            graphics.lineStyle(1, 0xCCCCCC, 0.5);
            let cellSize = this.cellSize;

            var x = ((this.width) % this.cellSize) / 2;
            var y = ((this.height) % this.cellSize) / 2;

            if (Math.floor(this.width / this.cellSize) % 2 == 0) {
                x = x - this.cellSize / 2;
            }

            if (Math.floor(this.height / this.cellSize) % 2 == 0) {
                y = y - this.cellSize / 2;
            }           

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