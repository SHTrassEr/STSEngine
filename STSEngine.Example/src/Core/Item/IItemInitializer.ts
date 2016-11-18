namespace STSEngine.Example {

    export interface IItemInitializer extends STSEngine.IItemInitializer {
        createTank(attr?: Iterable<[number, any]>): ItemTank;
        createBullet(attr?: Iterable<[number, any]>): ItemBullet;
        createWall(attr?: Iterable<[number, any]>): ItemWall;
    }
}

