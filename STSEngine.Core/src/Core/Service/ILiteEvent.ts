namespace STSEngine.Core {

    export interface ILiteEvent<V> {
        on(handler: { (data?: V): void }): void;
        off(handler: { (data?: V): void }): void;
        getCount(): number;
    }
}