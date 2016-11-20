namespace STSEngine.Example {

    export interface IWorld extends STSEngine.IWorld{
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
        getPhysicsEngine(): IPhysicsEngine;
    }
}