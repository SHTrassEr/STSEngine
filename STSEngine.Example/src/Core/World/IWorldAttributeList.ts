namespace STSEngine.Example {

    export interface IWorldAttributeList extends STSEngine.IWorldAttributeList {
        getWorldSize(): [number, number];
        setWorldSize(size: [number, number]): void;
    }
}