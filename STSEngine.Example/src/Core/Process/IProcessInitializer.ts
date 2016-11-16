namespace STSEngine.Example {

    export interface IProcessInitializer extends STSEngine.IProcessInitializer {
        createMoveObject(attr?: Iterable<[number, any]>): ProcessMoveObject;
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreateClientItemTank(attr?: Iterable<[number, any]>): ProcessCreateClientItemTank;
        createMoveItem(attr?: Iterable<[number, any]>): ProcessMoveItem;
    }
}

