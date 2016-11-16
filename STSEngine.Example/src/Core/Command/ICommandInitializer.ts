namespace STSEngine.Example {

    export interface ICommandInitializer extends STSEngine.ICommandInitializer {
        createRegisterClient(attr?: Iterable<[number, any]>): CommandRegisterClient;
        createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart;
        createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
        createChangeClientName(attr?: Iterable<[number, any]>): CommandChangeClientName;
    }
}

