namespace STSEngine.Example {

    export interface IWorldServiceList extends STSEngine.IWorldServiceList{
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): ICommandInitializer;
        getItemInitializer(): IItemInitializer;
        getProcessInitializer(): IProcessInitializer;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientInitializer(): IClientInitializer;
        getClientListService(): IClientListService;
        getCollisionService(): ICollisionService;
    }
}