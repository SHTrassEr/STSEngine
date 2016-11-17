namespace STSEngine.Example {

    export class WorldServiceList implements IWorldServiceList {

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected clientInitializer: IClientInitializer;

        protected commandInitializer: ICommandInitializer;
        protected objectInitializer: IItemInitializer;
        protected processInitializer: IProcessInitializer;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected collisionService: ICollisionService;
        protected matterEngine: Matter.Engine;

        constructor(worldAttributeList: WorldAttributeList) {

            this.initMatterEngine(worldAttributeList);

            this.worldAttributeList = worldAttributeList;
            this.clientInitializer = new ClientInitializer();
            this.itemListService = new ItemListService(this.matterEngine);
            this.processListService = new ProcessListService();
            this.clientListService = new ClientListService();
            this.collisionService = new CollisionService(this.worldAttributeList, this.itemListService, this.clientListService);

            this.commandInitializer = new CommandInitializer();
            this.objectInitializer = new ItemInitializer(this.getObjectId.bind(this));
            this.processInitializer = new ProcessInitializer(this.getProcessId.bind(this));
            this.commandDispatcher = new CommandDispatcher(this);
            this.processDispatcher = new ProcessDispatcher(this);

        }

        protected initMatterEngine(worldAttributeList: WorldAttributeList) {
            let size = worldAttributeList.getWorldSize();


            this.matterEngine = Matter.Engine.create();
            this.matterEngine.world.gravity.x = 0;
            this.matterEngine.world.gravity.y = 0;

            let w = 100;


            Matter.World.addBody(this.matterEngine.world, Matter.Bodies.rectangle(size[0] / 2, -w, size[0] + w, w * 2, { isStatic: true }));
            Matter.World.addBody(this.matterEngine.world, Matter.Bodies.rectangle(size[0] / 2, size[1] + w, size[0] + w, w * 2, { isStatic: true }));

            Matter.World.addBody(this.matterEngine.world, Matter.Bodies.rectangle(-w, size[1] / 2, w * 2, size[1] + w, { isStatic: true }));
            Matter.World.addBody(this.matterEngine.world, Matter.Bodies.rectangle(size[0] + w, size[1] / 2, w * 2, size[1] + w, { isStatic: true }));


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

        public getClientListService(): IClientListService {
            return this.clientListService;
        }

        public getClientInitializer(): IClientInitializer {
            return this.clientInitializer;
        }

        public getMatterEngine(): Matter.Engine {
            return this.matterEngine;
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