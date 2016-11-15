namespace STSEngine.Example {

    export interface ICommandInitializer extends STSEngine.ICommandInitializer {
        createRegisterPlayer(attr?: Iterable<[number, any]>): CommandRegisterPlayer;
        createMoveObjectStart(attr?: Iterable<[number, any]>): CommandMoveObjectStart;
        createMoveObjectStop(attr?: Iterable<[number, any]>): CommandMoveObjectStop;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
    }
}

