namespace STSEngine.Core {

    export interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}