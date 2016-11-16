namespace STSEngine.Example {

    export interface ICommandInitializer extends STSEngine.ICommandInitializer {
        createRegisterClient(attr?: Iterable<[number, any]>): CommandRegisterClient;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
        createChangeClientName(attr?: Iterable<[number, any]>): CommandChangeClientName;
        createSetClientForceVector(attr?: Iterable<[number, any]>): CommandSetClientForceVector;
    }
}

