namespace STSEngine {

    export interface IWorld {
        getSettings(): IWorldSettings;
        getObjectListService(): IObjectListService<IObject>;
        getProcessListService(): IProcessListService;

        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;

        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
    }
}