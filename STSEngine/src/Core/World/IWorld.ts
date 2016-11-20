namespace STSEngine {

    export interface IWorld {
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getEntityFactory(): IEntityFactory;
        getClientListService(): IClientListService;
    }
}