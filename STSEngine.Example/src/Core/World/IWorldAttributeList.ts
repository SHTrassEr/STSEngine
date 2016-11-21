namespace STSEngine.Example {

    export interface IWorldAttributeList extends Core.IWorldAttributeList {
        getWorldSize(): [number, number];
        setWorldSize(size: [number, number]): void;
    }
}