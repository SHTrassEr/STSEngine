namespace STSEngine.Example {

    export interface IClientInitializer extends STSEngine.IClientInitializer {
        createActive(attr?: Iterable<[number, any]>): ClientActive;
    }
}

