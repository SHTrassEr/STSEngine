namespace STSEngine.Core {

    export interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
    }
}