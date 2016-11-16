namespace STSEngine.Example {

    export interface IItemInitializer extends STSEngine.IItemInitializer {
        createPlayer(attr?: Iterable<[number, any]>): ItemTank;
        createBullet(attr?: Iterable<[number, any]>): ItemBullet;
    }
}

