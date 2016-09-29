namespace STSEngine {

    export class World implements IWorld {

        protected worldSettings: IWorldSettings;
        protected objectListService: IObjectListService<IObject>;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;

        protected attributeList: ICommitableAttributeList;

        constructor(worldSettings: IWorldSettings) {
            this.objectListService = new ObjectListService(this.createObject.bind(this));
            this.processListService = new ProcessListService();
            this.worldSettings = worldSettings;
            this.attributeList = new AttributeListCommitable();
            this.processDispatcher = new ProcessDispatcher();
            this.commandDispatcher = new CommandDispatcher();
            this.setStepNumber(0);
        }

        protected createObject(attributeList: IKeyValuePair[]): IObject {
            return new ObjectImpl(new AttributeListCommitable(), attributeList);
        }

        public getSettings(): IWorldSettings {
            return this.worldSettings;
        }

        public getObjectListService(): IObjectListService<IObject> {
            return this.objectListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public getProcessDispatcher(): IProcessDispatcher {
            return this.processDispatcher;
        }

        public getCommandDispatcher(): ICommandDispatcher {
            return this.commandDispatcher;
        }

        public getStepNumber(): number {
            return this.attributeList.get(AttributeType.StepNumber);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.set(AttributeType.StepNumber, stepNumber);
        }

        public increaseStepNumber(): void {
            let stepNumber: number = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }

/*        public commit(): void {
            this.objectListService.commit();
            this.processListService.commit();
            this.attributeList.commit();
        }

        public rollback(): void {
            this.objectListService.rollback();
            this.processListService.rollback();
            this.attributeList.rollback();
        }

        public isDirty(): boolean {
            return this.objectListService.isDirty() ||
                this.processListService.isDirty() ||
                this.attributeList.isDirty();
        }
        */
    }
}