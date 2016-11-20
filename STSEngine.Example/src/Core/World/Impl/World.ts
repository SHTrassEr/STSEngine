namespace STSEngine.Example {

    export class World implements IWorld {

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
        protected collisionService: ICollisionService;
        protected physicsEngine: IPhysicsEngine;

        constructor(worldAttributeList: WorldAttributeList) {
            this.worldAttributeList = worldAttributeList;
            this.itemListService = new ItemListService();
            
            this.clientInitializer = new ClientInitializer();
            
            this.processListService = new ProcessListService();
            this.clientListService = new ClientListService();
            this.collisionService = new CollisionService(this.worldAttributeList, this.itemListService, this.clientListService);

            this.commandInitializer = new CommandInitializer();
            this.itemInitializer = new ItemInitializer(this.getItemId.bind(this));
            this.processInitializer = new ProcessInitializer(this.getProcessId.bind(this));
            this.commandDispatcher = new CommandDispatcher(this);
            this.processDispatcher = new ProcessDispatcher(this);
            this.physicsEngine = new PhysicsEngine(this);
        }


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

        public getCollisionService(): ICollisionService {
            return this.collisionService;
        }

        public getClientListService(): IClientListService {
            return this.clientListService;
        }

        public getClientInitializer(): IClientInitializer {
            return this.clientInitializer;
        }

        public getPhysicsEngine(): IPhysicsEngine {
            return this.physicsEngine;
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