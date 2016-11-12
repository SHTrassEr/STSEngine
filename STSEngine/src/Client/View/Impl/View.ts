namespace STSEngine {

    export abstract class View {

        protected rootElement: HTMLDivElement;
        protected canvas: HTMLCanvasElement;
        protected context: CanvasRenderingContext2D;

        protected worldAttributeList: IWorldAttributeList;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;

        protected isStarted: boolean;

        constructor(rootElement: HTMLDivElement, worldServiceList: IWorldServiceList) {
            this.rootElement = rootElement;
            this.canvas = this.createCanvas();
            this.context = this.canvas.getContext("2d");
            this.clearHtmlElement(rootElement);
            this.rootElement.appendChild(this.canvas);

            this.worldAttributeList = worldServiceList.getWorldAttributeList();
            this.objectListService = worldServiceList.getObjectListService();
            this.processListService = worldServiceList.getProcessListService();

            this.isStarted = false;
        }

        protected clearHtmlElement(element: HTMLElement) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        protected createCanvas(): HTMLCanvasElement {
            var canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 480;
            return canvas;
        }

        protected abstract setCanvasSize(): void;

        protected draw(): void {
            if (this.isStarted) {
                this.refresh();
                requestAnimationFrame(this.draw.bind(this));
            }
        }

        protected clearCanvas() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        protected abstract refresh(): void 

        public start(): void {
            this.setCanvasSize();
            this.isStarted = true;
            this.draw();
        }

        public stop(): void {
            this.isStarted = false;
        }

    }
}