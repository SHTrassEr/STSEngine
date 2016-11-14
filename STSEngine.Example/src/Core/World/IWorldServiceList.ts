namespace STSEngine.Example {

    export interface IWorldServiceList extends STSEngine.IWorldServiceList{
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): IItemInitializer<ICommand>;
        getObjectInitializer(): IItemInitializer<IObject>;
        getProcessInitializer(): IItemInitializer<IProcess>;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getObjectListService(): IObjectListService<IObject>;
        getProcessListService(): IProcessListService;
    }
}