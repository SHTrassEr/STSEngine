namespace STSEngine {

    export interface ILiteEvent<V> {
        on(handler: { (sender: any, data?: V): void }): void;
        off(handler: { (sender: any, data?: V): void }): void;
    }
}