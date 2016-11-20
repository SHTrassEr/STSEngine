namespace STSEngine {

    export abstract class View {

        protected rootElement: HTMLDivElement;

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;

        protected isStarted: boolean;

        protected world: IWorld;
        protected clientId: number;

        constructor(rootElement: HTMLDivElement, world: IWorld) {
            this.world = world;

            this.rootElement = rootElement;
            this.clearHtmlElement(this.rootElement);

            this.worldAttributeList = world.getWorldAttributeList();
            this.itemListService = world.getItemListService();
            this.processListService = world.getProcessListService();
            this.clientListService = world.getClientListService();

            this.isStarted = false;
        }

        public setClientId(clientId: number) {
            this.clientId = clientId;
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