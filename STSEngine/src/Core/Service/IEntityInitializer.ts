namespace STSEngine {

    export interface IEntityInitializer<T> {
        create(attr: Iterable<[number, any]> | number): T;
        createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;
    }
}

