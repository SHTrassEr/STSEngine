namespace STSEngine {

    export interface IWorldServiceList {
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;
    }
}