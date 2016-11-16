namespace STSEngine.Example {

    export interface IProcessInitializer extends STSEngine.IProcessInitializer {
        createMoveObject(attr?: Iterable<[number, any]>): ProcessMoveObject;
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreatePlayerObject(attr?: Iterable<[number, any]>): ProcessCreatePlayerObject;
    }
}

