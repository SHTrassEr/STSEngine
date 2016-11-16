namespace STSEngine.Example {

    export interface IProcessInitializer extends STSEngine.IProcessInitializer {
        createFire(attr?: Iterable<[number, any]>): ProcessFire;
        createCreateClientItemTank(attr?: Iterable<[number, any]>): ProcessCreateClientItemTank;
        createMoveItem(attr?: Iterable<[number, any]>): ProcessMoveItem;
    }
}

