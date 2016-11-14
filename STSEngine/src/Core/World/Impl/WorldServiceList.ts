namespace STSEngine {

    export class WorldServiceList implements IWorldServiceList {
        protected worldAttributeList: IWorldAttributeList;
        protected commandInitializer: IItemInitializer<ICommand>;
        protected objectInitializer: IItemInitializer<IObject>;
        protected processInitializer: IItemInitializer<IProcess>;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected objectListService: IObjectListService<IObject>;
        protected processListService: IProcessListService;
        protected playerListService: IObjectListService<IPlayer>;

        constructor(worldAttributeList: IWorldAttributeList,
            commandInitializator: IItemInitializer<ICommand>,
            objectInitializator: IItemInitializer<IObject>,
            processInitializator: IItemInitializer<IProcess>,
            processDispatcher: IProcessDispatcher,
            commandDispatcher: ICommandDispatcher,
            objectListService: IObjectListService<IObject>,
            processListService: IProcessListService,
            playerListService: IObjectListService<IPlayer>) {

            this.worldAttributeList = worldAttributeList;
            this.commandInitializer = commandInitializator;
            this.objectInitializer = objectInitializator;
            this.objectInitializer.setGetIdHandler(this.getObjectId.bind(this));
            this.processInitializer = processInitializator;
            this.processInitializer.setGetIdHandler(this.getProcessId.bind(this));
            this.processDispatcher = processDispatcher;
            this.commandDispatcher = commandDispatcher;
            this.objectListService = objectListService;
            this.processListService = processListService;
            this.playerListService = playerListService;
        }

        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getCommandInitializer(): IItemInitializer<ICommand> {
            return this.commandInitializer;
        }

        public getObjectInitializer(): IItemInitializer<IObject> {
            return this.objectInitializer;
        }

        public getProcessInitializer(): IItemInitializer<IProcess> {
            return this.processInitializer;
        }

        public getProcessDispatcher(): IProcessDispatcher {
            return this.processDispatcher;
        }

        public getCommandDispatcher(): ICommandDispatcher {
            return this.commandDispatcher;
        }

        public getObjectListService(): IObjectListService<IObject> {
            return this.objectListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public getPlayerListService(): IObjectListService<IPlayer> {
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