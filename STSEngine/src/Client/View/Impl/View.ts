namespace STSEngine {

    export abstract class View {

        protected rootElement: HTMLDivElement;

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;

        protected isStarted: boolean;

        protected world: IWorld;
        protected playerId: number;

        constructor(rootElement: HTMLDivElement, world: IWorld) {
            this.world = world;
            let worldServiceList  = world.getServiceList();

            this.rootElement = rootElement;
            this.clearHtmlElement(this.rootElement);

            this.worldAttributeList = worldServiceList.getWorldAttributeList();
            this.itemListService = worldServiceList.getItemListService();
            this.processListService = worldServiceList.getProcessListService();

            this.isStarted = false;
        }

        public setPlayerId(playerId: number) {
            this.playerId = playerId;
        }

        protected clearHtmlElement(element: HTMLElement) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        protected draw(): void {
            if (this.isStarted) {
                this.refresh();
                requestAnimationFrame(this.draw.bind(this));
            }
        }

        protected abstract refresh(): void 

        public start(): void {
            this.isStarted = true;
            this.draw();
        }

        public stop(): void {
            this.isStarted = false;
        }
    }
}