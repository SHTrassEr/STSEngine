namespace STSEngine.Example {

    export interface IWorld extends STSEngine.IWorld{
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getEntityFactory(): IEntityFactory;
        getClientListService(): IClientListService;

        getCollisionService(): ICollisionService;
        getPhysicsEngine(): IPhysicsEngine;
    }
}