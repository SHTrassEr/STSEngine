namespace STSEngine {

    export abstract class World implements IWorld {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected clientInitializer: IClientInitializer;

        protected commandInitializer: ICommandInitializer;
        protected itemInitializer: IItemInitializer;
        protected processInitializer: IProcessInitializer;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;

        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getCommandInitializer(): ICommandInitializer {
            return this.commandInitializer;
        }

        public getItemInitializer(): IItemInitializer {
            return this.itemInitializer;
        }

        public getProcessInitializer(): IProcessInitializer {
            return this.processInitializer;
        }

        public getProcessDispatcher(): IProcessDispatcher {
            return this.processDispatcher;
        }

        public getCommandDispatcher(): ICommandDispatcher {
            return this.commandDispatcher;
        }

        public getItemListService(): IItemListService {
            return this.itemListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public getClientListService(): IClientListService {
            return this.clientListService;
        }

        public getClientInitializer(): IClientInitializer {
            return this.clientInitializer;
        }

        protected getItemId(): number {
            var id = this.worldAttributeList.getLastItemId() + 1;
            this.worldAttributeList.setLastItemId(id);
            return id;
        }

        protected getProcessId(): number {
            var id = this.worldAttributeList.getLastProcessId() + 1;
            this.worldAttributeList.setLastProcessId(id);
            return id;
        }
    }
}