namespace STSEngine.Example {

    export interface IItemInitializer extends STSEngine.IItemInitializer {
        createPlayer(attr?: Iterable<[number, any]>): ItemPlayer;
        createBullet(attr?: Iterable<[number, any]>): ItemBullet;
    }
}

