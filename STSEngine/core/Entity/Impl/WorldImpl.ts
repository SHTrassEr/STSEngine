namespace STSEngine {

    export class WorldImpl implements IWorld {

        protected worldSettings: IWorldSettings;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;

        protected attributeList: IAttributeList;

        constructor(worldSettings: IWorldSettings, objectListService: IObjectListService, processListService: IProcessListService) {
            this.worldSettings = worldSettings;
            this.objectListService = objectListService;
            this.processListService = processListService;
            this.attributeList = new AttributeListImpl();
            this.processDispatcher = new ProcessDispatcherImpl();
            this.commandDispatcher = new CommandDispatcherImpl();
            this.setStepNumber(0);
        }

        public getSettings(): IWorldSettings {
            return this.worldSettings;
        }

        public getObjectListService(): IObjectListService {
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
            return this.attributeList.getAttribute(AttributeType.StepNumber);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.setAttribute(AttributeType.StepNumber, stepNumber);
        }

        public increaseStepNumber(): void {
            var stepNumber: number = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }

        public commit(): void {
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

    }
}