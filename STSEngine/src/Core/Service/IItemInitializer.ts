namespace STSEngine {

    export interface IItemInitializer<T> {
        create(attr: Iterable<[number, any]> | number): T;
        createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;

        setGetIdHandler(getId: () => number);
    }
}

