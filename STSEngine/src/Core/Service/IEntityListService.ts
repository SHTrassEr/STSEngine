namespace STSEngine {

    export interface IEntityListService<T extends IItem> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;

        getTyped<V extends T>(objectId: number, type: any): V;
    }
}