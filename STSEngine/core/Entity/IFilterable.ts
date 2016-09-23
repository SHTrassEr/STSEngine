namespace STSEngine {

    export interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): T[];
        getFirst(condition: (item: T) => boolean): T;
    }
}