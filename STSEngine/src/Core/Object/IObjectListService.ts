namespace STSEngine {

    export interface IObjectListService extends IFilterable<IObject> {
        init(objectList: Iterable<IObject>): void;
        get(id: number): IObject;
        has(id: number): boolean;
        getSize(): number;
        add(object: IObject): void;
        
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<IObject>;
    }
}