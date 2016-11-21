declare class FPSMeter {
    constructor(ancor: any, options: any);
    tickStart(): void;
    tick(): void;
}

namespace STSEngine.Example.Tanks {

    export class View extends Core.View {

        protected worldAttributeList: WorldAttributeList;

        protected width: number;
        protected height: number;

        protected renderer: PIXI.SystemRenderer;
        protected stage: PIXI.Container;
        protected bulletSprite: PIXI.Graphics;
        protected grid: PIXI.Graphics;
        protected worldLimit: PIXI.Graphics;

        protected objectMap: Map<number, PIXI.Graphics>;
        protected cellSize: number;

        protected stepNumber: number;

        protected clientInfoTextMap: Map<number, PIXI.Text>;

        protected clientListService: Core.IClientListService;

        private onMouseClick = new Core.LiteEvent<IVector>();   

        private onTouchEnd = new Core.LiteEvent<IVector>();  
        private onTouchMove = new Core.LiteEvent<IVector>();  

        private meter: any;

        private touchInt: number;

        private touchStart: IVector;
        private touchIdentifier: number = null;

        

        constructor(rootElement: HTMLDivElement, world: IWorld) {
            super(rootElement, world);

            this.cellSize = 1;
            this.width = rootElement.clientWidth;
            this.height = 400;

            //this.renderer = new PIXI.CanvasRenderer(this.width, this.height);// autoDetectRenderer(this.width, this.height);
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

            //this.renderer.
            //this.renderer.roundPixels = true;
            this.rootElement.appendChild(this.renderer.view);

            this.objectMap = new Map<number, PIXI.Graphics>();
            this.clientInfoTextMap = new Map<number, PIXI.Text>();

            this.stage = new PIXI.Container();
            this.stage.interactive = true;

            this.stage.on('mousedown', this.onStageMouseClick.bind(this));
            this.stage.on('touchend', this.onStageTouchEnd.bind(this));

            this.stage.on('touchstart', this.onStageMouseTouchStart.bind(this));

            this.stage.on('touchmove', this.onStageMouseTouchMove.bind(this));
            

            this.grid = this.drawGrid();
            this.worldLimit = this.drawWordLimit();
            this.stage.addChild(this.grid);
            this.stage.addChild(this.worldLimit);
            this.stepNumber = -1;

            this.meter = <any>(new FPSMeter(rootElement, { position: "relative" }));

            this.bulletSprite = this.drawBullet();
        }

        protected onStageMouseClick(event) {
            let p = event.data.getLocalPosition(this.stage);
            this.onMouseClick.trigger(this, p);
        }


        protected onStageMouseTouchMove(event) {
            let s = new Vector(this.touchStart);
            let p = new Vector(event.data.global);

            VectorHelper.substract(p, s);

            this.onTouchMove.trigger(this, p);

        }

        protected onStageTouchEnd(event) {

            if (this.touchIdentifier === event.data.identifier) {
                let p = event.data.getLocalPosition(this.stage);
                this.onTouchEnd.trigger(this, p);
                this.touchIdentifier = null;
            }
            else {
                let p = event.data.getLocalPosition(this.stage);
                this.onMouseClick.trigger(this, p);
            }
        }


        protected onStageMouseTouchStart(event) {
            
            if (this.touchIdentifier === null) {
                this.touchStart = new Vector(event.data.global);
                this.touchIdentifier = event.data.identifier;
            }
        }
        

        protected getClientInfoText(client: Core.IClient) {

            if (!this.clientInfoTextMap.has(client.getId())) {
                let text = new PIXI.Text();
                text.style.fill = 0xff1010;
                text.style.font.fontsize(16);
                text.width = 100;
                text.height = 20;

                text.position.y = text.height * (this.clientInfoTextMap.size + 1);
                this.stage.addChild(text);
                this.clientInfoTextMap.set(client.getId(), new PIXI.Text());
            }

            return this.clientInfoTextMap.get(client.getId());
        }

        protected updateClientInfo(client: IClientActive) {
            let text = this.getClientInfoText(client);
            text.text = client.getId() + " " + client.getScore();
        }

        protected updateAllClientInfo() {
            for (var client of this.clientListService.getIterator()) {
                if (client instanceof ClientActive) {
                    this.updateClientInfo(client);
                }
            }
        }

        protected drawBullet(): PIXI.Graphics {


            let cellSize = this.cellSize;
            let objectWidth = 8;
            let objectHeight = 8;

            var graphics = new PIXI.Graphics();

            graphics.beginFill(0xFFFF00);
            graphics.lineStyle(1, 0x770000);

            graphics.drawRect(0, 0, objectWidth * cellSize, objectHeight * cellSize);

            graphics.pivot.set(objectWidth * cellSize / 2, objectHeight * cellSize / 2);
            return graphics;
        }

        protected drawObjectRectangle(o: IItem & IItemRectangle): PIXI.Graphics {

            if (o instanceof ItemBullet) {
                return this.bulletSprite.clone();
            }

            let position = o.getPosition();

            let cellSize = this.cellSize;
            let objectWidth = Math.floor(o.getWidth());
            let objectHeight = Math.floor(o.getHeight());

            var graphics = new PIXI.Graphics();

            if (o.getClientId() == this.clientId) {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x0000AA);
            } else {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x770000);
            }
            
            graphics.drawRect(0, 0, objectWidth * cellSize, objectHeight * cellSize);
            
            graphics.pivot.set(objectWidth * cellSize / 2, objectHeight * cellSize / 2);
            return graphics;
        }

        protected getObjectSprite(o: IItem): PIXI.Graphics {

            var objectSprite: PIXI.Graphics = this.objectMap.get(o.getId());
            if (!objectSprite) {
                objectSprite = this.drawObjectRectangle(<any>o);
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
            

            if (this.worldAttributeList.getStepNumber() == this.stepNumber) {
                //this.meter.tick();
                return;
            }

            let iterator = this.itemListService.getIterator();

            this.meter.tickStart();
            
            this.stepNumber = this.worldAttributeList.getStepNumber();

            this.clearStage();

            for (let o of iterator) {
                if (o instanceof Item) {
                    let objectSprite = this.getObjectSprite(o);
                    let x = Math.round(this.getDrawPoint(o.getPosition().x));
                    let y = Math.round(this.getDrawPoint(o.getPosition().y));

                    if (o instanceof ItemTank && o.getClientId() == this.clientId) {
                        this.stage.pivot.set(x - this.width / 2, y - this.height / 2);
                        //this.grid.position.set(x - this.width / 2, y - this.height / 2);

                    }

                    objectSprite.position.x = x;
                    objectSprite.position.y = y;

                }
            }

            //this.updateAllClientInfo();

            this.renderer.render(this.stage);
            this.meter.tick();
        }

        protected getDrawPoint(p: number): number {
            return p * this.cellSize;
        }

        protected drawWordLimit(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            var size = this.worldAttributeList.getWorldSize();

            let width = size[0];
            let height = size[1];


            graphics.beginFill(0x333333);
            graphics.lineStyle(0);
            graphics.drawRect(-300, -300, width + 600, height + 600);

            graphics.beginFill(0xCCCCCC);
            graphics.lineStyle(2, 0x999999);
            graphics.drawRect(0, 0, width * this.cellSize, height * this.cellSize);

            let x = 0;


            while (x < width) {

                let y = 0;

                while (y < height) {
                    graphics.drawRect(x, y, 5, 5);
                    y += 200;
                }


                x += 200;
            }


           /*var noiseFilter = new PIXI.filters.NoiseFilter();
            noiseFilter.noise = 0.1;

            graphics.filters = [noiseFilter];*/

            return graphics;
        }

        protected drawGrid(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            

            /*graphics.beginFill(0xFFFFFF);
            graphics.lineStyle(0);
            graphics.drawRect(0, 0, this.width, this.height);*/

/*            graphics.lineStyle(1, 0xCCCCCC, 0.5);
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
            }*/



            return graphics;
        }



        public mouseClick(): Core.ILiteEvent<IVector> {
            return this.onMouseClick;
        }

        public touchMove(): Core.ILiteEvent<IVector> {
            return this.onTouchMove;
        }

        public touchEnd(): Core.ILiteEvent<IVector> {
            return this.onTouchEnd;
        }
       
    }
}