namespace STSEngine {

    export interface IItemInitializer extends IEntityInitializer<IEntity> {
        createItem(attr?: Iterable<[number, any]>): Item;
    }
}

