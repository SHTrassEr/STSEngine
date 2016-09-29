namespace STSEngine {

    export interface IObjectListService<T extends IObject> extends IFilterable<T> {
        init(objectList: IKeyValuePair[][], lastId: number): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        create(attributeList: IKeyValuePair[]): T;
        
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
    }
}