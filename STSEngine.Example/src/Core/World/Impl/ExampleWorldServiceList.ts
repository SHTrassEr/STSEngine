namespace STSEngine.Example {

    export class ExampleWorldServiceList implements IWorldServiceList {
        protected commandInitializer: CommandInitializer;
        protected objectInitializer: ObjectInitializer;
        protected processInitializer: ProcessInitializer;
        protected processDispatcher: ProcessDispatcher;
        protected commandDispatcher: CommandDispatcher;

        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;

        constructor() {
            this.commandInitializer = new CommandInitializer();
            this.objectInitializer = new ObjectInitializer();
            this.processInitializer = new ProcessInitializer();
            this.commandDispatcher = new CommandDispatcher(this.processInitializer);
            this.processDispatcher = new ProcessDispatcher(this.processInitializer, this.objectInitializer);
            this.objectListService = new ObjectListService();
            this.processListService = new ProcessListService();
        }

        public getCommandInitializer(): CommandInitializer {
            return this.commandInitializer;
        }

        public getObjectInitializer(): ObjectInitializer {
            return this.objectInitializer;
        }

        public getProcessInitializer(): ProcessInitializer {
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