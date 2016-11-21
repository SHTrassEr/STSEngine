namespace STSEngine.Core {

    export interface IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}