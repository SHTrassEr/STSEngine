namespace STSEngine.Example {

    export interface IWorld extends STSEngine.IWorld {
        getServiceList(): IWorldServiceList;
        getAttributeList(): IWorldAttributeList;
    }
}