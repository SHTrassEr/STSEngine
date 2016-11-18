namespace STSEngine.Example {

    export interface ICommandInitializer extends STSEngine.ICommandInitializer {
        createInitWorld(attr?: Iterable<[number, any]>): CommandInitWorld;
        createRegisterClient(attr?: Iterable<[number, any]>): CommandRegisterClient;
        createFire(attr?: Iterable<[number, any]>): CommandFire;
        createChangeClientName(attr?: Iterable<[number, any]>): CommandChangeClientName;
        createApplyForce(attr?: Iterable<[number, any]>): CommandApplyForce;
    }
}

