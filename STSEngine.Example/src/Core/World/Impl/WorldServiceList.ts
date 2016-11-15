namespace STSEngine.Example {

    export class WorldServiceList implements IWorldServiceList {

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected playerListService: IPlayerListService;

        protected commandInitializer: ICommandInitializer;
        protected objectInitializer: IItemInitializer;
        protected processInitializer: IProcessInitializer;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected collisionService: ICollisionService;

        constructor(worldAttributeList: WorldAttributeList) {
            this.worldAttributeList = worldAttributeList;
            this.itemListService = new ItemListService();
            this.processListService = new ProcessListService();
            this.playerListService = new PlayerListService();
            this.collisionService = new CollisionService(this.worldAttributeList, this.itemListService);

            this.commandInitializer = new CommandInitializer();
            this.objectInitializer = new ItemInitializer(this.getObjectId.bind(this));
            this.processInitializer = new ProcessInitializer(this.getProcessId.bind(this));
            this.commandDispatcher = new CommandDispatcher(this);
            this.processDispatcher = new ProcessDispatcher(this);

        }

        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getCommandInitializer(): ICommandInitializer {
            return this.commandInitializer;
        }

        public getItemInitializer(): IItemInitializer {
            return this.objectInitializer;
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

        public getCollisionService(): ICollisionService {
            return this.collisionService;
        }

        public getPlayerListService(): IPlayerListService {
            return this.playerListService;
        }

        protected getObjectId(): number {
            var id = this.worldAttributeList.getLastObjectId() + 1;
            this.worldAttributeList.setLastObjectId(id);
            return id;
        }

        protected getProcessId(): number {
            var id = this.worldAttributeList.getLastProcessId() + 1;
            this.worldAttributeList.setLastProcessId(id);
            return id;
        }
        
    }
}