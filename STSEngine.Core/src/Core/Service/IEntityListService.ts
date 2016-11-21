namespace STSEngine.Core {

    export interface IEntityListService<T extends IEntity> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(object: Iterable<T>, clear?: boolean): void;
        getTyped<V extends T>(objectId: number, type: any): V;

        beforeAdd(): ILiteEvent<T>;
        beforeRemove(): ILiteEvent<T>;
    }
}