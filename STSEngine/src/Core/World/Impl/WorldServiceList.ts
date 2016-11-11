namespace STSEngine {

    export class WorldServiceList implements IWorldServiceList {
        protected worldAttributeList: IWorldAttributeList;
        protected commandInitializer: IItemInitializer<ICommand>;
        protected objectInitializer: IItemInitializer<IObject>;
        protected processInitializer: IItemInitializer<IProcess>;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;

        constructor(worldAttributeList: IWorldAttributeList,
            commandInitializator: IItemInitializer<ICommand>,
            objectInitializator: IItemInitializer<IObject>,
            processInitializator: IItemInitializer<IProcess>,
            processDispatcher: IProcessDispatcher,
            commandDispatcher: ICommandDispatcher) {

            this.worldAttributeList = worldAttributeList;
            this.commandInitializer = commandInitializator;
            this.objectInitializer = objectInitializator;
            this.objectInitializer.setGetIdHandler(this.getObjectId.bind(this));
            this.processInitializer = processInitializator;
            this.processInitializer.setGetIdHandler(this.getProcessId.bind(this));
            this.processDispatcher = processDispatcher;
            this.commandDispatcher = commandDispatcher;
            this.objectListService = new ObjectListService();
            this.processListService = new ProcessListService();
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

        public getObjectListService(): IObjectListService {
            return this.objectListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
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