namespace STSEngine {

    export interface IWorld {
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;

        getCommandInitializer<T extends IItemInitializer<ICommand>>(): T;
        getProcessInitializer<T extends IItemInitializer<IProcess>>(): T;
        getObjectInitializer<T extends IItemInitializer<IObject>>(): T;
    }
}