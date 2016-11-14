namespace STSEngine.Example {

    export class WorldServiceList extends STSEngine.WorldServiceList {

        protected worldAttributeList: WorldAttributeList;
        protected collisionService: ICollisionService;

        constructor(worldAttributeList: WorldAttributeList) {
            let playerListService = new ObjectListService<IPlayer>();
            let objectListService = new ObjectListService();
            let processListService = new ProcessListService();
            let collisionService = new CollisionService(worldAttributeList, objectListService);

            let commandInitializer = new CommandInitializer();
            let objectInitializer = new ObjectInitializer();
            let processInitializer = new ProcessInitializer();
            let commandDispatcher = new CommandDispatcher(processInitializer);
            let processDispatcher = new ProcessDispatcher(worldAttributeList, collisionService, processInitializer, objectInitializer);
            super(worldAttributeList, commandInitializer, objectInitializer, processInitializer, processDispatcher, commandDispatcher, objectListService, processListService, playerListService);

            this.collisionService = collisionService;
        }

        public getWorldAttributeList(): WorldAttributeList {
            return this.worldAttributeList;
        }
        
    }
}