namespace STSEngine {

    export interface IWorldServiceList {
        getWorldAttributeList(): IWorldAttributeList;
        getCommandInitializer(): ICommandInitializer;
        getItemInitializer(): IItemInitializer;
        getProcessInitializer(): IProcessInitializer;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientListService(): IClientListService;
    }
}