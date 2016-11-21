namespace STSEngine.Example.Tanks {

    export interface IWorld extends Core.IWorld{
        getWorldAttributeList(): IWorldAttributeList;
        getItemListService(): IItemListService;
        getClientListService(): IClientListService;

        getCollisionService(): ICollisionService;
        getPhysicsEngine(): IPhysicsEngine;
    }
}