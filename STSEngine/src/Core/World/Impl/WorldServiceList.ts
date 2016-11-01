namespace STSEngine {

    export class WorldServiceList implements IWorldServiceList {
        protected commandInitializer: IItemInitializer<ICommand>;
        protected objectInitializer: IItemInitializer<IObject>;
        protected processInitializer: IItemInitializer<IProcess>;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;

        constructor(
            commandInitializator: IItemInitializer<ICommand>,
            objectInitializator: IItemInitializer<IObject>,
            processInitializator: IItemInitializer<IProcess>,
            processDispatcher: IProcessDispatcher,
            commandDispatcher: ICommandDispatcher) {

            this.commandInitializer = commandInitializator;
            this.objectInitializer = objectInitializator;
            this.processInitializer = processInitializator;
            this.processDispatcher = processDispatcher;
            this.commandDispatcher = commandDispatcher;
            this.objectListService = new ObjectListService();
            this.processListService = new ProcessListService();
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
    }
}