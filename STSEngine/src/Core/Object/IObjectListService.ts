namespace STSEngine {

    export interface IObjectListService<T extends IObject> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
    }
}